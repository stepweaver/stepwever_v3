import { detectBot, stripBotFields } from '@/utils/botProtection';

describe('detectBot timing', () => {
  const base = { name: 'Jane', message: 'Hello there friend' };

  it('blocks instant submit', () => {
    const r = detectBot(
      { ...base, _t: Date.now(), _d: 250 },
      { requireTimestamp: true }
    );
    expect(r.isBot).toBe(true);
    expect(r.reason).toBe('too_fast');
  });

  it('allows submit after minimum human delay', () => {
    const r = detectBot(
      { ...base, _t: Date.now(), _d: 5000 },
      { requireTimestamp: true }
    );
    expect(r.isBot).toBe(false);
  });

  it('allows very old session timestamps (no stale brick)', () => {
    const ancient = Date.now() - 48 * 60 * 60 * 1000;
    const r = detectBot({ ...base, _t: ancient }, { requireTimestamp: true });
    expect(r.isBot).toBe(false);
  });

  it('blocks honeypot submissions', () => {
    const r = detectBot(
      { ...base, _t: Date.now(), _d: 5000, _hp_website: 'spam' },
      { requireTimestamp: true }
    );
    expect(r).toEqual({ isBot: true, reason: 'honeypot' });
  });

  it('allows missing timestamp when requireTimestamp is false', () => {
    const r = detectBot(base, { requireTimestamp: false });
    expect(r.isBot).toBe(false);
  });

  it('strips bot meta fields from payload', () => {
    const cleaned = stripBotFields({
      ...base,
      _t: Date.now(),
      _d: 10,
      _hp_website: '',
    });
    expect(cleaned).toEqual(base);
  });
});
