import Link from 'next/link';

export default function SelectedProof({
  id = 'selected-proof',
  eyebrow,
  sectionTitle,
  sectionIntro,
  featured,
  secondary = [],
  portfolioLink,
}) {
  if (!featured) return null;

  return (
    <section
      id={id}
      className='relative z-30 pb-12 sm:pb-14 scroll-mt-24'
      aria-labelledby='services-selected-proof-heading'
    >
      <header className='mb-6 max-w-2xl'>
        {eyebrow && (
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
            {eyebrow}
          </p>
        )}
        <h2 id='services-selected-proof-heading' className='font-ibm text-lg sm:text-xl text-text mb-3'>
          {sectionTitle}
        </h2>
        {sectionIntro && (
          <p className='font-ibm text-sm text-text-secondary leading-relaxed'>
            {sectionIntro}
          </p>
        )}
      </header>

      <div className='border border-neon/20 bg-panel/20 p-5 sm:p-6 mb-4'>
        <p className='font-ocr text-[11px] uppercase tracking-[0.18em] text-neon/60 mb-2'>Featured</p>
        <h3 className='font-ibm text-base text-neon mb-2'>{featured.title}</h3>
        <p className='font-ibm text-sm text-text-secondary leading-relaxed mb-4 max-w-2xl'>
          {featured.reason}
        </p>
        <Link
          href={`/projects/${featured.slug}`}
          className='font-ocr text-xs text-neon uppercase tracking-[0.14em] border-b border-neon/40 hover:border-neon pb-0.5 inline-block'
        >
          {featured.linkLabel}
        </Link>
      </div>

      {secondary.length > 0 && (
        <ul className='space-y-4'>
          {secondary.map((item) => (
            <li
              key={item.slug}
              className='pl-4 border-l-2 border-neon/25 py-0.5'
            >
              <h3 className='font-ibm text-sm text-text mb-1'>{item.title}</h3>
              <p className='font-ibm text-sm text-text-secondary leading-relaxed mb-2 max-w-2xl'>
                {item.reason}
              </p>
              <Link
                href={`/projects/${item.slug}`}
                className='font-ocr text-xs text-neon/80 uppercase tracking-[0.12em] hover:text-neon transition-colors'
              >
                {item.linkLabel} →
              </Link>
            </li>
          ))}
        </ul>
      )}

      {portfolioLink?.href && (
        <p className='mt-8'>
          <Link
            href={portfolioLink.href}
            className='font-ocr text-xs text-text-label uppercase tracking-[0.14em] hover:text-neon transition-colors'
          >
            {portfolioLink.label} →
          </Link>
        </p>
      )}
    </section>
  );
}
