'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />

      {/* Main Content */}
      <div className='relative z-10 pt-20 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-12'>
            <p className='text-3xl md:text-4xl lg:text-5xl font-ibm font-bold text-terminal-green max-w-4xl mx-auto'>
              I'm not here to play at this. I'm here to build.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
