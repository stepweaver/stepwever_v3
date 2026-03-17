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
            <p className='text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase'>SELECTION CRITERIA</p>
            <h2 className='text-lg font-semibold text-text font-ibm'>Why deploy this operator</h2>
          </div>
          <div className='text-right text-xs text-muted font-mono shrink-0'>
            <div className='tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]'>ID</div>
            <div className='font-mono text-neon/80 whitespace-nowrap'>WHY-01</div>
          </div>
        </header>

        <div className='relative z-10 grid gap-3 md:grid-cols-3'>
          {[
            {
              id: '01',
              title: 'TRANSLATES OPERATIONS',
              body: 'Understands business logic, edge cases, and handoffs — not just code paths.',
              proof: '8+ years bridging business and technical systems',
            },
            {
              id: '02',
              title: 'BUILDS UNDER CONSTRAINT',
              body: 'Thrives in ambiguity and integration-heavy work where requirements aren’t clean.',
              proof: 'Comfortable in ambiguity, integrations, and constraint-heavy environments',
            },
            {
              id: '03',
              title: 'SHIPS USABLE SYSTEMS',
              body: 'Optimizes for adoption, clarity, and workflows that hold up under pressure.',
              proof: 'Focused on outcomes: reduce friction, improve operations, make it usable',
            },
          ].map((m) => (
            <article key={m.id} className='relative border border-neon/20 bg-terminal-dark/15 p-4'>
              <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
              <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon/60' />

              <div className='mb-3 flex items-start justify-between gap-3'>
                <div>
                  <div className='font-ocr text-[10px] uppercase tracking-[0.28em] text-neon/50'>
                    {m.id}
                  </div>
                  <h3 className='mt-1 font-ibm text-base uppercase tracking-[0.06em] text-neon'>
                    {m.title}
                  </h3>
                </div>
                <div className='border border-neon/15 bg-terminal-dark/20 px-2 py-1 text-[10px] font-ocr uppercase tracking-[0.22em] text-text/60'>
                  CRIT
                </div>
              </div>

              <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent' />

              <p className='mt-3 font-ibm text-sm leading-relaxed text-text/85'>{m.body}</p>
              <p className='mt-3 border-t border-neon/10 pt-2 font-ocr text-[10px] uppercase tracking-[0.22em] text-text/60'>
                PROOF: <span className='text-text/75'>{m.proof}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhyStephen);

