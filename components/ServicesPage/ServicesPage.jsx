'use client';

import { memo, useState } from 'react';
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
import CalendlyModal from '@/components/ui/CalendlyModal';
import SERVICES_DATA from '@/lib/servicesData';

function ServicesPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

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
          {/* Hero Headline - Similar to main hero */}
          <header className='mb-6 sm:mb-10'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-4 sm:mb-6 leading-tight text-right font-ibm w-full min-h-[6rem] sm:min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem] xl:min-h-[16rem] 2xl:min-h-[18rem] flex flex-col sm:flex-row items-end justify-end relative overflow-hidden'>
              <div className='relative max-w-[99vw] sm:max-w-[98vw] md:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] break-words'>
                <div className='text-terminal-green font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
                  {SERVICES_DATA.hero.headline.split(' ')[0]}{' '}
                  {SERVICES_DATA.hero.headline.split(' ')[1]}.
                </div>
                <div className='text-terminal-cyan font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
                  Fast delivery.
                </div>
                <div className='text-terminal-magenta font-bold whitespace-nowrap'>
                  Fair pricing.
                </div>
              </div>
            </h1>
          </header>

          {/* Hero Description - Similar to main hero */}
          <div className='mb-6 sm:mb-10 max-w-6xl ml-auto'>
            <p className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-terminal-text leading-tight font-ocr mb-6'>
              {SERVICES_DATA.hero.subheadline}
            </p>
          </div>

          {/* CTAs - Similar to main hero but with services buttons */}
          <div className='mb-6 sm:mb-10 max-w-6xl ml-auto'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <GlitchButton
                onClick={() => scrollToSection('solutions')}
                className='w-full sm:w-auto px-8 py-4 text-lg lg:text-xl'
              >
                {SERVICES_DATA.hero.ctaPrimary}
              </GlitchButton>

              <button
                onClick={() => scrollToSection('contact')}
                className='w-full sm:w-auto px-8 py-4 text-lg lg:text-xl font-ocr text-terminal-cyan border border-terminal-cyan/50 hover:bg-terminal-cyan/10 hover:border-terminal-cyan transition-all duration-200'
              >
                GET QUOTE
              </button>
            </div>
          </div>

          {/* Service Overview Cards - Right aligned like main hero */}
          <div className='max-w-6xl ml-auto'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-yellow font-bold mb-6'>
              WHAT I OFFER
            </h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
              <div className='p-4 md:p-6 bg-terminal-light/10 border border-terminal-green/30 hover:border-terminal-green/50 transition-colors duration-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <Zap className='w-6 h-6 text-terminal-green' />
                  <h3 className='font-ibm font-bold text-terminal-green text-sm'>
                    QUICK SOLUTIONS
                  </h3>
                </div>
                <p className='font-ocr text-terminal-text text-xs'>
                  Fixed-price packages from $500
                </p>
              </div>

              <div className='p-4 md:p-6 bg-terminal-light/10 border border-terminal-yellow/30 hover:border-terminal-yellow/50 transition-colors duration-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <Code className='w-6 h-6 text-terminal-yellow' />
                  <h3 className='font-ibm font-bold text-terminal-yellow text-sm'>
                    CUSTOM DEV
                  </h3>
                </div>
                <p className='font-ocr text-terminal-text text-xs'>
                  Tailored solutions & retainers
                </p>
              </div>

              <div className='p-4 md:p-6 bg-terminal-light/10 border border-terminal-magenta/30 hover:border-terminal-magenta/50 transition-colors duration-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <BarChart3 className='w-6 h-6 text-terminal-magenta' />
                  <h3 className='font-ibm font-bold text-terminal-magenta text-sm'>
                    ANALYTICS
                  </h3>
                </div>
                <p className='font-ocr text-terminal-text text-xs'>
                  Data insights & automation
                </p>
              </div>

              <div className='p-4 md:p-6 bg-terminal-light/10 border border-terminal-cyan/30 hover:border-terminal-cyan/50 transition-colors duration-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <Target className='w-6 h-6 text-terminal-cyan' />
                  <h3 className='font-ibm font-bold text-terminal-cyan text-sm'>
                    CONSULTING
                  </h3>
                </div>
                <p className='font-ocr text-terminal-text text-xs'>
                  Strategy & technical guidance
                </p>
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

                  {/* Learn More Link */}
                  <button
                    onClick={() => {
                      window.location.href = `/examples/${item.id}`;
                    }}
                    className='w-full text-left text-terminal-cyan font-ocr text-sm hover:text-terminal-green transition-colors duration-200 underline hover:no-underline cursor-pointer'
                  >
                    Learn more & see examples →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom & Retainer Work */}
      <section id='custom-work' className='relative z-30 py-20'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          {/* Section Header */}
          <header className='mb-12 md:mb-16'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
              {SERVICES_DATA.customWork.title}
            </h2>
            <p className='text-lg md:text-xl font-ocr text-terminal-text max-w-4xl leading-relaxed'>
              {SERVICES_DATA.customWork.description}
            </p>
          </header>

          {/* Benefits Section */}
          <div className='mb-16 md:mb-20'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-green mb-4 md:mb-6'>
              Why go custom?
            </h3>
            <div className='h-0.5 bg-terminal-green mb-6 md:mb-8'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
              {SERVICES_DATA.customWork.benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className='flex items-start'>
                  <span className='text-terminal-green font-bold mr-3 mt-1 font-ocr'>
                    &gt;
                  </span>
                  <p className='font-ocr text-terminal-text text-base md:text-lg leading-relaxed'>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Retainer Tiers */}
          <div className='mb-12'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-green mb-4 md:mb-6'>
              Monthly retainer tiers
            </h3>
            <div className='h-0.5 bg-terminal-green mb-6 md:mb-8'></div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16'>
              {SERVICES_DATA.retainers.map((retainer, index) => (
                <article key={`retainer-${index}`}>
                  <h4 className='text-lg md:text-xl lg:text-2xl font-ibm text-terminal-green mb-3 md:mb-4'>
                    {retainer.title}
                  </h4>
                  <div className='h-0.5 bg-terminal-green/50 mb-4 md:mb-6'></div>
                  <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed mb-4 md:mb-6'>
                    {retainer.description}
                  </p>
                  <ul className='space-y-3 md:space-y-4 text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
                    {retainer.features.map((feature, featureIndex) => (
                      <li
                        key={`retainer-${index}-feature-${featureIndex}`}
                        className='flex items-start'
                      >
                        <span className='text-terminal-green font-bold mr-3 mt-1'>
                          &gt;
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='mt-6 pt-4 border-t border-terminal-border/30'>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className='text-terminal-yellow font-ocr text-sm hover:text-terminal-green transition-colors duration-200 cursor-pointer underline hover:no-underline'
                    >
                      Contact for custom pricing
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className='pt-8 border-t border-terminal-border/20'>
            <p className='text-terminal-yellow font-ocr text-sm'>
              * Custom solutions and retainer pricing are tailored to your
              specific needs and scope
            </p>
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

            <div className='flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-12'>
              <GlitchButton
                onClick={() => setIsCalendlyOpen(true)}
                className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
              >
                SCHEDULE A CALL
              </GlitchButton>

              <GlitchButton
                href='/'
                className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
              >
                BACK TO HOME
              </GlitchButton>

              <GlitchButton
                href='/contact'
                className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
              >
                CONTACT
              </GlitchButton>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        calendlyUrl={SERVICES_DATA.contact.calendlyUrl}
      />
    </>
  );
}

export default memo(ServicesPage);
