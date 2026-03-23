/**
 * @jest-environment node
 */
import { createRateLimit } from '@/utils/rateLimit';

function memoryStore() {
  const m = new Map();
  return {
    get: async (k) => m.get(k) ?? null,
    set: async (k, v) => {
      m.set(k, v);
    },
  };
}

describe('createRateLimit', () => {
  const prev = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = prev;
  });

  it('returns 429 after maxRequests in window', async () => {
    process.env.NODE_ENV = 'development';
    const limiter = createRateLimit({
      keyPrefix: 'test-rl',
      maxRequests: 2,
      windowMs: 60_000,
      store: memoryStore(),
    });
    const req = new Request('http://localhost/', {
      headers: { 'x-forwarded-for': '9.9.9.9', 'user-agent': 'jest' },
    });
    expect(await limiter(req)).toBeNull();
    expect(await limiter(req)).toBeNull();
    const blocked = await limiter(req);
    expect(blocked).toBeInstanceOf(Response);
    expect(blocked.status).toBe(429);
    const retry = blocked.headers.get('Retry-After');
    expect(retry).toBeTruthy();
  });
});
