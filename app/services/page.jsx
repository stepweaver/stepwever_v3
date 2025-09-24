import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ServicesPage from '@/components/ServicesPage/ServicesPage';
import generateStructuredData from '../structured-data';
import SERVICES_DATA from '@/lib/servicesData';

// Custom metadata for services page - optimized for social media lead generation
export const metadata = {
  title: 'Business Automation & Development Services',
  description:
    'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
  keywords: [
    'business automation services',
    'web development pricing',
    'fixed price automation',
    'small business tech solutions',
    'workflow automation',
    'data pipeline development',
    'custom software development',
    'process automation consultant',
    'business intelligence services',
    'startup technology solutions',
    'n8n automation',
    'zapier alternative',
    'google sheets dashboard',
    'receipt capture automation',
    'email automation services',
  ],
  openGraph: {
    title: 'Business Automation & Development Services | Fixed Pricing',
    description:
      'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
    url: 'https://stepweaver.dev/services',
    type: 'website',
    images: [
      {
        url: '/images/lambda_preview.png', // Consider creating services-specific image
        width: 1200,
        height: 630,
        alt: 'λstepweaver Services - Business Automation & Development Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Automation & Development Services | Fixed Pricing',
    description:
      'Transform your business with practical automation and development solutions. Fixed prices starting at $275. Fast delivery. No surprises.',
    images: [
      {
        url: '/images/lambda_preview.png', // Consider creating services-specific image
        width: 1200,
        height: 630,
        alt: 'λstepweaver Services - Business Automation & Development Solutions',
      },
    ],
  },
  alternates: {
    canonical: 'https://stepweaver.dev/services',
  },
};

export default function Services() {
  const structuredData = generateStructuredData();

  // Enhanced service-specific structured data
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Automation & Development Services',
    description:
      'Fixed-price business automation, web development, and data solutions for small to medium businesses.',
    provider: {
      '@type': 'Organization',
      name: 'λstepweaver',
      url: 'https://stepweaver.dev',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Quick-Pick Solutions',
      itemListElement: SERVICES_DATA.quickPickSolutions.map(
        (service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
          },
          price: service.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          deliveryLeadTime: service.delivery,
        })
      ),
    },
    serviceType: [
      'Business Automation',
      'Web Development',
      'Data Pipeline Development',
      'Process Optimization',
      'Workflow Automation',
      'Custom Software Development',
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
