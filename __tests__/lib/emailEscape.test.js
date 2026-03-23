import { escapeHtmlForEmail } from '@/lib/email/escapeHtml';

describe('escapeHtmlForEmail', () => {
  it('escapes script and quotes', () => {
    expect(escapeHtmlForEmail('<script>x</script>')).toBe(
      '&lt;script&gt;x&lt;/script&gt;'
    );
    expect(escapeHtmlForEmail(`a"b'c`)).toBe('a&quot;b&#39;c');
  });
});
