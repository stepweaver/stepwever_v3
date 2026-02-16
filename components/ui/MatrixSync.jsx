'use client';

import GlitchLambda from '@/components/ui/GlitchLambda';
import { useMatrixSync } from '@/hooks/useMatrixSync';

export function MatrixSync() {
  const { attempt, terminalOutput, matrixCells, showPrompt, isMounted } =
    useMatrixSync();

  return (
    <div
      className='border border-neon/30 bg-panel/70 p-2 sm:p-3 rounded-lg space-y-1.5'
      aria-live='polite'
    >
      <div className='flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-wider text-neon/70 font-ocr'>
        <span>MATRIX SYNC</span>
        <span className='text-neon font-mono'>
          #{attempt.toString().padStart(2, '0')}
        </span>
      </div>
      <div className='font-mono text-neon text-xs h-5 flex items-center overflow-hidden gap-1'>
        <GlitchLambda className='text-neon text-xs inline-block flex-shrink-0' />
        {terminalOutput && (
          <span className='font-ocr whitespace-nowrap truncate'>
            {terminalOutput}
          </span>
        )}
        {showPrompt && <span className='motion-safe:animate-pulse'>_</span>}
      </div>
      <div className='grid grid-cols-6 gap-0.5'>
        {matrixCells.map((cell, index) => (
          <div
            key={`${cell}-${index}-${isMounted}`}
            className='h-5 border border-neon/30 bg-panel/50 flex items-center justify-center text-neon font-mono text-xs font-bold rounded'
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
