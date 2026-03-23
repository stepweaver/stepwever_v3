/**
 * @jest-environment node
 */
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';

function req(headers) {
  return new Request('https://stepweaver.dev/api/chat', {
    method: 'POST',
    headers,
  });
}

describe('isAllowedRequestOrigin', () => {
  const prev = { ...process.env };

  afterEach(() => {
    process.env = { ...prev };
  });

  it('allows same-origin when allowlists empty', () => {
    delete process.env.ALLOWED_ORIGINS;
    delete process.env.ALLOWED_HOSTS;
    const r = req({
      origin: 'https://stepweaver.dev',
      host: 'stepweaver.dev',
    });
    expect(isAllowedRequestOrigin(r)).toBe(true);
  });

  it('blocks wrong origin when ALLOWED_ORIGINS set', () => {
    process.env.ALLOWED_ORIGINS = 'https://example.com';
    const r = req({
      origin: 'https://evil.com',
      host: 'stepweaver.dev',
    });
    expect(isAllowedRequestOrigin(r)).toBe(false);
  });
});
