'use client';

import { memo } from 'react';
import ComparisonSection from './ComparisonSection';

const STEPS = [
  { title: 'We set the goal.', desc: 'Clear outcome, no guessing.' },
  { title: 'We map the plan.', desc: 'Simple steps & check‑ins.' },
  { title: 'We build and show progress.', desc: 'See the work every step.' },
  { title: 'We adjust together.', desc: 'Your feedback steers the ship.' },
  { title: 'We ship, support, wrap up.', desc: 'Working results, guaranteed.' },
];

function Approach() {
  return (
    <section
      id='approach'
      className='scroll-mt-24 bg-terminal-bg text-terminal-text py-20 lg:py-24 relative z-30'
    >
      <div className='px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6'>
        {/* Header ----------------------------------------------------------- */}
        <header className='mb-16'>
          <h2 className='font-ibm text-terminal-green text-[clamp(2rem,4.5vw,3.5rem)] leading-tight'>
            APPROACH
          </h2>
        </header>

        {/* Grid ------------------------------------------------------------- */}
        <div className='grid gap-y-16 lg:grid-cols-[minmax(0,50ch)_1fr] lg:gap-x-24'>
          {/* Sticky steps column ------------------------------------------- */}
          <aside className='lg:sticky lg:top-12 self-start'>
            <h3 className='font-ibm text-xl sm:text-2xl lg:text-3xl mb-6'>
              I move fast, build openly, and keep you in the loop.
            </h3>

            <p className='font-ocr text-base leading-relaxed mb-10'>
              Every project is hands‑on: you talk to me, see the work as it
              happens, and help shape the result.
            </p>

            <h4 className='font-ibm text-terminal-cyan text-lg sm:text-xl mb-6'>
              How it works
            </h4>

            <ol className='space-y-6'>
              {STEPS.map(({ title, desc }, i) => (
                <li
                  key={i}
                  className='border-l-2 border-terminal-green/60 pl-4 group'
                >
                  <h5 className='font-ibm text-terminal-green text-lg mb-1'>
                    {title}
                  </h5>
                  <p className='font-ocr text-sm leading-relaxed text-terminal-text/90'>
                    {desc}
                  </p>
                </li>
              ))}
            </ol>

            <p className='border-t border-terminal-border pt-8 mt-10 font-ocr text-base leading-relaxed'>
              No black boxes, no hand‑offs, no missed emails. Just direct work,
              fast feedback, and honest communication—from kickoff to launch.
            </p>
          </aside>

          {/* Comparison column --------------------------------------------- */}
          <div className='lg:max-h-[calc(100vh-6rem)] lg:overflow-auto'>
            <ComparisonSection />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Approach);
