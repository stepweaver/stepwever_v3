export default function ProblemGrid({ problems, title = 'Problems I solve' }) {
  return (
    <section className='relative z-30 py-8'>
      <header className='mb-6'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
          Signals
        </p>
        <h2 className='font-ibm text-xl sm:text-2xl text-text'>{title}</h2>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {problems.map((problem) => (
          <article
            key={problem.id}
            className='relative border border-neon/20 bg-terminal-dark/15 p-4'
          >
            <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
            <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon/60' />

            <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label mb-2'>
              {problem.id}
            </div>
            <h3 className='font-ibm text-base text-neon mb-2'>{problem.title}</h3>
            <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent mb-3' />
            <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
              {problem.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
