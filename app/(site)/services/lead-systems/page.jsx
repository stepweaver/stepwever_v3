import ServiceHero from '@/components/services/ServiceHero';
import ProblemGrid from '@/components/services/ProblemGrid';
import ProofRail from '@/components/services/ProofRail';
import ServiceCTA from '@/components/services/ServiceCTA';
import SiteScrollPageBackground from '@/components/layout/SiteScrollPageBackground';
import Link from 'next/link';
import { servicePages } from '@/lib/servicesData';
import { getProofForLane } from '@/lib/proofLinks';

export const metadata = {
  title: 'Lead and Research Systems | Stephen Weaver',
  description:
    'Lead capture, prospect review workflows, enrichment pipelines, and human-gated research systems. Built for operators, not for show.',
  alternates: {
    canonical: 'https://stepweaver.dev/services/lead-systems',
  },
  openGraph: {
    title: 'Lead and Research Systems | Stephen Weaver',
    description:
      'Lead capture, prospect review workflows, enrichment pipelines, and human-gated research systems.',
    url: 'https://stepweaver.dev/services/lead-systems',
    type: 'website',
  },
};

const page = servicePages['lead-systems'];
const proofItems = getProofForLane('lead-systems');

export default function LeadSystemsPage() {
  return (
    <SiteScrollPageBackground>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <nav className='pt-6 pb-2'>
          <p className='font-ocr text-xs text-text-label'>
            <Link href='/services' className='hover:text-neon transition-colors'>
              Services
            </Link>
            <span className='mx-2 text-neon/30'>›</span>
            <span className='text-text-secondary'>Lead Systems</span>
          </p>
        </nav>

        <ServiceHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          body={page.hero.body}
          primaryCta={{ label: 'Send me the problem', href: '/contact?intent=brief' }}
          secondaryCta={{ label: 'Back to Services', href: '/services' }}
        />

        <ProblemGrid problems={page.pains} title='Business pains this addresses' />

        {/* Capabilities */}
        <section className='relative z-30 py-8'>
          <header className='mb-6'>
            <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
              Scope
            </p>
            <h2 className='font-ibm text-xl sm:text-2xl text-text'>What this system can do</h2>
          </header>
          <div className='border border-neon/15 bg-panel/20 p-5'>
            <ul className='space-y-2.5'>
              {page.capabilities.map((cap, i) => (
                <li key={i} className='flex items-start gap-3 font-ibm text-sm text-text-secondary leading-relaxed'>
                  <span className='font-ocr text-xs text-neon/50 shrink-0 mt-0.5'>·</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Limits */}
        <section className='relative z-30 py-4'>
          <header className='mb-4'>
            <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-1'>
              Boundaries
            </p>
            <h2 className='font-ibm text-xl sm:text-2xl text-text'>What it does not do</h2>
          </header>
          <div className='border border-neon/10 bg-terminal-dark/10 p-5'>
            <ul className='space-y-2'>
              {page.limits.map((limit, i) => (
                <li key={i} className='flex items-start gap-3 font-ibm text-sm text-text-secondary/60 leading-relaxed'>
                  <span className='font-ocr text-xs text-text-secondary/40 shrink-0 mt-0.5'>·</span>
                  {limit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProofRail items={proofItems} title='Project proof' />

        <ServiceCTA
          title={page.cta.title}
          body={page.cta.body}
          primaryCta={{ label: 'Send me the problem', href: '/contact?intent=brief' }}
          secondaryCta={{ label: 'Book a quick intro', href: '/contact?intent=intro' }}
        />
      </div>
    </SiteScrollPageBackground>
  );
}
