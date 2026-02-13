'use client';

export function InkDivider({ showSeal = false, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 ${className}`}>
      <div
        className="h-px flex-1 max-w-[120px] opacity-60 bg-muted/50"
        style={{ height: '2px' }}
      />
      <div
        className="h-px flex-1 max-w-[120px] opacity-60 bg-muted/50"
        style={{ height: '2px' }}
      />
    </div>
  );
}
