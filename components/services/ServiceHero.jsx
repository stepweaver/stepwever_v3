import Link from 'next/link';

export default function ServiceHero({ eyebrow, title, body, primaryCta, secondaryCta }) {
  return (
    <section className='relative z-30 pt-8 pb-10 sm:pt-12 sm:pb-14'>
      <div className='relative border border-neon/20 bg-panel/25 p-6 sm:p-8'>
        <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
        <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />

        {eyebrow && (
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
            {eyebrow}
          </p>
        )}

        <h1 className='font-ibm text-2xl sm:text-3xl md:text-4xl text-neon leading-tight max-w-4xl mb-4'>
          {title}
        </h1>

        {body && (
          <p className='font-ibm text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl mb-8'>
            {body}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className='flex flex-wrap gap-3'>
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className='inline-flex items-center border border-neon bg-neon/10 px-5 py-2.5 font-ocr text-sm text-neon uppercase tracking-[0.12em] hover:bg-neon/20 transition-colors'
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className='inline-flex items-center border border-neon/30 px-5 py-2.5 font-ocr text-sm text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
