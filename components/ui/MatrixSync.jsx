'use client';

import GlitchLambda from '@/components/ui/GlitchLambda';
import { useMatrixSync } from '@/hooks/useMatrixSync';

const SIGNAL = { init: 1, scan: 2, trace: 3, lock: 4, fail: 1, lost: 0, unplugged: 0, idle: 0 };

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
  init: 'border-neon/30 text-neon',
  scan: 'border-neon/30 text-neon',
  trace: 'border-accent/20 text-accent',
  lock: 'border-accent/30 text-accent',
  fail: 'border-warn/20 text-warn',
  lost: 'border-danger/15 text-danger/40',
  unplugged: 'border-muted/15 text-muted/30',
  idle: 'border-neon/20 text-neon/40',
};

function SignalBars({ strength }) {
  return (
    <span className='inline-flex items-end gap-[2px] h-[10px]' aria-label={`Signal ${strength}/4`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`w-[2px] rounded-[1px] transition-all duration-300 ${
            i <= strength ? 'bg-neon' : 'bg-muted/20'
          }`}
          style={{ height: `${2 + i * 2}px` }}
        />
      ))}
    </span>
  );
}

export function MatrixSync() {
  const { attempt, terminalOutput, matrixCells, showPrompt, isMounted, phase } =
    useMatrixSync();

  const isErr = phase === 'fail' || phase === 'lost' || phase === 'unplugged';
  const outColor = OUTPUT_COLOR[phase] ?? 'text-neon';
  const cellClass = CELL_STYLE[phase] ?? 'border-neon/30 text-neon';

  return (
    <div
      className={`relative border bg-panel/70 p-2 sm:p-3 rounded-lg space-y-1.5 overflow-hidden transition-colors duration-300 ${
        isErr ? 'border-danger/30' : 'border-neon/30'
      }`}
      aria-live='polite'
    >

      <div className='flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-wider text-neon/70 font-ocr'>
        <span className='flex items-center gap-1.5'>
          MATRIX SYNC
          <SignalBars strength={SIGNAL[phase] ?? 0} />
        </span>
        <span className={`font-mono transition-colors duration-200 ${isErr ? 'text-danger' : 'text-neon'}`}>
          #{attempt.toString().padStart(2, '0')}
        </span>
      </div>

      <div className={`font-mono text-xs h-5 flex items-center overflow-hidden gap-1 transition-colors duration-200 ${outColor}`}>
        <GlitchLambda className={`text-xs inline-block flex-shrink-0 ${outColor}`} />
        {terminalOutput && (
          <span
            className={`font-ocr whitespace-nowrap truncate ${
              phase === 'unplugged' ? 'motion-safe:animate-pulse' : ''
            }`}
          >
            {terminalOutput}
          </span>
        )}
        {showPrompt && <span className='motion-safe:animate-pulse'>_</span>}
      </div>

      <div className='grid grid-cols-6 gap-0.5'>
        {matrixCells.map((cell, index) => (
          <div
            key={`${cell}-${index}-${isMounted}`}
            className={`h-5 border bg-panel/50 flex items-center justify-center font-mono text-xs font-bold rounded transition-all duration-200 ${cellClass}`}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
