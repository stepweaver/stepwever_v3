'use client';

import { memo } from 'react';
import Image from 'next/image';
import { MatrixSync } from '@/components/ui/MatrixSync';
import Link from 'next/link';

function HeroOperatorCard() {
  return (
    <section className='relative w-full max-w-[390px] flex flex-col border border-neon/20 bg-panel/25 p-5'>
      {/* corner brackets */}
      <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

      {/* header rail */}
      <header className='relative z-10 mb-4 flex items-start justify-between gap-4 pb-1'>
        <div>
          <p className='text-xs tracking-[0.24em] text-neon/70 font-ocr uppercase'>Profile</p>
          <h2 className='text-xl font-semibold text-text font-ibm'>Stephen Weaver</h2>
        </div>
        <div className='text-right text-xs text-muted font-mono shrink-0'>
          <div className='tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]'>Profile ID</div>
          <div className='font-mono text-neon/80 whitespace-nowrap'>HMFIC-01</div>
        </div>
      </header>

      <div className='relative z-10 flex flex-col gap-4'>
        {/* portrait bay + data rail */}
        <div className='grid grid-cols-[144px_1fr] gap-4 items-start'>
          <div className='flex flex-col gap-2'>
            <div className='relative w-36 h-36 border border-neon/25 bg-terminal-dark/30'>
              <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-accent/50' />
              <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-accent/50' />
              <Image
                src='/images/pixarMe-256.png'
                alt='Stephen Weaver'
                width={144}
                height={144}
                className='w-full h-full object-cover'
                priority
              />
            </div>
          </div>

          <div className='min-w-0 space-y-3'>
            <div>
              <p className='text-[10px] tracking-[0.22em] text-neon/60 font-ocr uppercase'>Role</p>
              <p className='text-sm text-text/90 font-ibm leading-snug'>
                Systems Builder · Full-Stack Developer · Automation & AI Integration
              </p>
            </div>

            <div className='space-y-2'>
              <Link
                href='/resume'
                className='group block'
                aria-label='Open to work (view resume)'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='text-[10px] tracking-[0.22em] text-neon/60 font-ocr uppercase'>Availability</p>
                    <div className='mt-1 flex items-center gap-2'>
                      <p className='text-sm text-terminal-green font-ibm whitespace-normal leading-snug'>
                        Open to work
                      </p>
                      <span className='relative flex h-4 w-4 flex-shrink-0 items-center justify-center' aria-hidden>
                        <span className='absolute inline-flex h-full w-full rounded-full bg-terminal-green/35 motion-safe:animate-ping' />
                        <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-terminal-green shadow-[0_0_14px_rgba(0,255,153,0.55)]' />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div>
                <p className='text-[10px] tracking-[0.22em] text-neon/60 font-ocr uppercase'>Current focus</p>
                <p className='mt-1 text-sm text-text/85 font-ibm whitespace-normal leading-snug'>
                  DevOps engineering and infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* mission statement */}
        <div className='pt-3'>
          <p className='font-ibm text-text text-sm leading-relaxed'>
            I turn business workflows into dependable software, automation, and AI-assisted systems. I define what should exist, connect the moving parts, supervise implementation, and think through failure points before they become expensive.
          </p>
        </div>

        {/* command rail */}
        <div className='pt-3 flex flex-wrap gap-2'>
          <Link
            href='/resume'
            className='inline-flex cursor-pointer items-center justify-center border border-terminal-green/25 bg-terminal-dark/20 px-3 py-2 text-xs font-ibm uppercase tracking-[0.08em] text-terminal-green transition-colors hover:border-terminal-green/60 hover:bg-terminal-green/10'
          >
            Resume
          </Link>

          <Link
            href='/contact'
            className='inline-flex cursor-pointer items-center justify-center border border-neon/25 bg-terminal-dark/20 px-3 py-2 text-xs font-ibm uppercase tracking-[0.08em] text-neon/80 transition-colors hover:border-neon/55 hover:bg-neon/10 hover:text-neon'
          >
            Contact
          </Link>

          <Link
            href='/terminal'
            className='inline-flex cursor-pointer items-center justify-center border border-neon/15 bg-terminal-dark/20 px-3 py-2 text-xs font-ibm uppercase tracking-[0.08em] text-terminal-dimmed transition-colors hover:border-neon/40 hover:bg-neon/10 hover:text-neon/80'
          >
            Terminal
          </Link>
        </div>

        {/* tags + sync */}
        <div className='pt-3 space-y-3'>
          <div className='grid gap-2'>
            <div className='flex flex-wrap items-center gap-2'>
              {['Veteran', 'Business Analyst', 'Developer'].map((label) => (
                <span
                  key={label}
                  className='border border-neon/25 bg-terminal-dark/15 px-2 py-1 text-[11px] font-ibm text-text/80'
                >
                  {label}
                </span>
              ))}
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <Link
                href='/yankee-samurai'
                className='inline-flex cursor-pointer border border-terminal-magenta/35 bg-terminal-dark/10 px-2 py-1 text-[11px] font-ibm text-terminal-magenta/80 hover:border-terminal-magenta/70 hover:bg-terminal-magenta/10'
              >
                YANKEE SAMURAI
              </Link>
              <span className='border border-terminal-magenta/20 bg-terminal-dark/10 px-2 py-1 text-[11px] font-ibm text-terminal-magenta/60'>
                REBEL
              </span>
            </div>
          </div>

          <MatrixSync />
        </div>
      </div>
    </section>
  );
}

export default memo(HeroOperatorCard);
