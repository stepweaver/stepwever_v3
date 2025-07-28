'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />

      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex flex-col justify-center'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <div className='mb-8'>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-ibm font-bold text-terminal-green mb-6 leading-tight'>
                Let's Build!
              </h1>
              <p className='text-2xl md:text-3xl lg:text-4xl font-ibm text-terminal-text/90 max-w-4xl mx-auto leading-relaxed'>
                I'm not here to play at this. I'm here to build. Let's ship something real.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className='max-w-4xl mx-auto'>
            <ContactForm />
          </div>

          {/* Bottom CTA */}
          <div className='text-center mt-16 pt-8 border-t border-terminal-border/30'>
            <p className='text-terminal-text/60 font-ocr text-sm'>
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
