import Link from 'next/link';
import BriefHero from '@/components/brief/BriefHero';
import BriefProofStrip from '@/components/brief/BriefProofStrip';
import BriefProjectList from '@/components/brief/BriefProjectList';
import SiteScrollPageBackground from '@/components/layout/SiteScrollPageBackground';
import { briefData } from '@/lib/briefData';

export const metadata = {
  title: 'Brief | Stephen Weaver',
  description:
    'One-page operator brief for Stephen Weaver: systems builder, full-stack developer, automation and AI integration. Faster to scan than the homepage.',
  alternates: {
    canonical: 'https://stepweaver.dev/brief',
  },
  openGraph: {
    title: 'Brief | Stephen Weaver',
    description:
      'One-page operator brief: who Stephen is, what he builds, and where to go next.',
    url: 'https://stepweaver.dev/brief',
    type: 'website',
  },
};

export default function BriefPage() {
  return (
    <SiteScrollPageBackground>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Identity block */}
        <BriefHero identity={briefData.identity} />

        {/* Role fit */}
        <section className='py-6 border-b border-neon/10'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            {briefData.roleFit.title}
          </p>
          <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {briefData.roleFit.items.map((item, i) => (
              <li
                key={i}
                className='flex items-start gap-2 font-ibm text-sm text-text-secondary leading-relaxed'
              >
                <span className='text-neon/50 shrink-0 mt-0.5 font-ocr text-xs'>·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Proof strip */}
        <BriefProofStrip projects={briefData.flagshipProjects} />

        {/* Project list */}
        <BriefProjectList projects={briefData.flagshipProjects} />

        {/* Stack snapshot */}
        <section className='py-6 border-t border-neon/10'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
            {briefData.stackSnapshot.title}
          </p>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {briefData.stackSnapshot.categories.map((cat) => (
              <div key={cat.label}>
                <p className='font-ocr text-[10px] uppercase tracking-[0.18em] text-neon/50 mb-2'>
                  {cat.label}
                </p>
                <ul className='space-y-1'>
                  {cat.items.map((item) => (
                    <li key={item} className='font-ibm text-xs text-text-secondary'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className='py-6 border-t border-neon/10'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
            Next step
          </p>
          <div className='flex flex-wrap gap-3'>
            {briefData.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                target={cta.external ? '_blank' : undefined}
                rel={cta.external ? 'noopener noreferrer' : undefined}
                className={
                  cta.variant === 'primary'
                    ? 'inline-flex items-center border border-neon bg-neon/10 px-5 py-2.5 font-ocr text-sm text-neon uppercase tracking-[0.12em] hover:bg-neon/20 transition-colors'
                    : 'inline-flex items-center border border-neon/30 px-5 py-2.5 font-ocr text-sm text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SiteScrollPageBackground>
  );
}
