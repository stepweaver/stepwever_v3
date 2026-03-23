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
  const prevKvUrl = process.env.KV_REST_API_URL;
  const prevKvToken = process.env.KV_REST_API_TOKEN;

  afterEach(() => {
    process.env.NODE_ENV = prev;
    process.env.KV_REST_API_URL = prevKvUrl;
    process.env.KV_REST_API_TOKEN = prevKvToken;
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

  it('fails closed in production when distributed store is required but missing', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    const limiter = createRateLimit({
      keyPrefix: 'test-prod-strict',
      maxRequests: 2,
      windowMs: 60_000,
    });
    const req = new Request('https://stepweaver.dev/api/chat', {
      headers: { host: 'stepweaver.dev', 'x-forwarded-for': '1.1.1.1' },
    });
    const result = await limiter(req);
    expect(result).toBeInstanceOf(Response);
    expect(result.status).toBe(503);
    expect(result.headers.get('Content-Type')).toContain('application/json');
  });

  it('allows non-strict production mode when explicitly configured', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    const limiter = createRateLimit({
      keyPrefix: 'test-prod-nonstrict',
      maxRequests: 2,
      windowMs: 60_000,
      requireDistributedStoreInProduction: false,
    });
    const req = new Request('https://stepweaver.dev/api/chat', {
      headers: { host: 'stepweaver.dev', 'x-forwarded-for': '2.2.2.2' },
    });
    expect(await limiter(req)).toBeNull();
    expect(await limiter(req)).toBeNull();
    const blocked = await limiter(req);
    expect(blocked).toBeInstanceOf(Response);
    expect(blocked.status).toBe(429);
  });
});
