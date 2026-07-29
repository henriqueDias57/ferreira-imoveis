import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'ferreira_imoveis_jwt_secret_super_secure_key_2026'
);

const COOKIE_NAME = 'ferreira_admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Rotas públicas do admin que não exigem login prévio
  const isPublicAdminRoute =
    pathname === '/admin/login' || pathname === '/admin/recuperar-senha';

  // 1. Proteger APIs administrativas (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado. Acesso restrito a administradores.' },
        { status: 401 }
      );
    }
  }

  // 2. Proteger páginas administrativas (/admin/*)
  if (pathname.startsWith('/admin') && !isPublicAdminRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Se já autenticado e tentar acessar a tela de login, redirecionar para o dashboard
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
