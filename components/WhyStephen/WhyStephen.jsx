'use client';

import { memo } from 'react';

function WhyStephen() {
  return (
    <section className='relative z-30 w-full'>
      <div className='relative border border-neon/20 bg-panel/25 p-5'>
        <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
        <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
        <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

        <header className='relative z-10 mb-4 flex items-start justify-between gap-4 border-b border-neon/15 pb-3'>
          <div>
            <p className='text-xs tracking-[0.18em] text-text-label font-ocr uppercase sm:text-sm'>Value</p>
            <h2 className='text-lg font-semibold text-text font-ibm'>Why teams hire me</h2>
          </div>
          <div className='text-right text-xs text-muted font-mono shrink-0'>
            <div className='tracking-[0.18em] text-text-meta uppercase font-ocr text-xs'>Section</div>
            <div className='font-mono text-text-secondary whitespace-nowrap'>WHY-01</div>
          </div>
        </header>

        <div className='relative z-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
          {[
            {
              id: '01',
              title: 'Sees the whole workflow',
              body: 'Understands business rules, dependencies, handoffs, and edge cases—not just the code in front of me.',
              proof: '8+ years across business process, reporting, systems, and web development.',
            },
            {
              id: '02',
              title: 'Connects the system',
              body: 'Knows how tools, APIs, data, and people fit together across the full flow.',
              proof: 'Integration-heavy work: glue code, automations, and production apps that have to talk to each other.',
            },
            {
              id: '03',
              title: 'Builds under constraint',
              body: 'Works well when requirements are incomplete, the budget is real, and the environment is messy.',
              proof: 'Used to legacy process, shifting scope, and shipping without a perfect spec.',
            },
            {
              id: '04',
              title: 'Catches risks early',
              body: 'Thinks about failure states, maintenance, security, and operational reality before they become rework.',
              proof: 'Bias toward clear flows, fewer failure points, and systems that are easier to hand off.',
            },
          ].map((m) => (
            <article key={m.id} className='relative border border-neon/20 bg-terminal-dark/15 p-4'>
              <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
              <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon/60' />

              <div className='mb-3 flex items-start justify-between gap-3'>
                <div>
                  <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>
                    {m.id}
                  </div>
                  <h3 className='mt-1 font-ibm text-base tracking-[0.02em] text-neon'>
                    {m.title}
                  </h3>
                </div>
                <div className='border border-neon/15 bg-terminal-dark/20 px-2 py-1 text-xs font-ocr uppercase tracking-[0.18em] text-text-meta'>
                  Proof
                </div>
              </div>

              <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent' />

              <p className='mt-3 font-ibm text-sm leading-relaxed text-text-secondary'>{m.body}</p>
              <p className='mt-3 border-t border-neon/10 pt-2 font-ibm text-xs leading-relaxed text-text-secondary'>
                <span className='font-ocr text-xs uppercase tracking-[0.18em] text-text-meta'>Proof:</span>{' '}
                <span className='text-text-secondary'>{m.proof}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhyStephen);

