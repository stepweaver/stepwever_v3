'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import { SERVICES_DATA } from '@/lib/servicesData';
import GlitchButton from '@/components/ui/GlitchButton';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ExamplePage({ params }) {
  const { slug } = use(params);

  // Find the service by slug/id
  const service = SERVICES_DATA.quickPickSolutions.find(
    (item) => item.id === slug
  );

  if (!service || !service.exampleProject) {
    notFound();
  }

  const { exampleProject } = service;

  return (
    <>
      <div className='relative'>
        <BackgroundCanvas />

        <main className='relative z-30 min-h-screen pt-20 pb-12'>
          <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
            {/* Back Navigation */}
            <div className='mb-8'>
              <Link
                href='/services'
                className='inline-flex items-center text-terminal-cyan font-ocr text-sm hover:text-terminal-green transition-colors duration-200'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Services
              </Link>
            </div>

            {/* Header */}
            <header className='mb-12 md:mb-16'>
              <div className='mb-6'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight font-ibm text-terminal-green'>
                  {service.title}
                </h1>
                <div className='flex items-center gap-4 mb-4'>
                  <span className='text-2xl font-ibm font-bold text-terminal-yellow'>
                    ${service.price}
                  </span>
                  <span className='font-ocr text-terminal-muted'>
                    • {service.delivery}
                  </span>
                </div>
              </div>

              <p className='text-lg md:text-xl font-ocr text-terminal-text max-w-4xl leading-relaxed mb-8'>
                {service.description}
              </p>

              <div className='bg-terminal-light/20 p-6 rounded-xl border border-terminal-border'>
                <p className='font-ocr text-terminal-green font-bold text-lg mb-2'>
                  What you get:
                </p>
                <p className='font-ocr text-terminal-text'>{service.benefit}</p>
              </div>
            </header>

            {/* Example Project Showcase */}
            <section className='mb-16'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-terminal-green mb-6'>
                Example Project
              </h2>
              <div className='h-0.5 bg-terminal-green mb-8'></div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12'>
                {/* Project Details */}
                <div>
                  <h3 className='text-xl md:text-2xl font-ibm text-terminal-green mb-4'>
                    {exampleProject.title}
                  </h3>
                  <p className='font-ocr text-terminal-text text-base md:text-lg leading-relaxed mb-6'>
                    {exampleProject.description}
                  </p>

                  <h4 className='text-lg font-ibm text-terminal-green mb-4'>
                    Key Features:
                  </h4>
                  <ul className='space-y-3 mb-8'>
                    {exampleProject.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <CheckCircle className='w-5 h-5 text-terminal-green shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-terminal-text text-base leading-relaxed'>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Placeholder for Demo/Screenshot */}
                <div>
                  <div className='bg-terminal-light/20 border border-terminal-border rounded-xl p-8 h-64 md:h-80 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='w-16 h-16 bg-terminal-green/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <ExternalLink className='w-8 h-8 text-terminal-green' />
                      </div>
                      <p className='font-ocr text-terminal-muted text-sm'>
                        {exampleProject.placeholder
                          ? 'Demo coming soon'
                          : 'Interactive demo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Possibilities Section */}
            <section className='mb-16'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-terminal-green mb-6'>
                What's Possible for Your Business
              </h2>
              <div className='h-0.5 bg-terminal-green mb-8'></div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {getPossibilitiesForService(service.id).map(
                  (possibility, index) => (
                    <div
                      key={index}
                      className='p-6 bg-terminal-light/20 border border-terminal-border rounded-xl'
                    >
                      <h4 className='font-ibm text-terminal-green text-lg mb-3'>
                        {possibility.industry}
                      </h4>
                      <p className='font-ocr text-terminal-text text-sm leading-relaxed mb-3'>
                        {possibility.useCase}
                      </p>
                      <p className='font-ocr text-terminal-cyan text-xs'>
                        {possibility.outcome}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* CTA Section */}
            <section className='text-center bg-terminal-light/10 p-8 md:p-12 rounded-xl'>
              <h2 className='text-2xl md:text-3xl font-ibm text-terminal-green mb-4'>
                Ready to get started?
              </h2>
              <p className='font-ocr text-terminal-text text-base md:text-lg mb-8 max-w-2xl mx-auto'>
                Let's build something similar for your business. This solution
                starts at ${service.price}
                and can be delivered in {service.delivery.toLowerCase()}.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <GlitchButton
                  onClick={() => {
                    window.open(
                      SERVICES_DATA.contact.calendlyUrl,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                  className='px-8 py-3 text-lg'
                >
                  Schedule a Call
                </GlitchButton>

                <Link href='/contact'>
                  <button className='text-terminal-cyan font-ocr hover:text-terminal-green transition-colors duration-200 underline hover:no-underline'>
                    Or send a message →
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

// Helper function to generate possibilities based on service type
function getPossibilitiesForService(serviceId) {
  const possibilities = {
    'contact-site': [
      {
        industry: 'Local Services',
        useCase: 'Plumber gets 40% more calls with mobile-first contact page',
        outcome: 'More leads, better conversion',
      },
      {
        industry: 'Professional Services',
        useCase: 'Law firm showcases expertise with clean, credible design',
        outcome: 'Higher-value client inquiries',
      },
      {
        industry: 'Retail',
        useCase: 'Boutique drives foot traffic with location-focused landing',
        outcome: 'Increased store visits',
      },
    ],
    'simple-automation': [
      {
        industry: 'Real Estate',
        useCase: 'Leads from website automatically enter CRM and get follow-up',
        outcome: 'No more missed opportunities',
      },
      {
        industry: 'Healthcare',
        useCase: 'Patient forms auto-populate scheduling system',
        outcome: 'Reduced admin work',
      },
      {
        industry: 'E-commerce',
        useCase: 'Orders trigger inventory updates and shipping notifications',
        outcome: 'Streamlined fulfillment',
      },
    ],
    'sheets-dashboard': [
      {
        industry: 'Multi-location Retail',
        useCase: 'Real-time sales comparison across all store locations',
        outcome: 'Data-driven decisions',
      },
      {
        industry: 'Service Business',
        useCase: 'Track technician performance and customer satisfaction',
        outcome: 'Improved operations',
      },
      {
        industry: 'Manufacturing',
        useCase: 'Production metrics and quality control in one view',
        outcome: 'Better oversight',
      },
    ],
    'receipt-capture': [
      {
        industry: 'Construction',
        useCase: 'Field workers snap receipts, auto-categorize for tax time',
        outcome: 'Simplified bookkeeping',
      },
      {
        industry: 'Consulting',
        useCase: 'Travel expenses automatically logged and categorized',
        outcome: 'Accurate client billing',
      },
      {
        industry: 'Small Business',
        useCase: 'All business expenses tracked without manual data entry',
        outcome: 'Tax-ready records',
      },
    ],
    'follow-up-flow': [
      {
        industry: 'Healthcare',
        useCase: 'Automated appointment reminders reduce no-shows by 60%',
        outcome: 'Better scheduling efficiency',
      },
      {
        industry: 'Professional Services',
        useCase:
          'Client onboarding sequence ensures nothing falls through cracks',
        outcome: 'Smoother client experience',
      },
      {
        industry: 'E-commerce',
        useCase:
          'Post-purchase follow-up increases review rates and repeat sales',
        outcome: 'Higher customer lifetime value',
      },
    ],
    'data-integration': [
      {
        industry: 'E-commerce',
        useCase: 'Shopify orders automatically create QuickBooks invoices',
        outcome: 'Synchronized financials',
      },
      {
        industry: 'Service Business',
        useCase: 'CRM deals trigger project management setup',
        outcome: 'Seamless workflow',
      },
      {
        industry: 'Retail',
        useCase: 'POS sales update inventory across all platforms',
        outcome: 'Accurate stock levels',
      },
    ],
  };

  return possibilities[serviceId] || [];
}
