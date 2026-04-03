import Link from 'next/link';

export default function BriefProjectList({ projects }) {
  return (
    <section className='py-6'>
      <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
        Project dossier
      </p>
      <div className='space-y-3'>
        {projects.map((proj) => (
          <article
            key={proj.slug}
            className='relative border border-neon/20 bg-terminal-dark/15 p-4'
          >
            <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
            <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
            <div className='pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon/60' />

            <div className='flex items-start justify-between gap-4 flex-wrap'>
              <div className='min-w-0'>
                <p className='font-ocr text-xs uppercase tracking-[0.15em] text-text-label mb-1'>
                  {proj.type}
                </p>
                <h3 className='font-ibm text-base text-neon mb-2'>{proj.label}</h3>
                <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
                  {proj.summary}
                </p>
                <div className='flex flex-wrap gap-1.5 mt-3'>
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className='font-ocr text-[10px] text-neon/60 border border-neon/20 px-2 py-0.5'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={proj.href}
                className='shrink-0 font-ocr text-xs text-neon/60 uppercase tracking-[0.12em] hover:text-neon transition-colors whitespace-nowrap'
              >
                Case study →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
