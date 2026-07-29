import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const cleanInput = email.trim().toLowerCase();

    // Buscar por e-mail exato ou contendo o termo
    let user = await db.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { email: { contains: cleanInput } },
          { name: { contains: cleanInput } },
        ],
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'E-mail ou usuário não encontrado.' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: 'Senha incorreta. Verifique se digitou maiúsculas/minúsculas corretamente.' }, { status: 401 });
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
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
