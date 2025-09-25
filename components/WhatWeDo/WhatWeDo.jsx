'use client';

import { memo } from 'react';

// 1) Data lives outside the component
const SERVICES = [
  {
    title: 'Data Integrations',
    description:
      'Connect all your business systems - POS, accounting, and SaaS - into one real-time dashboard.',
    items: [
      'One source of truth for all your numbers',
      'Automated exports and notifications',
      'Alerts for what matters',
    ],
  },
  {
    title: 'Web Design',
    description:
      'Build fast, modern websites and digital tools that work from day one.',
    items: [
      'React/Next sites that load fast',
      'Brand refresh: logo, colors, fonts',
      'Search engine optimization, analytics, and built-in interactivity',
    ],
  },
  {
    title: 'Strategy & Automation',
    description: 'Get practical systems, not PowerPoints.',
    items: [
      'Define the right metrics, build the tools, hand them over',
      'Automations that handle real work, not just busywork',
      'Ongoing support and roadmaps to keep things moving',
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
          <p className='text-lg md:text-xl font-ocr text-terminal-text max-w-4xl leading-relaxed mb-6'>
            Need specific pricing and delivery timelines?{' '}
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
