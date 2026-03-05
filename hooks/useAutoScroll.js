import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * @param {Object} options
 * @param {number} [options.bottomThreshold=48] - px from bottom to still be considered "at bottom"
 * @param {number} [options.throttleMs=50] - throttle scroll-to-bottom during streaming (ms)
 */
export function useAutoScroll(options = {}) {
  const bottomThreshold = options.bottomThreshold ?? 48;
  const throttleMs = options.throttleMs ?? 50;

  const scrollerRef = useRef(null);
  const bottomRef = useRef(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const lastScrollTsRef = useRef(0);
  const userScrollTimeoutRef = useRef(null);

  const computeIsAtBottom = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return true;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceFromBottom <= bottomThreshold;
  }, [bottomThreshold]);

  const onScroll = useCallback(() => {
    const atBottom = computeIsAtBottom();
    setIsAtBottom(atBottom);

    if (userScrollTimeoutRef.current) {
      window.clearTimeout(userScrollTimeoutRef.current);
    }
    userScrollTimeoutRef.current = window.setTimeout(() => {
      userScrollTimeoutRef.current = null;
    }, 120);
  }, [computeIsAtBottom]);

  const scrollToBottom = useCallback((behavior = 'auto') => {
    bottomRef.current?.scrollIntoView({ block: 'end', behavior });
  }, []);

  /**
   * Call this when you append tokens / messages.
   * Keeps bottom pinned ONLY if user is already at bottom.
   * @param {boolean} isStreaming - if true, uses instant scroll and throttles
   */
  const maybeAutoScroll = useCallback(
    (isStreaming) => {
      const atBottomNow = computeIsAtBottom();
      if (!atBottomNow) return;

      const now = Date.now();
      if (isStreaming && now - lastScrollTsRef.current < throttleMs) return;
      lastScrollTsRef.current = now;

      // While streaming, prefer "auto" (instant) to avoid jittery smooth scrolling.
      scrollToBottom(isStreaming ? 'auto' : 'smooth');
    },
    [computeIsAtBottom, scrollToBottom, throttleMs]
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // On first mount, jump to bottom once.
  useLayoutEffect(() => {
    scrollToBottom('auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    scrollerRef,
    bottomRef,
    isAtBottom,
    scrollToBottom,
    maybeAutoScroll,
  };
}
