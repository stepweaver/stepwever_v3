/**
 * @jest-environment node
 */
import { z } from 'zod';
import { buildProtectedOptionsResponse, withProtectedRoute } from '@/lib/apiSecurity';

jest.mock('@/lib/requestOrigin', () => ({
  isAllowedRequestOrigin: jest.fn(() => true),
}));

jest.mock('@/utils/botProtection', () => ({
  detectBot: jest.fn(() => ({ isBot: false })),
  stripBotFields: jest.fn((body) => body),
}));

const { isAllowedRequestOrigin } = require('@/lib/requestOrigin');
const { detectBot } = require('@/utils/botProtection');

describe('withProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('enforces methods', async () => {
    const req = new Request('https://stepweaver.dev/api/chat', { method: 'GET' });
    const result = await withProtectedRoute(req, { allowedMethods: ['POST'] });
    expect(result.error.status).toBe(405);
  });

  it('enforces origin when enabled', async () => {
    isAllowedRequestOrigin.mockReturnValueOnce(false);
    const req = new Request('https://stepweaver.dev/api/chat', { method: 'POST' });
    const result = await withProtectedRoute(req, { enforceOrigin: true });
    expect(result.error.status).toBe(403);
  });

  it('returns 415 for non-json payloads', async () => {
    const req = new Request('https://stepweaver.dev/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'hello',
    });
    const result = await withProtectedRoute(req, {});
    expect(result.error.status).toBe(415);
  });

  it('wires bot detection callback', async () => {
    detectBot.mockReturnValueOnce({ isBot: true, reason: 'too_fast' });
    const req = new Request('https://stepweaver.dev/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
    });
    const botResponse = new Response(JSON.stringify({ ok: true }), { status: 200 });
    const result = await withProtectedRoute(req, {
      onBotDetected: () => botResponse,
      botCheck: { opts: { requireTimestamp: true } },
    });
    expect(result.error).toBe(botResponse);
  });

  it('validates and sanitizes body with schema', async () => {
    const req = new Request('https://stepweaver.dev/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '  Jane  ' }),
    });
    const result = await withProtectedRoute(req, {
      schema: z.object({ name: z.string().min(1) }),
      sanitize: (body) => ({ ...body, name: body.name.trim() }),
    });
    expect(result.error).toBeUndefined();
    expect(result.body).toEqual({ name: 'Jane' });
  });
});

describe('buildProtectedOptionsResponse', () => {
  it('returns 204 for allowed origins', async () => {
    const req = new Request('https://stepweaver.dev/api/chat', {
      method: 'OPTIONS',
      headers: { origin: 'https://stepweaver.dev', host: 'stepweaver.dev' },
    });
    const res = buildProtectedOptionsResponse(req, ['POST']);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });
});
