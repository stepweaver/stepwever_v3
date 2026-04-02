'use client';

/**
 * Full-screen terminal overlay. linesMode is driven by PageTransition (editorial vs standard scan).
 */
export default function TerminalLoader({
  targetPath,
  fromPath,
  duration,
  phase,
  linesMode,
  fadeMs,
}) {
  const useLongSequence = linesMode === 'content';

  const contentLines = [
    { cmd: 'init transition.module', status: '[OK]' },
    { cmd: `route.resolve("${targetPath || '/'}")`, status: '[OK]' },
    { cmd: 'query content.database', status: '[OK]' },
    { cmd: 'decrypt payload.aes256', status: '[OK]' },
    { cmd: 'parse render.blocks', status: '[OK]' },
    { cmd: 'hydrate view.module', status: 'progress' },
  ];

  const standardLines = [
    { cmd: `route.resolve("${targetPath || '/'}")`, status: '[OK]' },
    { cmd: 'load view.module', status: '[OK]' },
    { cmd: 'render', status: 'progress' },
  ];

  const lines = useLongSequence ? contentLines : standardLines;
  const lineDelay = 120;
  const progressBarDuration = Math.max(400, duration - lines.length * lineDelay);

  const handoffLabel =
    fromPath && targetPath ? `${fromPath} → ${targetPath}` : targetPath || 'Loading';

  return (
    <div
      className='fixed inset-0 z-50 flex flex-col bg-bg text-neon font-ocr text-xs tracking-[0.15em] uppercase overflow-hidden'
      style={{
        backgroundColor: 'rgb(var(--bg))',
        animation:
          phase === 'out' ? `fadeOut ${fadeMs}ms ease-out forwards` : undefined,
      }}
      role='status'
    >
      <span className='sr-only'>Loading page: {handoffLabel}</span>
      <div
        className='relative flex-1 flex flex-col justify-start items-center w-full overflow-hidden px-4 sm:px-8 pt-16 sm:pt-24'
        aria-hidden
      >
        <div className='w-full max-w-2xl'>
          <div className='text-neon/40 mb-6 tracking-[0.2em]'>
            λSTEPWEAVER // LOADING MODULE
          </div>
          {fromPath && targetPath && (
            <div className='text-neon/30 mb-4 text-[0.65rem] normal-case tracking-normal truncate'>
              // handoff: {fromPath} → {targetPath}
            </div>
          )}

          <div className='space-y-2 overflow-hidden'>
            {lines.map((line, i) => (
              <TerminalLine
                key={i}
                cmd={line.cmd}
                status={line.status}
                delay={i * lineDelay}
                isProgress={line.status === 'progress'}
                progressDuration={progressBarDuration}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalLine({ cmd, status, delay, isProgress, progressDuration }) {
  return (
    <div
      className='flex items-center gap-2 sm:gap-4 min-w-0 animate-[hudLineIn_0.2s_ease-out_forwards] opacity-0'
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <span className='text-neon/60 shrink-0'>&gt;</span>
      <span className='text-neon truncate min-w-0'>{cmd}</span>
      {isProgress ? (
        <ProgressBar duration={progressDuration} delay={delay} />
      ) : (
        <span
          className='text-neon/70 ml-auto shrink-0 animate-[hudLineIn_0.15s_ease-out_forwards] opacity-0'
          style={{
            animationDelay: `${delay + 120}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {status}
        </span>
      )}
    </div>
  );
}

function ProgressBar({ duration, delay }) {
  const durationSec = Math.max(0.5, duration / 1000);
  return (
    <span
      className='ml-auto shrink-0 block w-24 h-3 overflow-hidden rounded-sm border border-neon/30 bg-neon/10'
      aria-hidden
    >
      <span
        className='terminal-progress-fill block h-full w-full bg-neon/80'
        style={{
          animationDuration: `${durationSec}s`,
          animationDelay: `${delay + 80}ms`,
          backgroundColor: 'rgb(var(--neon) / 0.8)',
        }}
      />
    </span>
  );
}
