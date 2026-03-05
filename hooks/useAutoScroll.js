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
  const [followModeActive, setFollowModeActive] = useState(false);
  const lastScrollTsRef = useRef(0);
  const userScrollTimeoutRef = useRef(null);
  const followUpTimeoutsRef = useRef([]);

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

  /** Scroll the container to bottom. Uses scrollTop for reliable positioning. */
  const scrollToBottom = useCallback((behavior = 'auto') => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  /** Run scroll after layout has settled (RAF) and optionally after delays for keyboard/layout. */
  const performScroll = useCallback(
    (behavior, scheduleFollowUps = false) => {
      const el = scrollerRef.current;
      if (!el) return;

      const doScroll = () => {
        el.scrollTo({ top: el.scrollHeight, behavior });
      };

      // Double RAF: wait for layout to settle before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          doScroll();
          if (scheduleFollowUps && typeof window !== 'undefined') {
            // Clear any pending follow-ups
            followUpTimeoutsRef.current.forEach((id) => clearTimeout(id));
            followUpTimeoutsRef.current = [];
            // Re-scroll after keyboard dismiss and layout settle (mobile)
            [100, 300, 500, 1000].forEach((ms) => {
              const id = setTimeout(() => {
                const scrollEl = scrollerRef.current;
                if (!scrollEl) return;
                const dist =
                  scrollEl.scrollHeight -
                  scrollEl.scrollTop -
                  scrollEl.clientHeight;
                // Only follow-up if user hasn't scrolled up
                if (dist <= bottomThreshold * 2) {
                  scrollEl.scrollTo({
                    top: scrollEl.scrollHeight,
                    behavior: 'auto',
                  });
                }
                followUpTimeoutsRef.current = followUpTimeoutsRef.current.filter(
                  (x) => x !== id
                );
              }, ms);
              followUpTimeoutsRef.current.push(id);
            });
          }
        });
      });
    },
    [bottomThreshold]
  );

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

      // When loading completes, enter follow mode so we keep scrolling as layout settles
      if (!isStreaming) {
        setFollowModeActive(true);
        setTimeout(() => setFollowModeActive(false), 2000);
      }
      performScroll(isStreaming ? 'auto' : 'smooth', !isStreaming);
    },
    [computeIsAtBottom, throttleMs, performScroll]
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Re-scroll when viewport resizes (e.g. mobile keyboard open/close)
  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!vv) return;

    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      // If we're near bottom, re-scroll to stay pinned (keyboard caused shift)
      if (distanceFromBottom <= bottomThreshold * 2) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
      }
    };

    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onResize);
    };
  }, [bottomThreshold]);

  // Poll when in follow mode: content height can change after layout (text wrapping)
  // ResizeObserver doesn't fire for scrollHeight changes in overflow containers
  useEffect(() => {
    if (!followModeActive) return;
    let lastSh = 0;
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const sh = el.scrollHeight;
      const dist = sh - el.scrollTop - el.clientHeight;
      if (sh !== lastSh) {
        lastSh = sh;
        setIsAtBottom(dist <= bottomThreshold);
        if (dist > bottomThreshold) {
          el.scrollTo({ top: sh, behavior: 'auto' });
        }
      }
    }, 80);
    return () => clearInterval(id);
  }, [followModeActive, bottomThreshold]);

  // Cleanup follow-up timeouts on unmount
  useEffect(() => {
    return () => {
      followUpTimeoutsRef.current.forEach((id) => clearTimeout(id));
      followUpTimeoutsRef.current = [];
    };
  }, []);

  // On first mount, jump to bottom once.
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = scrollerRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
      });
    });
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
