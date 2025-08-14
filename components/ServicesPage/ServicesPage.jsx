'use client';

import { memo } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Code,
  Target,
  BarChart3,
  Mail,
  Calendar,
  Globe,
  Camera,
  Link,
  Clock,
  DollarSign,
} from 'lucide-react';
import GlitchButton from '@/components/ui/GlitchButton';
import SERVICES_DATA from '@/lib/servicesData';

function ServicesPage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuIcons = {
    globe: <Globe className='w-8 h-8' />,
    zap: <Zap className='w-8 h-8' />,
    'bar-chart': <BarChart3 className='w-8 h-8' />,
    camera: <Camera className='w-8 h-8' />,
    mail: <Mail className='w-8 h-8' />,
    link: <Link className='w-8 h-8' />,
  };

  const serviceIcons = {
    automation: <Zap className='w-8 h-8' />,
    development: <Code className='w-8 h-8' />,
    analysis: <Target className='w-8 h-8' />,
    analytics: <BarChart3 className='w-8 h-8' />,
  };

  return (
    <>
      {/* Hero Section */}
      <section className='relative z-30 pt-0 pb-4 sm:pb-8 md:pb-12'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-5xl mx-auto text-center space-y-8'>
              <div>
                <h1 className='text-4xl md:text-7xl font-ibm font-bold text-terminal-green mb-6 leading-tight'>
                  {SERVICES_DATA.hero.headline}
                </h1>

                <p className='text-lg md:text-xl font-ocr text-terminal-text mb-8 max-w-3xl mx-auto'>
                  {SERVICES_DATA.hero.subheadline}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <GlitchButton
                  onClick={() => scrollToSection('solutions')}
                  className='w-full sm:w-auto px-8 py-3 text-lg'
                >
                  {SERVICES_DATA.hero.ctaPrimary}
                </GlitchButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Pick Solutions */}
      <section id='solutions' className='relative z-30 py-20'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          <header className='mb-12 md:mb-16 text-center'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
              QUICK-PICK SOLUTIONS
            </h2>
            <p className='text-lg md:text-xl font-ocr text-terminal-yellow max-w-3xl mx-auto mb-4'>
              Build your stack - start small, add as you grow
            </p>
            <p className='text-base md:text-lg font-ocr text-terminal-text max-w-xl mx-auto'>
              Fixed prices and fast delivery. Choose what you need, when you
              need it.
            </p>
          </header>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16'>
            {SERVICES_DATA.quickPickSolutions.map((item) => (
              <article
                key={item.id}
                className='group p-6 rounded-2xl bg-terminal-light/30 border border-terminal-border hover:bg-terminal-light/40 transition-all duration-200 hover:border-terminal-green/50'
              >
                <div className='space-y-4'>
                  {/* Icon & Title */}
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 text-terminal-green group-hover:scale-110 transition-transform duration-200'>
                      {menuIcons[item.icon]}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-ibm font-bold text-terminal-green text-lg mb-1 leading-tight'>
                        {item.title}
                      </h3>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='text-2xl font-ibm font-bold text-terminal-yellow'>
                          ${item.price}
                        </span>
                        <span className='font-ocr text-terminal-muted text-sm'>
                          • {item.delivery}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className='font-ocr text-terminal-text text-sm leading-relaxed'>
                    {item.description}
                  </p>

                  {/* Benefit */}
                  <p className='font-ocr text-terminal-green text-sm font-bold leading-relaxed'>
                    {item.benefit}
                  </p>

                  {/* CTA Button */}
                  <GlitchButton
                    onClick={() => scrollToSection('contact')}
                    variant='outline'
                    size='sm'
                    className='w-full'
                  >
                    Add to Project
                  </GlitchButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom & Retainer Work */}
      <section
        id='custom-work'
        className='relative z-30 py-20 bg-terminal-light/10'
      >
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          <header className='mb-12 md:mb-16 text-center'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
              {SERVICES_DATA.customWork.title}
            </h2>
            <p className='text-lg md:text-xl font-ocr text-terminal-text max-w-4xl mx-auto mb-8'>
              {SERVICES_DATA.customWork.description}
            </p>
          </header>

          <div className='max-w-6xl mx-auto'>
            {/* Benefits Section - Full Width */}
            <div className='mb-16'>
              <h3 className='text-2xl md:text-3xl font-ibm text-terminal-green mb-6 text-center'>
                Why go custom:
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {SERVICES_DATA.customWork.benefits.map((benefit, index) => (
                  <div
                    key={`benefit-${index}`}
                    className='p-6 rounded-xl bg-terminal-light/20 border border-terminal-border hover:bg-terminal-light/30 transition-all duration-200 text-center'
                  >
                    <div className='w-12 h-12 rounded-full bg-terminal-green/20 border-2 border-terminal-green flex items-center justify-center mx-auto mb-4'>
                      <span className='font-ibm font-bold text-terminal-green text-lg'>
                        {index + 1}
                      </span>
                    </div>
                    <p className='font-ocr text-terminal-text text-sm leading-relaxed'>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-8 text-center'>
                <p className='text-terminal-yellow font-ocr text-sm bg-terminal-light/20 px-4 py-2 rounded-lg inline-block'>
                  * Custom solutions and retainer pricing are tailored to your specific needs and scope
                </p>
              </div>
            </div>

            {/* Retainer Tiers - Enhanced Layout */}
            <div>
              <h3 className='text-2xl md:text-3xl font-ibm text-terminal-green mb-8 text-center'>
                Monthly retainer tiers:
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {SERVICES_DATA.retainers.map((retainer, index) => (
                  <div
                    key={`retainer-${index}`}
                    className='p-6 rounded-xl bg-terminal-light/20 border border-terminal-border hover:bg-terminal-light/30 transition-all duration-200 hover:border-terminal-green/50 group'
                  >
                    <div className='text-center mb-6'>
                      <div className='w-16 h-16 rounded-full bg-terminal-green/20 border-2 border-terminal-green flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200'>
                        <span className='font-ibm font-bold text-terminal-green text-2xl'>
                          {index === 0 ? 'S' : index === 1 ? 'G' : 'O'}
                        </span>
                      </div>
                      <h4 className='font-ibm font-bold text-terminal-green text-xl mb-2'>
                        {retainer.title}
                      </h4>
                      <p className='font-ocr text-terminal-muted text-sm leading-relaxed'>
                        {retainer.description}
                      </p>
                    </div>
                    
                    <ul className='space-y-3'>
                      {retainer.features.map((feature, featureIndex) => (
                        <li
                          key={`retainer-${index}-feature-${featureIndex}`}
                          className='flex items-start text-terminal-text font-ocr text-sm'
                        >
                          <CheckCircle className='w-4 h-4 text-terminal-green shrink-0 mt-1 mr-3' />
                          <span className='leading-relaxed'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className='mt-6 pt-4 border-t border-terminal-border/30'>
                      <p className='text-terminal-yellow font-ocr text-xs text-center'>
                        Contact for custom pricing
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {Object.entries(SERVICES_DATA.services).map(([key, service], index) => (
        <section
          key={key}
          id={key}
          className={`relative z-30 py-20 ${
            index % 2 === 1 ? 'bg-terminal-light/10' : ''
          }`}
        >
          <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
            <header className='mb-12 md:mb-16'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
                {service.title}
              </h2>
              <div className='h-0.5 bg-terminal-green mb-6 md:mb-8 max-w-24'></div>
              <p className='text-terminal-text font-ocr text-lg md:text-xl leading-relaxed max-w-4xl'>
                {service.description}
              </p>
            </header>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12'>
              {/* What's Included */}
              <article>
                <h3 className='text-xl md:text-2xl font-ibm text-terminal-green mb-4 md:mb-6'>
                  What's included:
                </h3>
                <ul className='space-y-3 md:space-y-4 text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
                  {service.included.map((item, itemIndex) => (
                    <li
                      key={`${key}-included-${itemIndex}`}
                      className='flex items-start'
                    >
                      <span className='text-terminal-green font-bold mr-3 mt-1'>
                        &gt;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Example Outcomes */}
              <article>
                <h3 className='text-xl md:text-2xl font-ibm text-terminal-green mb-4 md:mb-6'>
                  Example outcomes:
                </h3>
                <ul className='space-y-3 md:space-y-4 text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
                  {service.outcomes.map((outcome, outcomeIndex) => (
                    <li
                      key={`${key}-outcome-${outcomeIndex}`}
                      className='flex items-start'
                    >
                      <CheckCircle className='w-5 h-5 text-terminal-green shrink-0 mt-1 mr-3' />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      ))}

      {/* How I Work Section */}
      <section id='process' className='relative z-30 py-20'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          <header className='mb-12 md:mb-16'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
              HOW I WORK
            </h2>
          </header>

          <div className='space-y-12 md:space-y-16'>
            {SERVICES_DATA.process.map((step, index) => (
              <article key={`process-step-${step.step}`} className='relative'>
                <div className='flex items-start gap-6 mb-6'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 rounded-full bg-terminal-green/20 border-2 border-terminal-green flex items-center justify-center'>
                      <span className='font-ibm font-bold text-terminal-green text-lg'>
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-2xl md:text-3xl font-ibm text-terminal-green mb-2'>
                      {step.title}
                    </h3>
                    <p className='text-lg md:text-xl font-ibm text-terminal-yellow mb-4'>
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className='ml-18 pl-6'>
                  <ul className='space-y-3 text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={`process-${step.step}-detail-${detailIndex}`}
                        className='flex items-start'
                      >
                        <span className='text-terminal-green font-bold mr-3 mt-1'>
                          &gt;
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {index < SERVICES_DATA.process.length - 1 && (
                  <div className='absolute left-6 top-16 w-0.5 h-12 bg-terminal-green/30'></div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id='contact' className='relative z-30 py-20'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <div>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-ibm font-bold text-terminal-green mb-6 leading-tight'>
                {SERVICES_DATA.cta.headline}
              </h2>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
              <GlitchButton
                onClick={() =>
                  window.open(
                    SERVICES_DATA.contact.calendlyUrl,
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                className='w-full sm:w-auto px-8 py-3 text-lg'
              >
                {SERVICES_DATA.cta.ctaText}
              </GlitchButton>
              <a
                href={`mailto:${SERVICES_DATA.contact.email}?subject=Project%20Inquiry`}
                className='inline-flex items-center gap-2 text-terminal-yellow hover:text-terminal-green transition-colors font-ocr text-lg'
              ></a>
            </div>

            <div className='p-6 rounded-2xl bg-terminal-light/30 border border-terminal-border'>
              <p className='font-ibm text-terminal-cyan text-xl lg:text-2xl'>
                {SERVICES_DATA.cta.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ServicesPage);
