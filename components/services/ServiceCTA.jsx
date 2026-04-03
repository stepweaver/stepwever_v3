import Link from 'next/link';

export default function ServiceCTA({ title, body, primaryCta, secondaryCta }) {
  return (
    <section className='relative z-30 py-8'>
      <div className='relative border border-neon/20 bg-panel/25 p-6 sm:p-8'>
        <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
        <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

        <div className='relative z-10'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            Next step
          </p>
          <h2 className='font-ibm text-xl sm:text-2xl text-neon mb-3'>{title}</h2>
          <p className='font-ibm text-base text-text-secondary leading-relaxed max-w-2xl mb-6'>
            {body}
          </p>
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
        </div>
      </div>
    </section>
  );
}
