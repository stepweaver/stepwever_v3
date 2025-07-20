'use client';

import { memo } from 'react';

const WhyWorkWithUs = memo(() => {
  const reasons = [
    {
      title: 'Invest smart and strategically',
      description:
        "We cut through the noise and calculate what will make an impact for you. Our primary focus is efficiency and minimising waste with our sprint-based, low risk, iterative process. There's no long-winded moonshots here, just a tangible return on investment that a traditional agency couldn't dream of delivering.",
    },
    {
      title: 'Adapt or get left behind',
      description:
        "We won't let you chase and mimic your competitors because you'll be too busy blowing them out of the water. Market leaders adapt as a competitive edge and that's exactly where we'll position you, without compromising on quality.",
    },
    {
      title: 'Trust us to deliver the goods',
      description:
        "We take complete control of projects because we know it's not your day-to-day focus. We become an extension of your team, bringing our business analysis expertise and problem-solving passion close to where it matters to help you race past your competitors.",
    },
  ];

  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-4xl md:text-5xl lg:text-6xl mb-16 leading-tight text-left font-ibm text-terminal-green font-bold whitespace-nowrap'>
          WHY WORK WITH US
        </h2>

        {/* Three columns */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-full'>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6),0_10px_10px_-5px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,65,0.3),0_0_1px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.7),0_15px_15px_-5px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,65,0.4),0_0_2px_rgba(0,255,65,0.8),0_0_25px_rgba(0,255,65,0.4)] transition-all duration-300 group cursor-pointer'
            >
              {/* Terminal Header */}
              <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
                  <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
                  <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
                </div>
                <div className='text-terminal-dimmed text-sm font-ocr'>
                  ~/reason-{index + 1}
                </div>
              </div>

              {/* Terminal Content */}
              <div className='p-4 bg-terminal-dark min-h-[200px] flex flex-col'>
                {/* Reason Title */}
                <h3 className='text-terminal-green font-ibm text-lg font-bold mb-2'>
                  {reason.title}
                </h3>

                {/* Reason Description */}
                <p className='text-terminal-text font-ocr text-sm leading-relaxed mb-3 flex-grow'>
                  {reason.description}
                </p>

                {/* Terminal Prompt */}
                <div className='text-terminal-dimmed font-ocr text-xs'>
                  <span className='text-terminal-green'>
                    guest@stepweaver.dev
                  </span>
                  <span className='text-terminal-text'> ~ </span>
                  <span className='text-terminal-cyan'>λ</span>
                  <span className='text-terminal-text'> why-work-with-us</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyWorkWithUs;
