import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    
    // Rate limit: máx 5 mensagens por 10 minutos por IP
    const rateCheck = checkRateLimit(`lead_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Muitas mensagens enviadas. Por favor, aguarde ${rateCheck.retryAfterSeconds} segundos antes de enviar outra.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, type, propertyId } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha os campos obrigatórios (Nome, Telefone e Mensagem).' },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim().slice(0, 100);
    const cleanPhone = String(phone).trim().slice(0, 30);
    const cleanEmail = email ? String(email).trim().slice(0, 100) : '';
    const cleanMessage = String(message).trim().slice(0, 2000);
    const cleanType = type ? String(type).trim().slice(0, 50) : 'CONTATO';

    const lead = await db.lead.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
        type: cleanType,
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
