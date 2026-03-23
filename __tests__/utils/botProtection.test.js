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

  it('rejects malformed elapsed timing when provided', () => {
    const invalid = detectBot(
      { ...base, _t: Date.now(), _d: 'not-a-number' },
      { requireTimestamp: true }
    );
    expect(invalid).toEqual({ isBot: true, reason: 'invalid_elapsed' });
  });

  it('rejects malformed timestamp when required', () => {
    const invalid = detectBot(
      { ...base, _t: Infinity, _d: 5000 },
      { requireTimestamp: true }
    );
    expect(invalid).toEqual({ isBot: true, reason: 'missing_timestamp' });
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
