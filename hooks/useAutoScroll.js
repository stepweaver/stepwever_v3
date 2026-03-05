import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

function isNearBottom(el, thresholdPx = 120) {
  if (!el) return true;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  return distanceFromBottom < thresholdPx;
}

/**
 * Sentinel + near-bottom detection pattern for natural chat scroll behavior.
 * - Transcript owns the scroll (overflow-y: auto)
 * - Auto-scroll only when user is "at bottom" (shouldStickRef)
 * - When user sends, call stickToBottom() to force pin
 * - Uses bottom sentinel + scrollIntoView (more resilient than scrollTop math)
 */
export function useAutoScroll(options = {}) {
  const thresholdPx = options.bottomThreshold ?? 120;

  const scrollerRef = useRef(null);
  const endRef = useRef(null);
  const shouldStickRef = useRef(true);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = useCallback((behavior = 'auto') => {
    endRef.current?.scrollIntoView({ behavior, block: 'end' });
  }, []);

  const stickToBottom = useCallback(() => {
    shouldStickRef.current = true;
  }, []);

  const scrollIfSticky = useCallback(
    (useSmooth = false) => {
      if (shouldStickRef.current) {
        scrollToBottom(useSmooth ? 'smooth' : 'auto');
      }
    },
    [scrollToBottom]
  );

  // Track whether user is pinned to bottom
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const near = isNearBottom(el, thresholdPx);
      shouldStickRef.current = near;
      setIsAtBottom(near);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [thresholdPx]);

  // Re-scroll when viewport resizes (mobile keyboard open/close)
  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!vv) return;

    const onViewportChange = () => {
      if (shouldStickRef.current) {
        endRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
      }
    };

    vv.addEventListener('resize', onViewportChange);
    vv.addEventListener('scroll', onViewportChange);
    return () => {
      vv.removeEventListener('resize', onViewportChange);
      vv.removeEventListener('scroll', onViewportChange);
    };
  }, []);

  // On first mount, jump to bottom
  useLayoutEffect(() => {
    scrollToBottom('auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    scrollerRef,
    endRef,
    isAtBottom,
    scrollToBottom,
    stickToBottom,
    scrollIfSticky,
  };
}
