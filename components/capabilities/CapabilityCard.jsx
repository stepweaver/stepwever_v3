import Link from 'next/link';

export default function CapabilityCard({ capability }) {
  const { title, description, evidence, relatedProjects, stack, trustFlags } = capability;

  return (
    <article className='relative border border-neon/20 bg-terminal-dark/15 p-5'>
      <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-neon/60' />

      <h3 className='font-ibm text-base text-neon mb-2'>{title}</h3>
      <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent mb-3' />
      <p className='font-ibm text-sm text-text-secondary leading-relaxed mb-4'>{description}</p>

      {/* Evidence */}
      {evidence?.length > 0 && (
        <div className='mb-4'>
          <p className='font-ocr text-[10px] uppercase tracking-[0.2em] text-text-label mb-2'>
            Evidence
          </p>
          <ul className='space-y-1.5'>
            {evidence.map((item, i) => (
              <li key={i} className='flex items-start gap-2 font-ibm text-xs text-text-secondary leading-relaxed'>
                <span className='text-neon/45 shrink-0 mt-0.5 font-ocr text-[10px]'>·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related projects */}
      {relatedProjects?.length > 0 && (
        <div className='mb-4'>
          <p className='font-ocr text-[10px] uppercase tracking-[0.2em] text-text-label mb-2'>
            Proof
          </p>
          <div className='flex flex-wrap gap-2'>
            {relatedProjects.map((proj) => (
              <Link
                key={proj.slug}
                href={`/projects/${proj.slug}`}
                className='font-ocr text-[10px] text-neon/70 border border-neon/20 px-2 py-0.5 uppercase tracking-[0.1em] hover:border-neon/45 hover:text-neon transition-colors'
              >
                {proj.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stack */}
      {stack?.length > 0 && (
        <div className='mb-3'>
          <p className='font-ocr text-[10px] uppercase tracking-[0.2em] text-text-label mb-1.5'>
            Stack
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {stack.map((s) => (
              <span key={s} className='font-ibm text-[11px] text-text-secondary/60'>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Trust flags */}
      {trustFlags?.length > 0 && (
        <div className='flex flex-wrap gap-1.5 pt-2 border-t border-neon/10'>
          {trustFlags.map((flag) => (
            <span
              key={flag}
              className='font-ocr text-[9px] text-accent/60 border border-accent/20 px-1.5 py-0.5 uppercase tracking-[0.1em]'
            >
              {flag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
