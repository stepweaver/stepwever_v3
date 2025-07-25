'use client';

import { useState, useEffect } from 'react';
import GlitchButton from '@/components/ui/GlitchButton';
import CalendlyModal from '@/components/ui/CalendlyModal';

export default function CTA() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const words = [
    { text: 'AUTOMATE?', color: 'text-terminal-green' },
    { text: 'OPTIMIZE?', color: 'text-terminal-cyan' },
    { text: 'SCALE?', color: 'text-terminal-magenta' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 150); // Half of the fade transition time
    }, 2750); // 2.75 seconds per word
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id='contact'
      className='relative pt-6 md:pt-8 pb-12 md:pb-16 px-4 md:px-8 lg:px-16 xl:px-24 z-30'
    >
      <div className='max-w-7xl mx-auto w-full'>
        {/* Two Column Layout */}
        <div className='flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start'>
          {/* Left Column - Main Headline */}
          <div className='lg:w-1/2'>
            <div className='space-y-0'>
              <h3 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-ibm text-terminal-text leading-none'>
                READY
              </h3>
              <h3 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-ibm text-terminal-text leading-none'>
                TO
              </h3>
              <div className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-ibm leading-none'>
                <span
                  className={`${
                    words[currentWordIndex].color
                  } transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {words[currentWordIndex].text}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Body Text and Buttons */}
          <div className='lg:w-1/2 pt-2 md:pt-4 mt-2 md:mt-4'>
            <div className='mb-8 md:mb-12'>
              <p className='text-base md:text-lg lg:text-xl text-terminal-text leading-tight'>
                You're here because you're done waiting. λstepweaver turns
                "someday" ideas into live solutions-fast. Reach out and see what
                happens when obsession meets execution.
              </p>
            </div>

            <div className='mb-6 md:mb-8'>
              <p className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-green'>
                Let's ship something real.
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6'>
              {/* Primary Button */}
              <GlitchButton
                onClick={() => setIsCalendlyOpen(true)}
                className='px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-bold min-w-[180px] md:min-w-[200px]'
              >
                SCHEDULE A CALL
              </GlitchButton>

              {/* Secondary Button */}
              <GlitchButton
                href='/contact'
                className='px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-bold min-w-[180px] md:min-w-[200px]'
              >
                CONTACT
              </GlitchButton>

              {/* Third Button */}
              <GlitchButton
                href='/Stephen-Weaver-Resume-stepweaver.pdf'
                download='/Stephen-Weaver-Resume-stepweaver.pdf'
                className='px-8 md:px-12 py-4 md:py-5 text-base md:text-lg lg:text-xl font-bold min-w-[180px] md:min-w-[200px]'
              >
                DOWNLOAD RESUME
              </GlitchButton>
            </div>

            {/* Optional tiny text */}
            <p className='text-xs md:text-sm text-terminal-dimmed leading-tight'>
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

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </section>
  );
}
