import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, type, propertyId } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha os campos obrigatórios (Nome, Telefone e Mensagem).' },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name,
        email: email || '',
        phone,
        message,
        type: type || 'CONTATO',
        propertyId: propertyId ? Number(propertyId) : null,
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar mensagem/lead:', error);
    return NextResponse.json(
      { error: 'Não foi possível enviar a mensagem. Tente novamente ou entre em contato via WhatsApp.' },
      { status: 500 }
    );
  }
}
