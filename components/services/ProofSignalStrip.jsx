export default function ProofSignalStrip({ eyebrow, title, items }) {
  if (!items?.length) return null;

  return (
    <section className='relative z-30 pb-12 sm:pb-14' aria-labelledby='services-proof-signals-heading'>
      <header className='mb-6'>
        {eyebrow && (
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 id='services-proof-signals-heading' className='font-ibm text-lg sm:text-xl text-text'>
            {title}
          </h2>
        )}
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-px border border-neon/15 bg-neon/15'>
        {items.map((item) => (
          <article
            key={item.title}
            className='bg-panel/30 px-4 py-4 sm:px-5 sm:py-5'
          >
            <h3 className='font-ocr text-[11px] uppercase tracking-[0.2em] text-neon/80 mb-2'>
              {item.title}
            </h3>
            <p className='font-ibm text-sm text-text font-medium leading-snug mb-2'>
              {item.signal}
            </p>
            <p className='font-ibm text-xs sm:text-sm text-text-secondary leading-relaxed'>
              {item.explanation}
            </p>
            {item.source ? (
              <p className='font-ocr text-[10px] uppercase tracking-[0.14em] text-text-label mt-3'>
                {item.source}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
