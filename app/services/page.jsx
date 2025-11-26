import dynamic from 'next/dynamic';
import generateStructuredData from '../structured-data';
import SERVICES_DATA from '@/lib/servicesData';

// Lazy load heavy components
// Note: ssr: false not allowed in Server Components, but BackgroundCanvas is a client component
// so it will only render on the client anyway
const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);
const ServicesPage = dynamic(() =>
  import('@/components/ServicesPage/ServicesPage')
);

// Custom metadata for services page - optimized for local business consulting
export const metadata = {
  title: 'Stepweaver Consulting - Practical Tech for Small Businesses',
  description:
    'Web systems, automations, and data clarity for restaurants, contractors, and local businesses. No buzzwords, just results. $500-$3800.',
  keywords: [
    'small business consulting',
    'restaurant technology consultant',
    'contractor website services',
    'local business automation',
    'business dashboard development',
    'toast pos integration',
    'quickbooks automation',
    'small business web development',
    'restaurant automation systems',
    'contractor lead generation',
    'retail business technology',
    'practical tech solutions',
    'affordable business automation',
    'local business consultant',
    'business systems optimization',
  ],
  openGraph: {
    title: 'Stepweaver Consulting | Practical Systems for Small Businesses',
    description:
      'Web systems + automations + data clarity. Practical tech fixes for restaurants, contractors, and local businesses. Results, not buzzwords.',
    url: 'https://stepweaver.dev/services',
    type: 'website',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'Stepweaver Consulting - Practical Tech Solutions for Small Businesses',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stepweaver Consulting | Practical Tech for Small Businesses',
    description:
      'Web systems, automations, and dashboards for restaurants, contractors, and local businesses. Practical solutions, no buzzwords. $500-$3800.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'Stepweaver Consulting - Practical Tech Solutions for Small Businesses',
      },
    ],
  },
  alternates: {
    canonical: 'https://stepweaver.dev/services',
  },
};

// Memoize structured data at module level to avoid regenerating on every request
const baseStructuredData = generateStructuredData();

export default function Services() {
  const structuredData = baseStructuredData;

  // Enhanced service-specific structured data
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Stepweaver Consulting - Small Business Technology Solutions',
    description:
      'Practical web systems, automations, and dashboards for restaurants, contractors, and local businesses. Fixed pricing from $500-$3800.',
    provider: {
      '@type': 'Organization',
      name: 'λstepweaver',
      url: 'https://stepweaver.dev',
    },
    areaServed: 'United States',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Consulting Services',
      itemListElement: SERVICES_DATA.quickPickSolutions.map(
        (service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: service.price,
            priceCurrency: 'USD',
          },
          availability: 'https://schema.org/InStock',
          deliveryLeadTime: service.delivery,
        })
      ),
    },
    serviceType: [
      'Restaurant Technology Consulting',
      'Small Business Web Development',
      'Business Automation',
      'Dashboard Development',
      'POS Integration',
      'Business Systems Consulting',
    ],
  };

  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.localBusiness),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesStructuredData),
        }}
      />

      <div className='relative'>
        <BackgroundCanvas />
        <ServicesPage />
      </div>
    </>
  );
}
