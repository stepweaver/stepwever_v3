'use client';

import { memo } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

const WhyWorkWithUs = memo(() => {
  const reasons = [
    {
      title: 'Cut through, not just corners',
      description: (
        <>
          <GlitchLambda className='text-terminal-text' />
          stepweaver operates on ruthless efficiency-every sprint is focused,
          every automation is deliberate, and every result is measured in real
          impact. No fluff. No long-winded strategy decks. Just precision moves
          that push your business forward-fast.
        </>
      ),
    },
    {
      title: 'Ship while others are still talking',
      description: (
        <>
          Where traditional teams are stuck in endless meetings and approvals,{' '}
          <GlitchLambda className='text-terminal-text' />
          stepweaver builds, tests, and ships on a feedback loop so tight you'll
          be iterating before most agencies would have finished onboarding. You
          get results in days, not months-because moving fast is the competitive
          edge.
        </>
      ),
    },
    {
      title: 'One mind, all-in',
      description:
        'No handoffs, no bureaucracy, no finger-pointing. You work directly with the builder-one point of contact, full accountability. Decades of analysis, automation, and storytelling fused into solutions you actually use, not just admire. Your business becomes the only focus until the job is done.',
    },
  ];

  return (
    <section className='relative z-30 py-20'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          WHY WORK WITH US?
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
