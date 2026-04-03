export default function ProcessStrip({ steps, title = 'How I work' }) {
  return (
    <section className='relative z-30 py-8'>
      <header className='mb-6'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
          Process
        </p>
        <h2 className='font-ibm text-xl sm:text-2xl text-text'>{title}</h2>
      </header>

      <div className='relative border border-neon/15 bg-panel/20'>
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />
        <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className={`relative p-5 ${
                idx < steps.length - 1
                  ? 'border-b border-neon/10 lg:border-b-0 lg:border-r'
                  : ''
              }`}
            >
              <div className='font-ocr text-xs uppercase tracking-[0.28em] text-neon/40 mb-2'>
                {step.step}
              </div>
              <h3 className='font-ibm text-base text-neon mb-2'>{step.title}</h3>
              <div className='h-px w-8 bg-neon/30 mb-3' />
              <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
