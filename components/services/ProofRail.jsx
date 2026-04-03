import Link from 'next/link';

export default function ProofRail({ items, title = 'Proof' }) {
  if (!items?.length) return null;

  return (
    <section className='relative z-30 py-8'>
      <header className='mb-4'>
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
          Evidence
        </p>
        <h2 className='font-ibm text-xl sm:text-2xl text-text'>{title}</h2>
      </header>

      <div className='border border-neon/15 bg-panel/20 p-4'>
        <div className='flex flex-wrap gap-3'>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className='group flex flex-col border border-neon/20 bg-terminal-dark/20 px-4 py-3 hover:border-neon/45 hover:bg-terminal-dark/35 transition-all'
            >
              <span className='font-ocr text-xs uppercase tracking-[0.12em] text-text-label mb-1'>
                Project
              </span>
              <span className='font-ibm text-sm text-neon/80 group-hover:text-neon transition-colors'>
                {item.label}
              </span>
              {item.reason && (
                <span className='font-ocr text-xs text-text-secondary/60 mt-1 max-w-[220px] leading-relaxed'>
                  {item.reason}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
