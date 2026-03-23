/**
 * @jest-environment node
 */
const kvMap = new Map();
jest.mock('@/lib/rateLimitStore', () => ({
  getKVStore: jest.fn(() => ({
    get: async (key) => kvMap.get(key) || null,
    set: async (key, value) => {
      kvMap.set(key, value);
    },
  })),
}));

import { OPTIONS, POST } from '@/app/api/chat/route';

describe('/api/chat route', () => {
  const env = { ...process.env };

  beforeEach(() => {
    jest.restoreAllMocks();
    kvMap.clear();
    process.env = { ...env, NODE_ENV: 'development' };
    delete process.env.GROQ_API_KEY;
    delete process.env.OPENAI_API_KEY;
    global.fetch.mockReset();
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

  it('rejects invalid payload cleanly', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: 42 }], _t: Date.now(), _d: 5000 }),
      })
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid request');
  });

  it('keeps upstream failures generic in production', async () => {
    process.env.NODE_ENV = 'production';
    process.env.OPENAI_API_KEY = 'openai-test-key';
    global.fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ error: { message: 'upstream details leaked' } }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    );

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

    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toBe('Failed to get response from AI. Please try again.');
    expect(data.error).not.toMatch(/upstream/i);
  });

  it('serializes multimodal content for OpenAI fallback without object coercion', async () => {
    process.env.OPENAI_API_KEY = 'openai-test-key';
    global.fetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          output: [{ content: [{ type: 'output_text', text: 'Image processed.' }] }],
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      )
    );

    const res = await POST(
      new Request('https://stepweaver.dev/api/chat', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Describe this image',
              attachments: [{ dataUrl: 'data:image/png;base64,aGVsbG8=' }],
            },
          ],
          _t: Date.now(),
          _d: 5000,
        }),
      })
    );

    expect(res.status).toBe(200);
    const payload = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(Array.isArray(payload.input)).toBe(true);
    expect(JSON.stringify(payload.input)).toContain('input_image');
    expect(JSON.stringify(payload.input)).not.toContain('[object Object]');
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
