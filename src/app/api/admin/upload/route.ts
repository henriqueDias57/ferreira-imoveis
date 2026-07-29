import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function isValidImageMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  
  // JPEG: FF D8 FF
  const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
  // PNG: 89 50 4E 47
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  // WebP: RIFF ... WEBP (52 49 46 46 ... 57 45 42 50)
  const isWebp = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;

  return isJpeg || isPng || isWebp;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'properties');
    await mkdir(uploadDir, { recursive: true });

    const savedUrls: string[] = [];

    for (const file of files) {
      if (file.size === 0) continue;

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `O arquivo ${file.name} excede o limite máximo permitido de 5MB.` },
          { status: 400 }
        );
      }

      // Validar tipo MIME
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Tipo de arquivo não suportado (${file.type}). Apenas imagens JPG, PNG e WebP são permitidas.` },
          { status: 400 }
        );
      }

      // Validar extensão
      const rawExt = path.extname(file.name).toLowerCase();
      const safeExt = ALLOWED_EXTENSIONS.includes(rawExt) ? rawExt : '.jpg';

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Validar Magic Bytes da imagem
      if (!isValidImageMagicBytes(buffer)) {
        return NextResponse.json(
          { error: `O arquivo ${file.name} não é uma imagem válida.` },
          { status: 400 }
        );
      }

      // Nome de arquivo higienizado contra Path Traversal
      const filename = `prop_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${safeExt}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);
      savedUrls.push(`/uploads/properties/${filename}`);
    }

    return NextResponse.json({ success: true, urls: savedUrls });
  } catch (error) {
    console.error('Erro no upload de arquivos:', error);
    return NextResponse.json({ error: 'Falha no processamento das imagens.' }, { status: 500 });
  }
}
