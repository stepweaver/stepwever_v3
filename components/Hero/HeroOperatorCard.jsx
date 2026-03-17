'use client';

import { memo } from 'react';
import Image from 'next/image';
import { HUDPanel } from '@/components/ui/HUDPanel';
import { StatusPill } from '@/components/ui/StatusPill';
import { MatrixSync } from '@/components/ui/MatrixSync';
import Link from 'next/link';

function HeroOperatorCard() {
  return (
    <HUDPanel title="OPERATOR" id="OPS-00" className="p-6 h-full min-h-full flex flex-col w-full max-w-[390px]">
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
                <p className='text-sm text-text/90 font-ibm'>FULL-STACK / AI / AUTOMATION</p>
              </div>
              <div>
                <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase'>CURRENT FOCUS</p>
                <p className='text-sm text-text/90 font-ibm'>DevOps Engineering</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-fit'>
            <p className='text-[10px] tracking-[0.2em] text-neon/70 font-ocr uppercase mb-1'>STATUS</p>
            <StatusPill status="OPEN TO WORK" size="sm" href="/resume" />
          </div>
        </div>
        <div className='w-full min-w-0'>
          <div className='space-y-3'>
            <p className='font-ibm text-text text-sm leading-relaxed'>
              Builds web apps, automations, and AI-enabled tools that reduce friction and improve operations. Translates business requirements into usable systems. Known to leverage automation and convince machines to do his bidding.
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
  );
}

export default memo(HeroOperatorCard);
