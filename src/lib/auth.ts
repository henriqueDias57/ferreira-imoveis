import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const jwtSecretEnv = process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'production' && !jwtSecretEnv) {
  throw new Error('FATAL: JWT_SECRET environment variable is missing in production!');
}

const SECRET_KEY = new TextEncoder().encode(
  jwtSecretEnv || 'ferreira_imoveis_jwt_secret_super_secure_key_2026'
);

const COOKIE_NAME = 'ferreira_admin_session';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
