import { safeHref } from '@/utils/safeHref';

describe('safeHref', () => {
  it('allows expected schemes and relative paths', () => {
    expect(safeHref('https://example.com').ok).toBe(true);
    expect(safeHref('http://example.com').ok).toBe(true);
    expect(safeHref('mailto:test@example.com').ok).toBe(true);
    expect(safeHref('tel:+15005550006').ok).toBe(true);
    expect(safeHref('/projects/llambda-llm-agent')).toEqual({
      ok: true,
      href: '/projects/llambda-llm-agent',
      isExternal: false,
    });
  });

  it('rejects unsafe protocols', () => {
    expect(safeHref('javascript:alert(1)')).toEqual({ ok: false });
    expect(safeHref('data:text/html,hi')).toEqual({ ok: false });
    expect(safeHref('vbscript:msgbox(1)')).toEqual({ ok: false });
  });
});
