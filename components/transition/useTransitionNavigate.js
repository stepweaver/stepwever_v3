'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useNavigationTransition } from './NavigationTransitionContext';

/**
 * Like router.push, but registers navigation intent for PageTransition (slow escalation + handoff).
 */
export function useTransitionNavigate() {
  const router = useRouter();
  const ctx = useNavigationTransition();

  return useCallback(
    (href) => {
      if (typeof window !== 'undefined') {
        try {
          const url = new URL(href, window.location.origin);
          ctx?.beginNavigation?.(`${url.pathname}${url.search || ''}`);
        } catch {
          /* fall through */
        }
      }
      router.push(href);
    },
    [router, ctx]
  );
}
