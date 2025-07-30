'use client';

import { memo } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

const WhyWorkWithUs = memo(() => {
  const reasons = [
    {
      title: 'Direct, fast, focused.',
      description: (
        <>
          I don't waste time or pile on meetings. I get to work, build what you
          need, and show you results—quickly.
        </>
      ),
    },
    {
      title: 'No layers, no middlemen.',
      description: (
        <>
          You work with me, start to finish. If there's a problem, I fix it. If
          you need something, you ask me.
        </>
      ),
    },
    {
      title: 'Proven systems, not theory.',
      description:
        'You get real automations, dashboards, and web tools that solve your actual problems. No distractions, no endless planning, no bloat.',
    },
  ];

  return (
    <section className='relative z-30 py-20'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          WHY WORK WITH ME?
        </h2>

        {/* Three columns */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 max-w-full'>
          {reasons.map((reason, index) => (
            <div key={index} className='flex flex-col items-start p-4 md:p-6'>
              {/* Reason Title */}
              <div className='h-16 md:h-20 flex items-start mb-3'>
                <h3 className='text-terminal-green font-ibm text-xl md:text-2xl lg:text-3xl font-bold'>
                  {reason.title}
                </h3>
              </div>

              {/* Border separator */}
              <div className='w-full h-px bg-terminal-green/20 mb-3 md:mb-4'></div>

              {/* Reason Description */}
              <div className='text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed'>
                {reason.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyWorkWithUs;
