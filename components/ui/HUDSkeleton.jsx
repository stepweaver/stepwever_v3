'use client';

export function HUDSkeleton({ label = 'SCANNING MODULES...', lines = 3, className = '' }) {
  return (
    <div className={`hud-panel p-6 motion-safe:animate-pulse ${className}`}>
      <div className="text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase">{label}</div>
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-neon/10"
            style={{ width: `${60 + ((i * 17) % 30)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
