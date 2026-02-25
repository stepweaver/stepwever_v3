'use client';

/**
 * Full-screen cyberpunk terminal overlay. Lines appear with staggered delays.
 * Content routes get extended lines; other routes get a shorter sequence.
 */
export default function TerminalLoader({ targetPath, duration, phase }) {
  const isContentRoute =
    targetPath?.startsWith('/codex') || targetPath?.startsWith('/meshtastic');

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

  const lines = isContentRoute ? contentLines : standardLines;
  const lineDelay = 180;
  const progressBarDuration = Math.max(400, duration - lines.length * lineDelay);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-bg text-neon font-ocr text-xs tracking-[0.15em] uppercase ${
        phase === 'out' ? 'animate-[fadeOut_0.3s_ease-out_forwards]' : ''
      }`}
      style={{ backgroundColor: 'rgb(var(--bg))' }}
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Subtle sweep effect */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]"
        aria-hidden
      >
        <div
          className="absolute top-0 left-0 w-1/3 h-full bg-neon animate-[hudSlide_2s_ease-in-out_infinite]"
          style={{ backgroundColor: 'rgb(var(--neon))' }}
        />
      </div>

      <div className="relative flex-1 flex flex-col justify-center pl-8 sm:pl-12 pt-8">
        {/* Header */}
        <div className="text-neon/40 mb-6 tracking-[0.2em]">
          STEPWEVER // TRANSITION v1.0
        </div>

        {/* Terminal lines */}
        <div className="space-y-2">
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
  );
}

function TerminalLine({ cmd, status, delay, isProgress, progressDuration }) {
  return (
    <div
      className="flex items-center gap-4 animate-[hudLineIn_0.2s_ease-out_forwards] opacity-0"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <span className="text-neon/60">&gt;</span>
      <span className="text-neon">{cmd}</span>
      {isProgress ? (
        <ProgressBar duration={progressDuration} delay={delay} />
      ) : (
        <span
          className="text-neon/70 ml-auto animate-[hudLineIn_0.15s_ease-out_forwards] opacity-0"
          style={{ animationDelay: `${delay + 120}ms`, animationFillMode: 'forwards' }}
        >
          {status}
        </span>
      )}
    </div>
  );
}

function ProgressBar({ duration, delay }) {
  const durationSec = Math.max(0.3, duration / 1000);
  return (
    <span
      className="ml-auto inline-block h-3 w-24 overflow-hidden rounded-sm border border-neon/30 bg-neon/5"
      aria-hidden
    >
      <span
        className="block h-full bg-neon/80 origin-left"
        style={{
          animation: `progressFill ${durationSec}s ease-out forwards`,
          animationDelay: `${delay + 100}ms`,
        }}
      />
    </span>
  );
}
