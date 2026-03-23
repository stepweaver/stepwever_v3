'use client';

import { useRef, useCallback } from 'react';

/**
 * Client-side bot-protection hook.
 *
 * Provides:
 *  - A hidden honeypot field (bots fill it, humans never see it)
 *  - Submit-time timing metadata (detects instant submissions without stale-session drift)
 *
 * Usage:
 *   const { honeypotProps, getBotFields } = useBotProtection();
 *
 *   // Render the honeypot somewhere inside your <form>:
 *   <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
 *     <input {...honeypotProps} />
 *   </div>
 *
 *   // On submit, merge bot fields into your payload:
 *   const payload = { ...formData, ...getBotFields() };
 */
export function useBotProtection() {
  // Record initial load once, but emit fresh timing values at submit.
  const mountedAt = useRef(Date.now());
  const honeypotRef = useRef(null);

  const honeypotProps = {
    ref: honeypotRef,
    type: 'text',
    name: '_hp_website',
    autoComplete: 'off',
    tabIndex: -1,
    'aria-hidden': true,
    style: {
      position: 'absolute',
      left: '-9999px',
      opacity: 0,
      height: 0,
      width: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
  };

  /**
   * Returns the bot-protection meta-fields to merge into the request body.
   */
  const getBotFields = useCallback(() => ({
    _hp_website: honeypotRef.current?.value || '',
    _t: Date.now(),
    _d: Math.max(0, Date.now() - mountedAt.current),
  }), []);

  return { honeypotProps, getBotFields };
}
