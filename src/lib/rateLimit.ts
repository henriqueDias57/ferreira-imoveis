// Rate Limiter em memória simples para mitigação de força bruta e abusos
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

// Limpa entradas expiradas a cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of tracker.entries()) {
    if (now > record.resetTime) {
      tracker.delete(ip);
    }
  }
}, 10 * 60 * 1000);

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || now > record.resetTime) {
    tracker.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count, retryAfterSeconds: 0 };
}
