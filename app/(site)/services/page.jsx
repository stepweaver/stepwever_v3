import ServicesHero from '@/components/services/ServicesHero';
import ProofSignalStrip from '@/components/services/ProofSignalStrip';
import ServiceLanes from '@/components/services/ServiceLanes';
import EngagementModel from '@/components/services/EngagementModel';
import SelectedProof from '@/components/services/SelectedProof';
import ServicesCTA from '@/components/services/ServicesCTA';
import SiteScrollPageBackground from '@/components/layout/SiteScrollPageBackground';
import { servicesLanding } from '@/lib/servicesLandingData';

export const metadata = {
  title: 'Services | Stephen Weaver',
  description:
    'Lead capture, local visibility, workflow handoffs, and maintainable business websites for small teams. Practical fixes and light automation: scoped build, clear handoff, optional retainer.',
  alternates: {
    canonical: 'https://stepweaver.dev/services',
  },
  openGraph: {
    title: 'Services | Stephen Weaver',
    description:
      'Practical web systems and workflow fixes for small businesses: visibility, handoffs, and sites that earn their keep.',
    url: 'https://stepweaver.dev/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  const { sectionEyebrows } = servicesLanding;

  return (
    <SiteScrollPageBackground>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ServicesHero
          eyebrow={servicesLanding.hero.eyebrow}
          title={servicesLanding.hero.title}
          body={servicesLanding.hero.body}
          primaryCta={servicesLanding.hero.primaryCta}
          secondaryCta={servicesLanding.hero.secondaryCta}
        />

        <ProofSignalStrip
          eyebrow={sectionEyebrows.proofSignals}
          title={servicesLanding.proofSignalsTitle}
          items={servicesLanding.proofSignals}
        />

        <ServiceLanes
          eyebrow={sectionEyebrows.serviceLanes}
          title={servicesLanding.serviceLanesTitle}
          lanes={servicesLanding.serviceLanes}
        />

        <EngagementModel
          eyebrow={sectionEyebrows.engagement}
          title={servicesLanding.engagementModel.title}
          steps={servicesLanding.engagementModel.steps}
        />

        <SelectedProof
          id='selected-proof'
          eyebrow={sectionEyebrows.selectedProof}
          sectionTitle={servicesLanding.selectedProof.sectionTitle}
          sectionIntro={servicesLanding.selectedProof.sectionIntro}
          featured={servicesLanding.selectedProof.featured}
          secondary={servicesLanding.selectedProof.secondary}
          portfolioLink={servicesLanding.selectedProof.portfolioLink}
        />

        <ServicesCTA
          title={servicesLanding.cta.title}
          body={servicesLanding.cta.body}
          primaryCta={servicesLanding.cta.primaryCta}
        />
      </div>
    </SiteScrollPageBackground>
  );
}
