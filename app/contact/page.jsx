'use client';

import { memo } from 'react';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ContactForm from '@/components/ui/ContactForm';

// 1) Data lives outside the component
const CONTACT_DATA = {
  hero: {
    title: 'Ready to get started?',
    subtitle: "Reach out. Let's ship it.",
  },
  footer: {
    responseTime: 'Response time: Usually within 24 hours',
  },
};

function ContactPage() {
  return (
    <div className='min-h-screen relative'>
      <BackgroundCanvas />

      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex flex-col justify-center'>
        <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
          {/* Hero Section */}
          <header className='mb-8 sm:mb-12 md:mb-16'>
            <div className='text-center'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ibm font-bold text-terminal-green mb-4 sm:mb-6 leading-tight'>
                {CONTACT_DATA.hero.title}
              </h1>
              <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-ibm text-terminal-text/90 max-w-4xl mx-auto leading-relaxed'>
                {CONTACT_DATA.hero.subtitle}
              </p>
            </div>
          </header>

          {/* Form Section */}
          <div className='max-w-4xl mx-auto'>
            <ContactForm />
          </div>

          {/* Bottom CTA */}
          <footer className='text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-terminal-border/30'>
            <p className='text-terminal-text/60 font-ocr text-sm'>
              {CONTACT_DATA.footer.responseTime}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

// memo is optional but inexpensive
export default memo(ContactPage);
