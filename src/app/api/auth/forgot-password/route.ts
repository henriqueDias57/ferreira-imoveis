import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    
    // Rate limit: max 5 solicitações por 15 minutos por IP
    const rateCheck = checkRateLimit(`forgot_${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Muitas solicitações. Por favor, aguarde ${rateCheck.retryAfterSeconds} segundos.` },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Digite seu e-mail ou nome de usuário.' }, { status: 400 });
    }

    const cleanInput = email.trim().toLowerCase();
    
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { email: { contains: cleanInput } },
          { name: { contains: cleanInput } },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Nenhum administrador encontrado com este e-mail ou usuário.' }, { status: 404 });
    }

    // Gerar código numérico de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validade

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: code,
        resetTokenExpiry: expiry,
      },
    });

    return NextResponse.json({
      success: true,
      userEmail: user.email,
      message: `Código gerado para ${user.name} (${user.email}).`,
      code: code,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao processar solicitação.' }, { status: 500 });
  }
}
