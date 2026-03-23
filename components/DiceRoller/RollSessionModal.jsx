'use client';

import { X } from 'lucide-react';

export default function RollSessionModal({
  isOpen,
  onClose,
  children,
  title = 'Roll session',
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 top-24 z-50 flex items-start justify-center p-1.5 sm:p-4'>
      <button
        type='button'
        aria-label='Close roll session'
        onClick={onClose}
        className='absolute inset-0 bg-black/80 backdrop-blur-[1px] cursor-pointer'
      />

      <div className='relative w-full max-w-5xl max-h-full overflow-hidden border border-neon/20 bg-panel/95'>
        <div className='flex items-center justify-between px-3 sm:px-4 py-2 border-b border-neon/20 bg-panel/75'>
          <p className='font-ocr text-xs tracking-[0.2em] text-neon/60 uppercase'>
            {title}
          </p>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex items-center justify-center w-7 h-7 text-neon/70 hover:text-neon hover:bg-panel/70 transition-colors cursor-pointer'
            aria-label='Close roll session'
          >
            <X size={14} />
          </button>
        </div>
        <div className='overflow-y-auto max-h-[calc(100%-44px)] p-2.5 sm:p-4'>
          {children}
        </div>
      </div>
    </div>
  );
}
