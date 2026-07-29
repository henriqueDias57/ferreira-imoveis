import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    
    // Proteção contra força bruta: máximo 5 tentativas por 15 minutos por IP
    const rateCheck = checkRateLimit(`login_${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Muitas tentativas incorretas. Aguarde ${rateCheck.retryAfterSeconds} segundos antes de tentar novamente.` },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const cleanInput = email.trim().toLowerCase();

    // Buscar usuário por e-mail ou nome
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
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ error: 'Erro ao processar login.' }, { status: 500 });
  }
}
