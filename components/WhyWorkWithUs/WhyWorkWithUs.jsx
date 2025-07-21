'use client';

import { memo } from 'react';

const WhyWorkWithUs = memo(() => {
  const reasons = [
    {
      title: 'Cut through, not just corners',
      description:
        'λstepweaver operates on ruthless efficiency—every sprint is focused, every automation is deliberate, and every result is measured in real impact. No fluff. No long-winded strategy decks. Just precision moves that push your business forward—fast.',
    },
    {
      title: 'Ship while others are still talking',
      description:
        'Where traditional teams are stuck in endless meetings and approvals, λstepweaver builds, tests, and ships on a feedback loop so tight you’ll be iterating before most agencies would have finished onboarding. You get results in days, not months—because moving fast is the competitive edge.',
    },
    {
      title: 'One mind, all-in',
      description:
        'No handoffs, no bureaucracy, no finger-pointing. You work directly with the builder—one point of contact, full accountability. Decades of analysis, automation, and storytelling fused into solutions you actually use, not just admire. Your business becomes the only focus until the job is done.',
    },
  ];

  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-4xl md:text-5xl lg:text-6xl mb-16 leading-tight text-left font-ibm text-terminal-green whitespace-nowrap'>
          WHY WORK WITH US
        </h2>

        {/* Three columns */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-full'>
          {reasons.map((reason, index) => (
            <div key={index} className='flex flex-col items-start p-6'>
              {/* Reason Title */}
              <div className='h-20 flex items-start mb-3'>
                <h3 className='text-terminal-green font-ibm text-3xl font-bold'>
                  {reason.title}
                </h3>
              </div>

              {/* Border separator */}
              <div className='w-full h-px bg-terminal-green/20 mb-4'></div>

              {/* Reason Description */}
              <p className='text-terminal-text font-ocr text-xl leading-relaxed'>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyWorkWithUs;
