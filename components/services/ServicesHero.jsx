import Link from 'next/link';

export default function ServicesHero({ eyebrow, title, body, primaryCta, secondaryCta }) {
  return (
    <section className='relative z-30 pt-6 pb-12 sm:pt-8 sm:pb-16'>
      {eyebrow && (
        <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-5'>
          {eyebrow}
        </p>
      )}

      <h1 className='font-ibm text-2xl sm:text-3xl md:text-[2rem] text-neon leading-tight max-w-3xl mb-5'>
        {title}
      </h1>

      {body && (
        <p className='font-ibm text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mb-10'>
          {body}
        </p>
      )}

      {(primaryCta || secondaryCta) && (
        <div className='flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center'>
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className='inline-flex justify-center items-center border border-neon bg-neon/10 px-5 py-2.5 font-ocr text-sm text-neon uppercase tracking-[0.12em] hover:bg-neon/20 transition-colors'
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className='inline-flex justify-center items-center border border-neon/30 px-5 py-2.5 font-ocr text-sm text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      )}

      <div className='mt-12 h-px w-full max-w-xl bg-gradient-to-r from-neon/35 via-neon/10 to-transparent' />
    </section>
  );
}
