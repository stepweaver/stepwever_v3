import { detectBot } from '@/utils/botProtection';

describe('detectBot timing', () => {
  const base = { name: 'Jane', message: 'Hello there friend' };

  it('blocks instant submit', () => {
    const now = Date.now();
    const r = detectBot({ ...base, _t: now }, { requireTimestamp: true });
    expect(r.isBot).toBe(true);
    expect(r.reason).toBe('too_fast');
  });

  it('allows submit after minimum human delay', () => {
    const old = Date.now() - 5000;
    const r = detectBot({ ...base, _t: old }, { requireTimestamp: true });
    expect(r.isBot).toBe(false);
  });

  it('allows very old session timestamps (no stale brick)', () => {
    const ancient = Date.now() - 48 * 60 * 60 * 1000;
    const r = detectBot({ ...base, _t: ancient }, { requireTimestamp: true });
    expect(r.isBot).toBe(false);
  });
});
