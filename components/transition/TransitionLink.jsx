'use client';

import NextLink from 'next/link';
import { forwardRef } from 'react';
import { useNavigationTransition } from './NavigationTransitionContext';

/**
 * Optional explicit link for transition intent. Document-level capture already registers
 * most same-origin navigations; use this when you need parity outside normal bubbling (or for clarity).
 */
const TransitionLink = forwardRef(function TransitionLink(
  { href, onPointerDown, ...rest },
  ref
) {
  const ctx = useNavigationTransition();

  return (
    <NextLink
      ref={ref}
      href={href}
      onPointerDown={(e) => {
        if (typeof href === 'string' && ctx?.beginNavigation) {
          try {
            const url = new URL(href, window.location.origin);
            ctx.beginNavigation(`${url.pathname}${url.search || ''}`);
          } catch {
            /* ignore invalid href */
          }
        }
        onPointerDown?.(e);
      }}
      {...rest}
    />
  );
});

export default TransitionLink;
