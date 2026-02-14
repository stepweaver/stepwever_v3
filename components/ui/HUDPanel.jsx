'use client';

export function HUDPanel({ title, id, children, className = '' }) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-neon/20 bg-panel/70 p-5 shadow-neon-sm backdrop-blur transition-all duration-200 active:-translate-y-0.5 active:shadow-neon md:hover:-translate-y-1 md:hover:shadow-neon ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(180deg,rgba(255,255,255,0.10),transparent_35%)]" />
      <div className="pointer-events-none absolute left-3 top-3 h-2 w-8 border-l border-t border-accent/50" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-2 w-8 border-b border-r border-accent/50" />
      {(title || id) && (
        <header className="mb-4 flex items-start justify-between gap-4">
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
