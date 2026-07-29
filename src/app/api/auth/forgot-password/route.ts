import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.user.findUnique({ where: { email: cleanEmail } });

    if (!user) {
      // Por segurança, retorna mensagem padrão mesmo se o e-mail não existir
      return NextResponse.json({
        success: true,
        message: 'Se este e-mail estiver cadastrado, um código de recuperação foi enviado.',
      });
    }

    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 30 * 60 * 1000); // Válido por 30 minutos

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: code,
        resetTokenExpiry: expiry,
      },
    });

    // Retorna mensagem com o código (útil para desenvolvimento/administração direta)
    return NextResponse.json({
      success: true,
      message: `Código de recuperação gerado com sucesso para ${user.email}.`,
      code: code, // Disponível para preenchimento rápido
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao processar.' }, { status: 500 });
  }
}
