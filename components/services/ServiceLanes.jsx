export default function ServiceLanes({ eyebrow, lanes, title = 'What I help with' }) {
  if (!lanes?.length) return null;

  return (
    <section className='relative z-30 pb-12 sm:pb-14' aria-labelledby='services-lanes-heading'>
      <header className='mb-8'>
        {eyebrow && (
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
            {eyebrow}
          </p>
        )}
        <h2 id='services-lanes-heading' className='font-ibm text-lg sm:text-xl text-text'>
          {title}
        </h2>
      </header>

      <div className='space-y-0 border border-neon/15 divide-y divide-neon/15'>
        {lanes.map((lane) => (
          <article key={lane.key} className='px-4 py-6 sm:px-6 sm:py-7 bg-panel/15'>
            <h3 className='font-ibm text-base sm:text-lg text-neon mb-3 leading-snug'>
              {lane.title}
            </h3>
            <div className='space-y-2 max-w-2xl'>
              {lane.body.map((paragraph, i) => (
                <p
                  key={`${lane.key}-${i}`}
                  className='font-ibm text-sm text-text-secondary leading-relaxed'
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
