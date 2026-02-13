'use client';

/**
 * Matches main-page (HUDPanel) layout: "MODULE" and "ID" on first line,
 * section name and id value on second line. Compact, no wrap.
 */
export function ModuleHeader({ name, id, className = '' }) {
  return (
    <header className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <p className="text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase">
          MODULE
        </p>
        <h2 className="text-sm sm:text-base font-semibold text-neon font-ibm uppercase whitespace-nowrap mt-0.5">
          {name}
        </h2>
      </div>
      {id != null && id !== '' && (
        <div className="text-right shrink-0">
          <p className="text-[10px] tracking-[0.22em] text-neon/50 font-ocr uppercase">
            ID
          </p>
          <p className="font-mono text-xs text-neon/80 whitespace-nowrap mt-0.5">
            {id}
          </p>
        </div>
      )}
    </header>
  );
}
