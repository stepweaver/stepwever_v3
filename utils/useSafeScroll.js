'use client';

import { useEffect, useRef, useCallback } from 'react';
import errorMonitor from './errorMonitor';

// Throttle function for performance
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

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function useSafeScroll(options = {}) {
  const {
    throttleMs = 16, // ~60fps
    debounceMs = 100,
    passive = true,
    onScroll,
    onScrollStart,
    onScrollEnd
  } = options;

  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  const safeScrollHandler = useCallback((event) => {
    try {
      // Check if window is available (SSR safety)
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
      }, debounceMs);

    } catch (error) {
      errorMonitor.logScrollError(error, {
        component: 'useSafeScroll',
        options
      });
    }
  }, [onScroll, onScrollStart, onScrollEnd, debounceMs]);

  const throttledScrollHandler = useCallback(
    throttle(safeScrollHandler, throttleMs),
    [safeScrollHandler, throttleMs]
  );

  useEffect(() => {
    // Only add event listener if window is available
    if (typeof window === 'undefined') return;

    try {
      window.addEventListener('scroll', throttledScrollHandler, { passive });
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
  }, [throttledScrollHandler, passive]);

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