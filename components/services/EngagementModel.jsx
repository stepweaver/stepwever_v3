export default function EngagementModel({ eyebrow, title, steps }) {
  if (!steps?.length) return null;

  return (
    <section className='relative z-30 pb-12 sm:pb-14' aria-labelledby='services-engagement-heading'>
      <header className='mb-8'>
        {eyebrow && (
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
            {eyebrow}
          </p>
        )}
        <h2 id='services-engagement-heading' className='font-ibm text-lg sm:text-xl text-text'>
          {title}
        </h2>
      </header>

      <ol className='grid grid-cols-1 md:grid-cols-3 gap-0 border border-neon/15 bg-panel/10'>
        {steps.map((step, idx) => (
          <li
            key={step.key}
            className={`flex flex-col gap-2 p-5 sm:p-6 ${
              idx > 0 ? 'border-t md:border-t-0 md:border-l border-neon/10' : ''
            }`}
          >
            <span className='font-ocr text-xs text-neon/45 tabular-nums'>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className='font-ocr text-xs uppercase tracking-[0.22em] text-neon'>
              {step.label}
            </span>
            <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
