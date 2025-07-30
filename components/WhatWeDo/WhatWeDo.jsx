'use client';

import { memo } from 'react';

// 1) Data lives outside the component
const SERVICES = [
  {
    title: 'Data',
    items: [
      'Plug your POS, accounting, and SaaS APIs into one live source of truth.',
      'Ship real-time KPI dashboards with alerting-no more end-of-month surprises.',
      'Automate exports, reconciliations, and reports so you can focus on what you do best.',
    ],
  },
  {
    title: 'Design',
    items: [
      'Craft lightning-fast marketing sites in React/Next.',
      'Refresh logos, color palettes, and typography to match your positioning.',
      'Bake in SEO, analytics, and interactive components from day one.',
    ],
  },
  {
    title: 'Strategy',
    items: [
      'Define the metric, build the system, hand it over.',
      'AI-powered process automations that free up whole roles, not just tasks',
      'Roadmaps, SOPs, and retainer options to keep momentum compounding.',
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
            WHAT WE DO
          </h2>
        </header>

        {/* Services Grid - Clean columns without boxes */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16'>
          {SERVICES.map((service, index) => (
            <article key={index}>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-green mb-3 md:mb-4'>
                {service.title}
              </h3>
              <div className='h-0.5 bg-terminal-green mb-4 md:mb-6'></div>
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
