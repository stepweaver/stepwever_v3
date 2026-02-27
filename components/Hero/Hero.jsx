'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { HUDPanel } from '@/components/ui/HUDPanel';
import { StatusPill } from '@/components/ui/StatusPill';
import { MatrixSync } from '@/components/ui/MatrixSync';
import TerminalLink from './TerminalLink';
import Link from 'next/link';

const About = dynamic(() => import('@/components/About/About'), {
  loading: () => <div className='min-h-[200px]' />,
});

const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), {
  ssr: false,
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
        <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>SCANNING MODULES...</div>
        <div className='mt-4 space-y-3'>
          <div className='h-4 bg-neon/10 w-3/4' />
          <div className='h-4 bg-neon/10 w-1/2' />
          <div className='h-4 bg-neon/10 w-2/3' />
        </div>
      </div>
    </div>
  ),
});

function Hero() {
  return (
    <section className='relative z-30 pt-0 pb-2 sm:pb-4 md:pb-6 w-full'>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-8 lg:gap-10 xl:gap-12 lg:items-stretch'>
          <div className='min-w-0 flex flex-col'>
            <HUDPanel title="OPERATOR" id="OPS-00" className="p-6 h-full min-h-full flex flex-col">
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-row items-start gap-4'>
                    <div className='relative w-32 h-32 shrink-0'>
                      <div
                        className='absolute inset-0 rounded-sm border-2 border-accent/50 motion-safe:animate-pulse'
                      />
                      <div className='relative w-full h-full rounded-sm overflow-hidden border-2 border-neon/30'>
                        <Image
                          src='/images/pixarMe-256.png'
                          alt='Stephen Weaver'
                          width={128}
                          height={128}
                          className='w-full h-full object-cover'
                          priority
                        />
                      </div>
                    </div>
                    <div className='space-y-2 text-left min-w-0 flex-1'>
                      <div>
                        <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase'>OPERATOR</p>
                        <p className='text-base font-bold text-text font-ibm'>STEPHEN WEAVER</p>
                      </div>
                      <div>
                        <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase'>ROLE</p>
                        <p className='text-sm text-text/90 font-ibm'>FULL-STACK / DATA / AUTOMATION</p>
                      </div>
                      <div>
                        <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase'>CURRENT FOCUS</p>
                        <p className='text-sm text-text/90 font-ibm'>DevOps Engineering</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col w-fit'>
                    <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase mb-1'>STATUS</p>
                    <StatusPill status="OPEN TO WORK" size="sm" />
                  </div>
                </div>
                <div className='w-full min-w-0'>
                  <div className='space-y-3'>
                    <p className='font-ibm text-text text-sm leading-relaxed'>
                      Builds for the web; translates business requirements into technical solutions. Known to leverage automation and convince machines to do his bidding.
                    </p>
                  </div>
                  <ul className='flex flex-wrap gap-2 mt-4 list-none' aria-label="Characteristics">
                    {['Developer', 'Problem Solver', 'Yankee Samurai', 'Veteran', 'Rebel'].map((label, i) => (
                      <li key={label}>
                        {label === 'Yankee Samurai' ? (
                          <Link
                            href='/yankee-samurai'
                            className='inline-block px-2.5 py-1 rounded border text-xs font-ibm border-terminal-magenta/60 text-terminal-magenta/90 hover:border-terminal-magenta hover:text-terminal-magenta hover:shadow-[0_0_12px_rgba(255,85,255,0.3)] transition-all duration-300 cursor-pointer'
                          >
                            {label}
                          </Link>
                        ) : (
                          <span
                            className={[
                              'inline-block px-2.5 py-1 rounded border text-xs font-ibm',
                              label === 'Rebel' ? 'border-terminal-magenta/70 text-terminal-magenta' : i === 1 ? 'border-accent text-accent' : 'border-neon/60 text-text/90',
                            ].join(' ')}
                          >
                            {label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className='mt-5'>
                    <MatrixSync />
                  </div>
                </div>
              </div>
            </HUDPanel>
          </div>

          {/* About content — same row height as left on desktop so bottom borders align */}
          <div className='min-w-0 flex flex-col h-full min-h-0'>
            <About />
          </div>
        </div>

        {/* Below the two panels so it never affects their height */}
        <div className='mt-6 sm:mt-8 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)]'>
          <TerminalLink />
        </div>
        <div className='mt-12 sm:mt-16 w-full'>
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
