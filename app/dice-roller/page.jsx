'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Dices,
  History,
  Zap,
  Keyboard,
  Target,
  ChevronRight,
} from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const DiceRoller = dynamic(() => import('@/components/DiceRoller/DiceRoller'));

const FEATURE_MODULES = [
  {
    title: 'Hold & reroll',
    body: 'Click dice in results to hold them, then reroll the rest. Perfect for advantage or exploding dice.',
    icon: Target,
    tag: 'MOD-01',
  },
  {
    title: 'Persistent history',
    body: 'Every roll saved to browser storage with timestamp, notation, and notes.',
    icon: History,
    tag: 'MOD-02',
  },
  {
    title: 'Keyboard shortcuts',
    body: 'ENTER to roll, C to copy notation, R to reset, ESC to clear.',
    icon: Keyboard,
    tag: 'MOD-03',
  },
];

const KEYBOARD_GUIDE = [
  { key: 'ENTER', action: 'Roll current pool' },
  { key: 'C', action: 'Copy notation' },
  { key: 'R', action: 'Reset pool' },
  { key: 'ESC', action: 'Clear results' },
];

function SidebarPanel({ children, label, className = '' }) {
  return (
    <div className={`hud-panel p-3 ${className}`}>
      {label && (
        <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase mb-2'>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function MobileBriefBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='lg:hidden shrink-0 border-b border-neon/15'>
      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full px-3 py-2 flex items-center justify-between text-left hover:bg-panel/30 transition-colors cursor-pointer'
      >
        <div className='flex items-center gap-2'>
          <Zap className='w-3 h-3 text-neon/50' />
          <span className='font-ocr text-xs tracking-[0.2em] text-neon/50 uppercase'>
            Quick reference
          </span>
        </div>
        <ChevronRight
          className={`w-3 h-3 text-neon/40 transition-transform duration-200 ${
            expanded ? 'rotate-90' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className='px-3 pb-3 space-y-3 motion-safe:animate-[hudFadeIn_0.15s_ease-out]'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-2 px-1'>
            {KEYBOARD_GUIDE.map((item) => (
              <span key={item.key} className='font-ocr text-sm'>
                <span className='text-neon/60 font-ibm'>{item.key}</span>
                <span className='text-text/30'> — {item.action}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DiceRollerPage() {
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
    return () => {
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className='relative h-[calc(100vh-6rem)] flex flex-col overflow-hidden'>
        <BackgroundCanvas />

        <div className='relative z-10 flex flex-col h-full'>
          {/* ── System Header ── */}
          <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2.5'>
              <Dices className='w-3.5 h-3.5 text-neon/60' />
              <span className='font-ocr text-xs tracking-[0.3em] text-neon/50 uppercase'>
                ROLL-00
              </span>
              <span className='text-neon/15 hidden sm:inline'>│</span>
              <span className='font-ibm text-xs text-text/50 hidden sm:inline'>
                λstepweaver dice
              </span>
            </div>
            <div className='flex items-center gap-2.5'>
              <span className='inline-flex items-center gap-1.5'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
                </span>
                <span className='font-ocr text-xs tracking-[0.15em] text-neon/60 uppercase'>
                  Ready
                </span>
              </span>
            </div>
          </header>

          {/* ── Mobile expandable brief ── */}
          <MobileBriefBar />

          {/* ── Main Console ── */}
          <div className='flex-1 flex flex-col lg:flex-row min-h-0'>
            {/* ── Sidebar: HUD Panels ── */}
            <aside className='hidden lg:flex lg:flex-col lg:w-72 2xl:w-80 shrink-0 border-r border-neon/15 overflow-y-auto'>
              <div className='p-3 space-y-3 flex-1'>
                {/* System Brief */}
                <SidebarPanel label='SYS.BRIEF'>
                  <p className='font-ibm text-lg text-text leading-snug'>
                    RPG Dice Roller.
                  </p>
                  <p className='font-ocr text-sm text-text/50 leading-relaxed mt-2'>
                    Roll complex dice pools, hold dice for rerolls, and track
                    history. Built with keyboard shortcuts for speed.
                  </p>
                  <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                  <p className='font-ocr text-xs text-neon/40 mt-2'>
                    Fully client-side. All rolls saved to your browser.
                  </p>
                </SidebarPanel>

                {/* Quick Start */}
                <SidebarPanel label='QUICK.START'>
                  <ul className='space-y-1.5 font-ocr text-sm text-text/70'>
                    <li>1. Click dice to add to pool. Adjust with +/−.</li>
                    <li>2. Add modifiers or notes. Hit ENTER or ROLL.</li>
                    <li>3. Click dice to hold, then REROLL to keep values.</li>
                  </ul>
                </SidebarPanel>

                {/* Feature Modules */}
                <div>
                  <p className='font-ocr text-xs tracking-[0.25em] text-neon/40 uppercase px-1 mb-2'>
                    Modules
                  </p>
                  <div className='space-y-1.5'>
                    {FEATURE_MODULES.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div
                          key={mod.tag}
                          className='group flex items-start gap-2.5 px-3 py-2.5 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                        >
                          <Icon className='w-3.5 h-3.5 text-neon/55 mt-0.5 shrink-0 group-hover:text-neon/80 transition-colors' />
                          <div className='min-w-0'>
                            <div className='flex items-baseline gap-2'>
                              <p className='font-ibm text-xs text-neon/80 group-hover:text-neon transition-colors'>
                                {mod.title}
                              </p>
                              <span className='font-ocr text-[8px] text-neon/25'>
                                {mod.tag}
                              </span>
                            </div>
                            <p className='font-ocr text-sm text-text/40 leading-snug mt-0.5'>
                              {mod.body}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Keyboard Reference */}
                <SidebarPanel label='KEYBIND'>
                  <div className='space-y-1.5'>
                    {KEYBOARD_GUIDE.map((item) => (
                      <div
                        key={item.key}
                        className='flex items-baseline gap-2 font-ocr text-xs'
                      >
                        <code className='text-neon/65 shrink-0 font-ibm text-sm px-1.5 py-0.5 rounded bg-panel/50 border border-neon/15'>
                          {item.key}
                        </code>
                        <span className='text-text/30 truncate'>
                          {item.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </SidebarPanel>

                {/* System Info */}
                <div className='px-1 space-y-1'>
                  <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                    <span className='w-1 h-1 rounded-full bg-neon/30' />
                    <span>Client-side only</span>
                  </div>
                  <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                    <span className='w-1 h-1 rounded-full bg-neon/30' />
                    <span>History stored in browser</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Dice Section ── */}
            <section
              id='dice-roller-section'
              className='flex-1 min-h-0 flex flex-col'
            >
              {/* Chrome header */}
              <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Dices className='w-3 h-3 text-neon/40' />
                  <span className='font-ocr text-xs tracking-[0.18em] text-neon/40 uppercase'>
                    Dice pool
                  </span>
                </div>
                <span className='font-ocr text-xs text-text/20 hidden sm:inline'>
                  ROLL-01
                </span>
              </div>

              <div className='flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 md:p-5'>
                <DiceRoller />
              </div>
            </section>
          </div>

          {/* ── Status Bar ── */}
          <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
            <span className='font-ocr text-xs text-neon/45 whitespace-nowrap'>
              <span className='font-sans'>»</span> roll
            </span>
            <span className='text-neon/15'>│</span>
            <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap'>
              Pool ready
            </span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
              Local storage
            </span>
            <span className='text-neon/15 hidden md:inline'>│</span>
            <span className='font-ocr text-xs text-text/20 uppercase whitespace-nowrap hidden md:inline'>
              No server
            </span>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DiceRollerPage;
