export default function FitCheck({ good, bad, title = 'Good fit / not fit' }) {
  return (
    <section className='relative z-30 py-8'>
      <header className='mb-6'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
          Fit check
        </p>
        <h2 className='font-ibm text-xl sm:text-2xl text-text'>{title}</h2>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Good fit */}
        <div className='relative border border-neon/20 bg-panel/25 p-5'>
          <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-neon/60' />
          <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-neon/25' />
          <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-neon/25' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-neon/60' />

          <div className='flex items-center gap-2 mb-4'>
            <span className='h-2 w-2 bg-neon/70 inline-block' />
            <p className='font-ocr text-xs uppercase tracking-[0.18em] text-neon/70'>
              Good match
            </p>
          </div>
          <ul className='space-y-2.5'>
            {good.map((item, i) => (
              <li key={i} className='flex items-start gap-2 font-ibm text-sm text-text-secondary leading-relaxed'>
                <span className='text-neon/50 shrink-0 mt-0.5 font-ocr text-xs'>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not fit */}
        <div className='relative border border-neon/10 bg-terminal-dark/10 p-5'>
          <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-neon/25' />
          <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-neon/15' />
          <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-neon/15' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-neon/25' />

          <div className='flex items-center gap-2 mb-4'>
            <span className='h-2 w-2 border border-neon/40 inline-block' />
            <p className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>
              Not a fit
            </p>
          </div>
          <ul className='space-y-2.5'>
            {bad.map((item, i) => (
              <li key={i} className='flex items-start gap-2 font-ibm text-sm text-text-secondary/60 leading-relaxed'>
                <span className='text-text-secondary/40 shrink-0 mt-0.5 font-ocr text-xs'>·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
