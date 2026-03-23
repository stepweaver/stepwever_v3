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

import { POST } from '@/app/api/contact/route';

jest.mock('@/utils/email', () => ({
  sendContactEmail: jest.fn(),
  sendConfirmationEmail: jest.fn(),
  isEmailConfigured: jest.fn(() => false),
}));

const { isEmailConfigured, sendContactEmail } = require('@/utils/email');

describe('/api/contact route', () => {
  const env = { ...process.env };

  beforeEach(() => {
    jest.clearAllMocks();
    kvMap.clear();
    process.env = { ...env, NODE_ENV: 'development' };
  });

  afterAll(() => {
    process.env = env;
  });

  const validBody = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello Stephen, great site.',
    _t: Date.now(),
    _d: 6000,
  };

  it('blocks invalid origin', async () => {
    process.env.ALLOWED_ORIGINS = 'https://example.com';
    const res = await POST(
      new Request('https://stepweaver.dev/api/contact', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://evil.com',
          'content-type': 'application/json',
        },
        body: JSON.stringify(validBody),
      })
    );
    expect(res.status).toBe(403);
  });

  it('returns generic failure when email config is missing', async () => {
    isEmailConfigured.mockReturnValueOnce(false);
    const res = await POST(
      new Request('https://stepweaver.dev/api/contact', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify(validBody),
      })
    );
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Message could not be sent. Please try again later.');
    expect(data.error).not.toMatch(/env|credential|smtp/i);
  });

  it('returns success-shaped response for bot submissions', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/contact', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ ...validBody, _d: 10 }),
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toMatch(/Message sent successfully/i);
  });

  it('returns generic failure when email send throws', async () => {
    isEmailConfigured.mockReturnValueOnce(true);
    sendContactEmail.mockRejectedValueOnce(new Error('smtp auth failed'));
    const res = await POST(
      new Request('https://stepweaver.dev/api/contact', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify(validBody),
      })
    );
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Message could not be sent. Please try again later.');
    expect(data.error).not.toMatch(/smtp|auth|config|credential/i);
  });

  it('blocks malformed timing fields when timestamp is required', async () => {
    const res = await POST(
      new Request('https://stepweaver.dev/api/contact', {
        method: 'POST',
        headers: {
          host: 'stepweaver.dev',
          origin: 'https://stepweaver.dev',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ ...validBody, _d: 'invalid' }),
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toMatch(/Message sent successfully/i);
  });
});
