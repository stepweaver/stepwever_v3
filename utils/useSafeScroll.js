'use client';

import { useEffect, useRef, useCallback } from 'react';
import errorMonitor from './errorMonitor';

// Simple throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function useSafeScroll(options = {}) {
  const {
    throttleMs = 16, // ~60fps
    onScroll,
    onScrollStart,
    onScrollEnd
  } = options;

  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  const handleScroll = useCallback((event) => {
    try {
      if (typeof window === 'undefined') return;

      const scrollTop = window.scrollY || 0;
      const scrollLeft = window.scrollX || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const docWidth = Math.max(
        document.documentElement.scrollWidth - window.innerWidth,
        1
      );

      const scrollData = {
        scrollTop,
        scrollLeft,
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
        scrollProgressY: Math.min(Math.max(scrollTop / docHeight, 0), 1),
        scrollProgressX: Math.min(Math.max(scrollLeft / docWidth, 0), 1),
        event
      };

      // Handle scroll start
      if (!isScrollingRef.current && onScrollStart) {
        isScrollingRef.current = true;
        onScrollStart(scrollData);
      }

      // Call the main scroll handler
      if (onScroll) {
        onScroll(scrollData);
      }

      // Handle scroll end with debounce
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrollingRef.current && onScrollEnd) {
          isScrollingRef.current = false;
          onScrollEnd(scrollData);
        }
      }, 100);

    } catch (error) {
      errorMonitor.logScrollError(error, {
        component: 'useSafeScroll'
      });
    }
  }, [onScroll, onScrollStart, onScrollEnd]);

  const throttledScrollHandler = useCallback(
    throttle(handleScroll, throttleMs),
    [handleScroll, throttleMs]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    } catch (error) {
      errorMonitor.logScrollError(error, {
        component: 'useSafeScroll',
        action: 'addEventListener'
      });
    }

    return () => {
      try {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', throttledScrollHandler);
        }
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      } catch (error) {
        errorMonitor.logScrollError(error, {
          component: 'useSafeScroll',
          action: 'cleanup'
        });
      }
    };
  }, [throttledScrollHandler]);

  // Return scroll utilities
  const getScrollPosition = useCallback(() => {
    if (typeof window === 'undefined') return { scrollTop: 0, scrollLeft: 0 };

    try {
      return {
        scrollTop: window.scrollY || 0,
        scrollLeft: window.scrollX || 0
      };
    } catch (error) {
      errorMonitor.logScrollError(error, {
        component: 'useSafeScroll',
        action: 'getScrollPosition'
      });
      return { scrollTop: 0, scrollLeft: 0 };
    }
  }, []);

  const scrollTo = useCallback((options) => {
    if (typeof window === 'undefined') return;

    try {
      window.scrollTo(options);
    } catch (error) {
      errorMonitor.logScrollError(error, {
        component: 'useSafeScroll',
        action: 'scrollTo',
        options
      });
    }
  }, []);

  return {
    getScrollPosition,
    scrollTo,
    isScrolling: isScrollingRef.current
  };
} 