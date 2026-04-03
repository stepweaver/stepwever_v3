import ServiceHero from '@/components/services/ServiceHero';
import ProblemGrid from '@/components/services/ProblemGrid';
import ServiceLaneCards from '@/components/services/ServiceLaneCards';
import ProofRail from '@/components/services/ProofRail';
import ProcessStrip from '@/components/services/ProcessStrip';
import FitCheck from '@/components/services/FitCheck';
import ServiceCTA from '@/components/services/ServiceCTA';
import SiteScrollPageBackground from '@/components/layout/SiteScrollPageBackground';
import { servicesPage } from '@/lib/servicesData';
import { getProofForLane } from '@/lib/proofLinks';

export const metadata = {
  title: 'Services | Stephen Weaver',
  description:
    'Operational web systems, automation, and AI-assisted tooling for businesses that have outgrown duct-tape workflows. Lead systems, integrations, and websites that do real work.',
  alternates: {
    canonical: 'https://stepweaver.dev/services',
  },
  openGraph: {
    title: 'Services | Stephen Weaver',
    description:
      'Operational web systems, automation, and AI-assisted tooling. Lead systems, integrations, and websites that do real work.',
    url: 'https://stepweaver.dev/services',
    type: 'website',
  },
};

const allProof = [
  ...getProofForLane('web-platforms'),
  ...getProofForLane('automation'),
  ...getProofForLane('lead-systems'),
].filter((item, idx, arr) => arr.findIndex((i) => i.slug === item.slug) === idx);

export default function ServicesPage() {
  return (
    <SiteScrollPageBackground>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ServiceHero
          eyebrow={servicesPage.hero.eyebrow}
          title={servicesPage.hero.title}
          body={servicesPage.hero.body}
          primaryCta={servicesPage.hero.primaryCta}
          secondaryCta={servicesPage.hero.secondaryCta}
        />

        <ProblemGrid problems={servicesPage.problems} />

        <ServiceLaneCards lanes={servicesPage.lanes} />

        <ProofRail items={allProof} title='Project proof' />

        <ProcessStrip steps={servicesPage.process} />

        <FitCheck good={servicesPage.fit.good} bad={servicesPage.fit.bad} />

        <ServiceCTA
          title={servicesPage.cta.title}
          body={servicesPage.cta.body}
          primaryCta={servicesPage.cta.primaryCta}
          secondaryCta={servicesPage.cta.secondaryCta}
        />
      </div>
    </SiteScrollPageBackground>
  );
}
