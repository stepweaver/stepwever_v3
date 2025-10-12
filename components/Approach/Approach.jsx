'use client';

import { memo } from 'react';

const STEPS = [
  { title: 'We figure out what you need.', desc: 'Clear goals, no confusion.' },
  {
    title: 'We make a simple plan.',
    desc: 'Easy steps with regular check-ins.',
  },
  {
    title: 'We build and show you progress.',
    desc: "You see exactly what I'm working on.",
  },
  {
    title: 'We adjust based on your feedback.',
    desc: 'Your input shapes the final result.',
  },
  {
    title: 'We finish and make sure it works.',
    desc: 'Working solution, guaranteed.',
  },
];

function Approach() {
  return (
    <section
      id='approach'
      className='scroll-mt-24 bg-terminal-bg text-terminal-text py-20 lg:py-24 relative z-30'
    >
      <div className='px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6'>
        {/* Header ----------------------------------------------------------- */}
        <header className='mb-16 ml-auto w-full max-w-6xl'>
          <h2 className='font-ibm text-terminal-green text-[clamp(2rem,4.5vw,3.5rem)] leading-tight'>
            APPROACH
          </h2>
        </header>

        {/* Content --------------------------------------------------------- */}
        <div className='ml-auto w-full max-w-6xl space-y-16'>
          {/* Intro section */}
          <div>
            <h3 className='font-ibm text-xl lg:text-2xl mb-6 leading-relaxed'>
              You work directly with me. You see progress as it happens, and you
              help guide the project from start to finish.
            </h3>
            <p className='font-ibm text-base lg:text-lg leading-relaxed text-terminal-text/90'>
              No middlemen. No surprises. Just clear communication and working
              solutions.
            </p>
          </div>

          {/* Steps section */}
          <div>
            <h4 className='font-ibm text-terminal-cyan text-xl lg:text-2xl mb-12'>
              How it works
            </h4>

            {/* Mobile: Vertical layout */}
            <div className='md:hidden space-y-10'>
              {STEPS.map(({ title, desc }, i) => (
                <div key={i} className='flex items-start'>
                  {/* Step number */}
                  <div className='flex-shrink-0 mr-6 mt-1'>
                    <span className='font-ibm text-terminal-green text-2xl font-bold'>
                      {i + 1}.
                    </span>
                  </div>

                  {/* Content */}
                  <div className='flex-1'>
                    <h5 className='font-ibm text-terminal-green text-xl mb-3 leading-tight'>
                      {title}
                    </h5>
                    <p className='font-ibm text-base leading-relaxed text-terminal-text/90'>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Vertical list with full width */}
            <div className='hidden md:block'>
              <div className='space-y-12'>
                {STEPS.map(({ title, desc }, i) => (
                  <div key={i} className='flex items-start'>
                    {/* Step number */}
                    <div className='flex-shrink-0 mr-8 mt-2'>
                      <span className='font-ibm text-terminal-green text-4xl font-bold'>
                        {i + 1}.
                      </span>
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <h5 className='font-ibm text-terminal-green text-xl lg:text-2xl mb-4 leading-tight'>
                        {title}
                      </h5>
                      <p className='font-ibm text-lg lg:text-xl leading-relaxed text-terminal-text/90'>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Approach);
