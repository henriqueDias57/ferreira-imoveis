import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

// GET - Obter imóvel por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Identificador de imóvel inválido.' }, { status: 400 });
  }

  const property = await db.property.findUnique({
    where: { id: numericId },
    include: { photos: { orderBy: { order: 'asc' } } },
  });

  if (!property) return NextResponse.json({ error: 'Imóvel não encontrado.' }, { status: 404 });

  return NextResponse.json(property);
}

// PUT - Atualizar imóvel
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Identificador de imóvel inválido.' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const {
      code, title, description, type, purpose, price,
      condoFee, iptu, city, neighborhood, address,
      bedrooms, suites, bathrooms, parking, area,
      featured, active, photoUrls,
    } = body;

    const slug = `${type}-${purpose}-${city}-${title}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      + `-${(code || '').toLowerCase()}`;

    const property = await db.property.update({
      where: { id: numericId },
      data: {
        code: code?.toUpperCase(),
        title,
        slug,
        description: description || '',
        type,
        purpose,
        price: Number(price),
        condoFee: condoFee ? Number(condoFee) : 0,
        iptu: iptu ? Number(iptu) : 0,
        city,
        neighborhood,
        address: address || null,
        bedrooms: Number(bedrooms) || 0,
        suites: Number(suites) || 0,
        bathrooms: Number(bathrooms) || 0,
        parking: Number(parking) || 0,
        area: Number(area) || 0,
        featured: featured === true || featured === 'true',
        active: active !== false && active !== 'false',
      },
    });

    // Se as fotos foram enviadas, substituir
    if (photoUrls && Array.isArray(photoUrls)) {
      await db.photo.deleteMany({ where: { propertyId: numericId } });
      for (let i = 0; i < photoUrls.length; i++) {
        if (photoUrls[i]) {
          await db.photo.create({
            data: {
              url: photoUrls[i],
              isCover: i === 0,
              order: i,
              propertyId: property.id,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error('Erro ao atualizar imóvel:', error);
    return NextResponse.json({ error: 'Erro ao atualizar imóvel.' }, { status: 500 });
  }
}

// DELETE - Excluir imóvel
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Identificador de imóvel inválido.' }, { status: 400 });
  }

  try {
    await db.property.delete({ where: { id: numericId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir imóvel.' }, { status: 500 });
  }
}
