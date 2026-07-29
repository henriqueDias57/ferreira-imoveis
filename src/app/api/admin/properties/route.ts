import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

function generateSlug(title: string, type: string, purpose: string, city: string, code: string) {
  const base = `${type}-${purpose}-${city}-${title}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${code.toLowerCase()}`;
}

// GET - Listar todos os imóveis (admin)
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const properties = await db.property.findMany({
    include: { photos: true, _count: { select: { leads: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(properties);
}

// POST - Criar novo imóvel
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      code, title, description, type, purpose, price,
      condoFee, iptu, city, neighborhood, address,
      bedrooms, suites, bathrooms, parking, area,
      featured, active, photoUrls,
    } = body;

    if (!code || !title || !type || !purpose || !price || !city || !neighborhood) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
    }

    const slug = generateSlug(title, type, purpose, city, code);

    const property = await db.property.create({
      data: {
        code: code.toUpperCase(),
        title,
        slug,
        description: description || '',
        type,
        purpose,
        price: Number(price),
        condoFee: condoFee ? Number(condoFee) : 0,
        iptu: iptu ? Number(iptu) : 0,
        city,
        state: 'SP',
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

    // Criar fotos se fornecidas
    if (photoUrls && Array.isArray(photoUrls)) {
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

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar imóvel:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Código de imóvel já existente.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao criar imóvel.' }, { status: 500 });
  }
}
