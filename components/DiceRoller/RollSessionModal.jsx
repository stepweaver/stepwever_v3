'use client';

import { createPortal } from 'react-dom';
import { useVisualViewportRect } from '@/hooks/useVisualViewportRect';

export default function RollSessionModal({
  isOpen,
  onClose,
  children,
  title = 'ROLL OUTPUT // ACTIVE SESSION',
  closeLabel = 'ABORT',
  closeVariant = 'danger',
}) {
  const visualViewportRect = useVisualViewportRect(isOpen);

  if (!isOpen || typeof document === 'undefined') return null;

  const closeClasses =
    closeVariant === 'danger'
      ? 'text-danger/90 hover:text-danger hover:bg-danger/10'
      : 'text-neon/80 hover:text-neon hover:bg-neon/10';

  return createPortal(
    <>
      <button
        type='button'
        aria-label='Close roll session'
        onClick={onClose}
        className='fixed inset-0 z-[190] bg-black/80 backdrop-blur-sm cursor-pointer'
      />

      {/* Outer shell must be `fixed` only; `.hud-panel` sets position:relative and would override `fixed` on the same node */}
      <div
        className='fixed left-0 right-0 z-[200] m-0 w-full overflow-hidden'
        style={{
          top: visualViewportRect.top,
          height: visualViewportRect.height,
          maxHeight: visualViewportRect.height,
        }}
        role='dialog'
        aria-modal='true'
        aria-labelledby='roll-session-title'
      >
        <div className='flex h-full min-h-0 flex-col overflow-hidden bg-panel/92 backdrop-blur-sm'>
          <div className='relative z-[2] flex shrink-0 items-stretch justify-between gap-3 border-b border-neon/20 bg-surface/90 px-3 py-2.5 sm:px-4'>
            <p
              id='roll-session-title'
              className='self-center font-ocr text-[11px] uppercase leading-snug tracking-[0.14em] text-label/90 sm:text-xs'
            >
              {title}
            </p>
            <button
              type='button'
              onClick={onClose}
              className={`shrink-0 cursor-pointer rounded-none px-2.5 py-1.5 font-ibm text-[11px] uppercase tracking-widest transition-colors ${closeClasses}`}
              aria-label='Close roll session'
            >
              {closeLabel}
            </button>
          </div>
          <div className='relative z-[2] min-h-0 flex-1 overflow-y-auto overflow-x-hidden'>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
