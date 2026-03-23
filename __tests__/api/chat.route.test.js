/**
 * @jest-environment node
 */
import { OPTIONS, POST } from '@/app/api/chat/route';

describe('/api/chat route', () => {
  const env = { ...process.env };

  beforeEach(() => {
    jest.restoreAllMocks();
    process.env = { ...env, NODE_ENV: 'development' };
    delete process.env.GROQ_API_KEY;
    delete process.env.OPENAI_API_KEY;
  });

  afterAll(() => {
    process.env = env;
  });

  it('blocks invalid origin', async () => {
    process.env.ALLOWED_ORIGINS = 'https://example.com';
    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://evil.com',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }], _t: Date.now(), _d: 5000 }),
      })
    );
    expect(res.status).toBe(403);
  });

  it('returns safe bot response when bot heuristics fire', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }], _t: Date.now(), _d: 10 }),
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.role).toBe('assistant');
  });

  it('returns safe bot response for honeypot submissions', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'hello' }],
          _t: Date.now(),
          _d: 5000,
          _hp_website: 'filled',
        }),
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.role).toBe('assistant');
  });

  it('returns 503 when no AI provider is configured', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }], _t: Date.now(), _d: 5000 }),
      })
    );
    expect(res.status).toBe(503);
  });

  it('rejects OPTIONS from disallowed origin', async () => {
    process.env.ALLOWED_ORIGINS = 'https://example.com';
    const res = await OPTIONS(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'OPTIONS',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://evil.com',
        },
      })
    );
    expect(res.status).toBe(403);
  });
});
