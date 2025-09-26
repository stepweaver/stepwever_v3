'use client';

import { memo } from 'react';

// 1) Data lives outside the component
const SERVICES = [
  {
    title: 'Websites',
    description:
      'Professional websites that bring in more customers and work on every device.',
    items: [
      'Mobile-friendly sites that load fast',
      'Contact forms that actually work',
      'Easy to update and manage yourself',
    ],
  },
  {
    title: 'Automations',
    description:
      'Stop doing repetitive tasks. Let me build systems that handle the busywork for you.',
    items: [
      'Connect your apps so data flows automatically',
      'Email campaigns that run themselves',
      'Reports that update without you lifting a finger',
    ],
  },
  {
    title: 'Digital Strategy',
    description: 'Get a clear plan for growing your business online.',
    items: [
      'Figure out what metrics actually matter to your business',
      'Build the right tools to track your progress',
      'Ongoing support to keep everything running smoothly',
    ],
  },
];

function WhatWeDo() {
  return (
    <section className='relative z-30 py-20'>
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* Section Header */}
        <header className='mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight text-left font-ibm text-terminal-green'>
            WHAT I DO
          </h2>
          <p className='text-lg md:text-xl font-ocr text-terminal-text leading-relaxed mb-6'>
            Need specific pricing and delivery timelines?<br />
            <a
              href='/services'
              className='text-terminal-green hover:text-terminal-yellow transition-colors underline hover:no-underline font-bold'
            >
              Check out my services page
            </a>{' '}
            for fixed-price solutions and custom work options.
          </p>
        </header>

        {/* Services Grid - Clean columns without boxes */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16'>
          {SERVICES.map((service, index) => (
            <article key={index}>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-green mb-3 md:mb-4'>
                {service.title}
              </h3>
              <div className='h-0.5 bg-terminal-green mb-4 md:mb-6'></div>
              <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed mb-4 md:mb-6'>
                {service.description}
              </p>
              <ul className='space-y-3 md:space-y-4 text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='flex items-start'>
                    <span className='text-terminal-green font-bold mr-3 mt-1'>
                      &gt;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(WhatWeDo);
