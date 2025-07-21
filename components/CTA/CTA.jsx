'use client';

import GlitchButton from '../ui/GlitchButton';

export default function CTA() {
  return (
    <section className='relative pt-8 pb-16 px-8 md:px-16 lg:px-24 z-10'>
      <div className='max-w-7xl mx-auto w-full'>
        {/* Two Column Layout */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-start'>
          {/* Left Column - Main Headline */}
          <div className='lg:w-1/2'>
            <div className='space-y-0'>
              <h3 className='text-7xl md:text-8xl lg:text-9xl font-ibm text-terminal-text leading-none'>
                READY
              </h3>
              <h3 className='text-7xl md:text-8xl lg:text-9xl font-ibm text-terminal-text leading-none'>
                TO
              </h3>
              <h3 className='text-7xl md:text-8xl lg:text-9xl font-ibm text-terminal-green leading-none'>
                MOVE?
              </h3>
            </div>
          </div>

          {/* Right Column - Body Text and Buttons */}
          <div className='lg:w-1/2 pt-4'>
            <div className='mb-12'>
              <p className='text-xl md:text-2xl text-terminal-text leading-tight'>
                You're here because you're done waiting. λstepweaver turns
                "someday" ideas into live solutions—fast. Reach out and see what
                happens when obsession meets execution.
              </p>
            </div>

            <div className='mb-8'>
              <p className='text-3xl font-ibm text-terminal-green'>
                Let's ship something real.
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
              {/* Primary Button */}
              <GlitchButton
                href='https://calendly.com/stepweaver'
                className='px-12 py-5 text-xl font-bold min-w-[200px]'
              >
                SCHEDULE A CALL
              </GlitchButton>

              {/* Secondary Button */}
              <GlitchButton
                href='/contact'
                className='px-12 py-5 text-xl font-bold min-w-[200px]'
              >
                GET IN TOUCH
              </GlitchButton>

              {/* Third Button */}
              <GlitchButton
                href='/resume'
                className='px-12 py-5 text-xl min-w-[200px]'
              >
                DOWNLOAD RESUME
              </GlitchButton>
            </div>

            {/* Optional tiny text */}
            <p className='text-sm text-terminal-dimmed leading-tight'>
              Prefer a real conversation? Email directly at{' '}
              <a
                href='mailto:inquiries@stepweaver.dev'
                className='text-terminal-green hover:text-terminal-green/80 underline'
              >
                inquiries@stepweaver.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
