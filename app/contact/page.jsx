'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function ContactPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />

      {/* Main Content */}
      <div className='relative z-10 pt-20 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-ibm font-bold text-terminal-green mb-4'>
              Contact
            </h1>
            <p className='text-terminal-text/80 font-ocr text-lg max-w-2xl mx-auto'>
              This is a placeholder contact page. Content coming soon.
            </p>
          </div>

          {/* Placeholder Content */}
          <div className='bg-terminal-dark/50 backdrop-blur-sm border border-terminal-green/20 rounded-lg p-8 text-center'>
            <div className='space-y-6'>
              <h2 className='text-2xl font-ibm text-terminal-green'>
                Contact Form Coming Soon
              </h2>
              <p className='text-terminal-text/80 font-ocr'>
                We're building something awesome here. For now, you can reach
                out at:
              </p>
              <div className='text-terminal-green font-ibm text-lg'>
                inquiries@stepweaver.dev
              </div>
              <div className='pt-4'>
                <a
                  href='/'
                  className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-sm uppercase tracking-wider'
                >
                  ← Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
