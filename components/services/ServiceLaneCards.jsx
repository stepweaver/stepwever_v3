import Link from 'next/link';

export default function ServiceLaneCards({ lanes, title = 'What I build' }) {
  return (
    <section className='relative z-30 py-8'>
      <header className='mb-6'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
          Service lanes
        </p>
        <h2 className='font-ibm text-xl sm:text-2xl text-text'>{title}</h2>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {lanes.map((lane) => (
          <article
            key={lane.key}
            className='relative border border-neon/20 bg-panel/25 p-5 flex flex-col'
          >
            <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-neon/60' />
            <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-neon/60' />

            <div className='flex items-start justify-between gap-2 mb-3'>
              <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>
                {lane.label}
              </div>
            </div>

            <h3 className='font-ibm text-lg text-neon mb-2'>{lane.title}</h3>
            <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent mb-3' />
            <p className='font-ibm text-sm text-text-secondary leading-relaxed mb-4 flex-1'>
              {lane.body}
            </p>

            {lane.examples?.length > 0 && (
              <ul className='mb-4 space-y-1'>
                {lane.examples.map((ex) => (
                  <li
                    key={ex}
                    className='font-ocr text-xs text-text-secondary/70 flex items-start gap-2'
                  >
                    <span className='text-neon/50 shrink-0 mt-0.5'>·</span>
                    {ex}
                  </li>
                ))}
              </ul>
            )}

            {lane.href && (
              <Link
                href={lane.href}
                className='inline-flex items-center font-ocr text-xs text-neon/70 uppercase tracking-[0.12em] hover:text-neon transition-colors mt-auto'
              >
                Details →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
