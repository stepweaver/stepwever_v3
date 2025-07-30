'use client';

import { memo } from 'react';
import ComparisonSection from './ComparisonSection';

// 1) Data lives outside the component
const STEPS = [
  { title: 'We set the goal.', desc: 'Clear outcome, no guessing.' },
  { title: 'We map the plan.', desc: 'Simple steps and check‑ins.' },
  { title: 'We build and show progress.', desc: 'See the work every step.' },
  { title: 'We adjust together.', desc: 'Your feedback steers the ship.' },
  { title: 'We ship, support, wrap up.', desc: 'Working results, guaranteed.' },
];

function Approach() {
  return (
    <section
      id='approach'
      className='relative z-30 min-h-screen bg-terminal-bg text-terminal-text py-20'
    >
      {/* Explicit padding for mobile, minimal for desktop */}
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* Header */}
        <header className='mb-12'>
          <h2 className='font-ibm text-terminal-green text-4xl md:text-5xl leading-tight'>
            APPROACH
          </h2>
        </header>

        {/* Two‑column grid */}
        <div className='grid gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-20'>
          {/* Sticky left column */}
          <div className='lg:sticky lg:top-8 self-start'>
            <h3 className='font-ibm text-xl md:text-2xl lg:text-3xl mb-6'>
              I move fast, build openly, and keep you in the loop.
            </h3>

            <p className='font-ocr text-base leading-relaxed mb-8'>
              Every project is hands‑on: you talk to me, see the work as it
              happens, and help shape the result.
            </p>

            <h4 className='font-ibm text-terminal-cyan text-lg md:text-xl mb-4'>
              How it works:
            </h4>

            {/* Ordered list for accessibility */}
            <ol className='space-y-4'>
              {STEPS.map(({ title, desc }, i) => (
                <li
                  key={i}
                  className='group border-l-4 border-terminal-green/80 pl-4 transition-all hover:pl-6 hover:border-terminal-green/100'
                >
                  <h5 className='font-ibm text-terminal-green text-lg mb-1'>
                    {title}
                  </h5>
                  <p className='font-ocr text-sm leading-relaxed'>{desc}</p>
                </li>
              ))}
            </ol>

            <p className='border-t border-terminal-border pt-6 font-ocr text-base leading-relaxed mt-8'>
              No black boxes, no hand‑offs, no missed emails. Just direct work,
              fast feedback, and honest communication-from kickoff to launch.
            </p>
          </div>

          {/* Right column scrolls independently on desktop so sticky left never collides */}
          <div
            className='lg:max-h-[calc(100vh-4rem)] lg:overflow-auto' /* 4 rem = top+bottom section padding */
          >
            <ComparisonSection />
          </div>
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(Approach);
