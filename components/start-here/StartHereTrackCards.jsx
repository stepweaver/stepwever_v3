import Link from 'next/link';

export default function StartHereTrackCards({ tracks, activeKey, onSelect }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {tracks.map((track) => {
        const isActive = activeKey === track.key;
        return (
          <button
            key={track.key}
            onClick={() => onSelect?.(track.key)}
            className={`relative text-left border p-5 transition-all ${
              isActive
                ? 'border-neon/60 bg-panel/40'
                : 'border-neon/20 bg-terminal-dark/15 hover:border-neon/35 hover:bg-panel/25'
            }`}
          >
            <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
            <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon/60' />

            <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label mb-2'>
              {track.label}
            </div>
            <h3
              className={`font-ibm text-base mb-2 transition-colors ${
                isActive ? 'text-neon' : 'text-text'
              }`}
            >
              {track.audience}
            </h3>
            <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent mb-3' />
            <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
              {track.summary}
            </p>

            {isActive && (
              <div className='mt-3'>
                <span className='font-ocr text-xs uppercase tracking-[0.12em] text-neon/60'>
                  Selected ↓
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
