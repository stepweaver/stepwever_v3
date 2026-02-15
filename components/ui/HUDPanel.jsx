'use client';

export function HUDPanel({ title, id, children, className = '' }) {
  return (
    <section
      className={`hud-panel relative overflow-hidden p-5 transition-all duration-200 active:-translate-y-0.5 md:hover:-translate-y-1 ${className}`}
    >
      {(title || id) && (
        <header className="relative z-10 mb-4 flex items-start justify-between gap-4">
          {title && (
            <div>
              <p className="text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase">MODULE</p>
              <h2 className="text-lg font-semibold text-text font-ibm">{title}</h2>
            </div>
          )}
          {id && (
            <div className="text-right text-xs text-muted font-mono shrink-0">
              <div className="tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]">ID</div>
              <div className="font-mono text-neon/80 whitespace-nowrap">{id}</div>
            </div>
          )}
        </header>
      )}
      <div className="relative z-10 text-sm text-text/90 flex-1 min-h-0 flex flex-col">{children}</div>
    </section>
  );
}
