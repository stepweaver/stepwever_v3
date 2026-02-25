'use client';

const statusConfig = {
  ONLINE: {
    textColor: 'text-neon',
    bg: 'bg-neon/10',
    border: 'border-neon/30',
    pulse: 'bg-neon',
  },
  OFFLINE: {
    textColor: 'text-muted',
    bg: 'bg-muted/10',
    border: 'border-muted/30',
    pulse: 'bg-muted',
  },
  'OPEN TO WORK': {
    textColor: 'text-warn',
    bg: 'bg-warn/10',
    border: 'border-warn/30',
    pulse: 'bg-warn',
  },
  BUSY: {
    textColor: 'text-danger',
    bg: 'bg-danger/10',
    border: 'border-danger/30',
    pulse: 'bg-danger',
  },
};

export function StatusPill({ status = 'ONLINE', size = 'default', className = '' }) {
  const config = statusConfig[status] || statusConfig.ONLINE;
  const isSmall = size === 'sm';
  return (
    <div
      className={`inline-flex items-center ${config.bg} ${config.border} border rounded shrink-0 ${className} ${
        isSmall ? 'gap-1.5 px-2 py-1' : 'gap-2.5 px-3 py-1.5'
      }`}
    >
      <span className={`relative flex shrink-0 items-center justify-center ${isSmall ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} aria-hidden>
        <span
          className={`absolute inline-flex rounded-full ${config.pulse} opacity-40 ${isSmall ? 'h-3.5 w-3.5' : 'h-5 w-5'}`}
          style={{ animation: 'status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}
        />
        <span
          className={`relative inline-flex rounded-full ${config.pulse} ring-2 ring-white/30 ${isSmall ? 'h-2 w-2' : 'h-3 w-3'}`}
          style={{ animation: 'status-indicator-pulse 1.2s ease-in-out infinite', willChange: 'transform, opacity' }}
        />
      </span>
      <span className={`${config.textColor} uppercase font-ocr font-bold whitespace-nowrap ${isSmall ? 'text-[10px] tracking-[0.2em]' : 'text-xs tracking-[0.3em]'}`}>
        {status}
      </span>
    </div>
  );
}
