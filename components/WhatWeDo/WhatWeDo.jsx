'use client';

export default function WhatWeDo() {
  return (
    <section className='relative z-30 py-20'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Section Header */}
        <div className='mb-16'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-left font-ibm text-terminal-green whitespace-nowrap'>
            WHAT WE DO
          </h2>
        </div>

        {/* Services Grid - Clean columns without boxes */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16'>
          {/* Data */}
          <div>
            <h3 className='text-2xl lg:text-3xl font-ibm text-terminal-green mb-4'>
              Data
            </h3>
            <div className='h-0.5 bg-terminal-green mb-6'></div>
            <ul className='space-y-4 text-terminal-text font-ocr text-lg leading-relaxed'>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Plug your POS, accounting, and SaaS APIs into one live source
                  of truth.
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Ship real-time KPI dashboards with alerting—no more
                  end-of-month surprises.
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Automate exports, reconciliations, and reports so you can
                  focus on what you do best.
                </span>
              </li>
            </ul>
          </div>

          {/* Design */}
          <div>
            <h3 className='text-2xl lg:text-3xl font-ibm text-terminal-green mb-4'>
              Design
            </h3>
            <div className='h-0.5 bg-terminal-green mb-6'></div>
            <ul className='space-y-4 text-terminal-text font-ocr text-lg leading-relaxed'>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>Craft lightning-fast marketing sites in React/Next.</span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Refresh logos, color palettes, and typography to match your
                  positioning.
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Bake in SEO, analytics, and interactive components from day
                  one.
                </span>
              </li>
            </ul>
          </div>

          {/* Strategy */}
          <div>
            <h3 className='text-2xl lg:text-3xl font-ibm text-terminal-green mb-4'>
              Strategy
            </h3>
            <div className='h-0.5 bg-terminal-green mb-6'></div>
            <ul className='space-y-4 text-terminal-text font-ocr text-lg leading-relaxed'>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>Define the metric, build the system, hand it over.</span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  AI-powered process automations that free up whole roles, not
                  just tasks
                </span>
              </li>
              <li className='flex items-start'>
                <span className='text-terminal-green font-bold mr-3 mt-1'>
                  &gt;
                </span>
                <span>
                  Roadmaps, SOPs, and retainer options to keep momentum
                  compounding.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
