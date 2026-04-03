import Link from 'next/link';

export default function ServicesCTA({ title, body, primaryCta }) {
  return (
    <section className='relative z-30 pb-16 sm:pb-20' aria-labelledby='services-cta-heading'>
      <div className='border-t border-neon/15 pt-10 sm:pt-12'>
        <h2 id='services-cta-heading' className='font-ibm text-xl sm:text-2xl text-neon mb-3 max-w-xl'>
          {title}
        </h2>
        {body && (
          <p className='font-ibm text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mb-8'>
            {body}
          </p>
        )}
        {primaryCta && (
          <Link
            href={primaryCta.href}
            className='inline-flex items-center border border-neon bg-neon/10 px-5 py-2.5 font-ocr text-sm text-neon uppercase tracking-[0.12em] hover:bg-neon/20 transition-colors'
          >
            {primaryCta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
