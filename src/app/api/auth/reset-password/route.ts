import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'A nova senha deve ter no mínimo 6 caracteres.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const user = await db.user.findUnique({ where: { email: cleanEmail } });

    if (!user || !user.resetToken || !user.resetTokenExpiry) {
      return NextResponse.json({ error: 'Solicitação inválida ou código não encontrado.' }, { status: 400 });
    }

    if (user.resetToken !== cleanCode) {
      return NextResponse.json({ error: 'Código de verificação incorreto.' }, { status: 400 });
    }

    if (new Date() > new Date(user.resetTokenExpiry)) {
      return NextResponse.json({ error: 'O código expirou. Solicite um novo código.' }, { status: 400 });
    }

    // Criptografar nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha e limpar token
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
      message: 'Senha redefinida com sucesso! Você já pode fazer login.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao redefinir senha.' }, { status: 500 });
  }
}
