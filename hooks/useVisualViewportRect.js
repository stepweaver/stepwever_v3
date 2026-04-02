'use client';

import { useState, useEffect } from 'react';

/**
 * Sync a fixed fullscreen layer to the visual viewport (mobile URL bar, keyboard).
 * Same behavior as ChatWidget fullscreen positioning.
 */
export function useVisualViewportRect(enabled) {
  const [rect, setRect] = useState(() =>
    typeof window !== 'undefined' && window.visualViewport
      ? { top: 0, height: window.visualViewport.height }
      : { top: 0, height: '100dvh' }
  );

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.visualViewport) return;
    let rafId = null;
    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setRect({
          top: window.visualViewport.offsetTop,
          height: window.visualViewport.height,
        });
      });
    };
    scheduleUpdate();
    window.visualViewport.addEventListener('resize', scheduleUpdate);
    return () => {
      window.visualViewport.removeEventListener('resize', scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return rect;
}
