'use client';

import GlitchLambda from '@/components/ui/GlitchLambda';
import { useMatrixSync } from '@/hooks/useMatrixSync';

const OUTPUT_COLOR = {
  init: 'text-neon',
  scan: 'text-neon',
  trace: 'text-accent',
  lock: 'text-accent',
  fail: 'text-warn',
  lost: 'text-danger',
  unplugged: 'text-danger',
  idle: 'text-neon',
};

const CELL_STYLE = {
  init: 'border-neon/25 text-neon/80',
  scan: 'border-neon/25 text-neon/80',
  trace: 'border-accent/20 text-accent/90',
  lock: 'border-accent/30 text-accent',
  fail: 'border-warn/20 text-warn',
  lost: 'border-danger/15 text-danger/50',
  unplugged: 'border-muted/15 text-muted/30',
  idle: 'border-neon/10 text-neon/30',
};

export function MatrixSync() {
  const { attempt, terminalOutput, matrixCells, showPrompt, isMounted, phase } =
    useMatrixSync();

  const isErr = phase === 'fail' || phase === 'lost' || phase === 'unplugged';
  const outColor = OUTPUT_COLOR[phase] ?? 'text-neon';
  const cellClass = CELL_STYLE[phase] ?? 'border-neon/30 text-neon';

  return (
    <div
      className={[
        'relative overflow-hidden border bg-panel/50 px-3 py-2',
        isErr ? 'border-danger/25' : 'border-neon/25',
      ].join(' ')}
      aria-live='polite'
    >
      {/* corner brackets */}
      <div className='pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-neon/30' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-neon/30' />
      <div className='pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-neon/60' />

      {/* subtle scanlines */}
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_10px] opacity-10' />

      {/* static header */}
      <div className='relative pb-2 font-ocr text-[10px] uppercase tracking-[0.24em]'>
        <span className='text-neon/70'>MATRIX LINK</span>
        <span className='px-2 text-neon/35'>//</span>
        <span className='text-neon/70'>STATUS</span>
        <span className='px-2 text-neon/35'>//</span>
        <span className='text-danger motion-safe:animate-pulse'>UNPLUGGED</span>
      </div>

      {/* terminal line */}
      <div
        className={[
          'relative flex min-h-6 items-center gap-2 overflow-hidden py-1 font-mono text-xs',
          outColor,
        ].join(' ')}
      >
        <GlitchLambda className={`shrink-0 text-xs ${outColor}`} />

        {terminalOutput && (
          <span
            className={[
              'min-w-0 truncate font-ocr uppercase tracking-[0.08em]',
              phase === 'unplugged' ? 'motion-safe:animate-pulse' : '',
            ].join(' ')}
          >
            {terminalOutput}
          </span>
        )}

        {showPrompt && <span className='motion-safe:animate-pulse'>_</span>}
      </div>

      {/* register cells */}
      <div className='relative grid grid-cols-6 gap-[2px] pt-2'>
        {matrixCells.map((cell, index) => (
          <div
            key={`${cell}-${index}-${isMounted}`}
            className={[
              'flex h-6 items-center justify-center border bg-panel/35 font-mono text-[11px] font-bold transition-colors duration-200',
              cellClass,
            ].join(' ')}
          >
            {cell}
          </div>
        ))}
      </div>

      {/* quiet footer count */}
      <div className='relative pt-2 text-right font-ocr text-[10px] uppercase tracking-[0.2em] text-neon/40'>
        LINK ATTEMPT // {attempt.toString().padStart(2, '0')}
      </div>
    </div>
  );
}