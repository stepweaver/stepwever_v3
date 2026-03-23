import React from 'react';
import { render, screen } from '@testing-library/react';
import { safeHref } from '@/utils/safeHref';
import { parseChatLinks } from '@/utils/parseChatLinks';

describe('safeHref', () => {
  it('allows https URLs', () => {
    expect(safeHref('https://example.com/path')).toEqual({
      ok: true,
      href: 'https://example.com/path',
      isExternal: true,
    });
  });

  it('allows relative paths starting with /', () => {
    expect(safeHref('/projects/foo')).toEqual({
      ok: true,
      href: '/projects/foo',
      isExternal: false,
    });
  });

  it('blocks javascript: URLs', () => {
    expect(safeHref('javascript:alert(1)')).toEqual({ ok: false });
  });

  it('blocks data: URLs', () => {
    expect(safeHref('data:text/html,<script>bad</script>')).toEqual({
      ok: false,
    });
  });

  it('blocks protocol-relative URLs', () => {
    expect(safeHref('//evil.com/x')).toEqual({ ok: false });
  });
});

describe('parseChatLinks', () => {
  function renderLinks(text) {
    return render(<span data-testid='wrap'>{parseChatLinks(text)}</span>);
  }

  it('renders valid https link with security attrs', () => {
    renderLinks('See [here](https://example.com/a)');
    const a = screen.getByRole('link', { name: 'here' });
    expect(a).toHaveAttribute('href', 'https://example.com/a');
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).toHaveAttribute('rel', 'noopener noreferrer nofollow');
  });

  it('renders relative /projects/foo without target blank', () => {
    renderLinks('[x](/projects/foo)');
    const a = screen.getByRole('link', { name: 'x' });
    expect(a).toHaveAttribute('href', '/projects/foo');
    expect(a).not.toHaveAttribute('target');
  });

  it('does not render anchor for javascript:', () => {
    renderLinks('[bad](javascript:alert(1))');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByTestId('wrap')).toHaveTextContent('[bad](javascript:alert(1))');
  });

  it('does not render anchor for data:', () => {
    renderLinks('[bad](data:text/html,hi)');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
