import Link from 'next/link';

export default function BriefProofStrip({ projects }) {
  return (
    <section className='py-6'>
      <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
        Flagship proof
      </p>
      <div className='flex flex-wrap gap-3'>
        {projects.map((proj) => (
          <Link
            key={proj.slug}
            href={proj.href}
            className='group flex flex-col border border-neon/20 bg-terminal-dark/20 px-4 py-3 hover:border-neon/45 hover:bg-terminal-dark/35 transition-all'
          >
            <span className='font-ocr text-[10px] uppercase tracking-[0.15em] text-text-label mb-1'>
              {proj.type}
            </span>
            <span className='font-ibm text-sm text-neon/80 group-hover:text-neon transition-colors'>
              {proj.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
