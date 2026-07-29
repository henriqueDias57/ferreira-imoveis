import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'A nova senha deve possuir no mínimo 6 caracteres.' }, { status: 400 });
    }

    const cleanInput = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { email: { contains: cleanInput } },
          { name: { contains: cleanInput } },
        ],
      },
    });

    if (!user || !user.resetToken) {
      return NextResponse.json({ error: 'Nenhuma solicitação de código ativa encontrada para este usuário.' }, { status: 400 });
    }

    if (user.resetToken !== cleanCode) {
      return NextResponse.json({ error: 'Código de verificação incorreto. Tente novamente.' }, { status: 400 });
    }

    if (user.resetTokenExpiry && new Date() > new Date(user.resetTokenExpiry)) {
      return NextResponse.json({ error: 'O código expirou. Solicite um novo código.' }, { status: 400 });
    }

    // Gerar novo hash de senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar no banco e resetar tokens
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Senha alterada com sucesso! Você já pode entrar com a nova senha.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao redefinir a senha.' }, { status: 500 });
  }
}
