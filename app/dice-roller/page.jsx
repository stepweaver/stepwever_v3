'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect } from 'react';
import {
  Dices,
  History,
  Zap,
  Keyboard,
  Copy,
  Target,
} from 'lucide-react';

// Lazy load heavy components
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const DiceRoller = dynamic(() => import('@/components/DiceRoller/DiceRoller'));

const DICE_ROLLER_COPY = {
  hero: {
    title: 'RPG Dice Roller.',
    subtitle:
      "Roll complex dice pools, hold dice for rerolls, and track history. Built with keyboard shortcuts for speed.",
    ribbon:
      'Fully client-side. All rolls saved to your browser.',
  },
  overview: {
    title: 'What it does',
    text: 'Handles complex pools (4d6+2d8+3), tracks rolls with timestamps and notes, and lets you hold specific dice for partial rerolls. Keyboard shortcuts, persistent history, one-click notation export.',
  },
  usage: {
    title: 'Quick start',
    steps: [
      'Click dice to add to pool. Adjust counts with +/− buttons.',
      'Add modifiers or notes. Hit ENTER or click ROLL.',
      'Click dice in results to hold them, then REROLL to keep those values.',
    ],
  },
};

const FEATURE_CARDS = [
  {
    title: 'Hold & reroll',
    body: 'Click individual dice in results to hold them, then reroll the rest. Perfect for advantage or exploding dice mechanics.',
    icon: Target,
  },
  {
    title: 'Persistent history',
    body: 'Every roll saved to browser storage with timestamp, notation, and notes.',
    icon: History,
  },
  {
    title: 'Keyboard shortcuts',
    body: 'ENTER to roll, C to copy notation, R to reset, ESC to clear.',
    icon: Keyboard,
  },
];

const KEYBOARD_GUIDE = [
  { key: 'ENTER', action: 'Roll current dice pool' },
  { key: 'C', action: 'Copy roll notation to clipboard' },
  { key: 'R', action: 'Reset pool and clear inputs' },
  { key: 'ESC', action: 'Clear current results' },
];

const JumpToDiceButton = () => {
  const scrollToDice = () => {
    const diceSection = document.getElementById('dice-roller-section');
    if (diceSection) {
      diceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={scrollToDice}
      className='xl:hidden w-full mt-6 py-3 px-4 cyber-border-sm cyber-border-cyan bg-terminal-dark/30 backdrop-blur-xl hover:bg-terminal-dark/50 text-terminal-cyan font-ocr text-sm transition-all duration-200 hover:border-terminal-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center justify-center gap-2'
      aria-label='Jump to dice roller'
    >
      <Dices className='w-4 h-4' />
      <span>Jump to dice roller</span>
    </button>
  );
};

export default function DiceRollerPage() {
  // Hide footer for dice roller page (full-screen experience)
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Cleanup function to restore footer when component unmounts
    return () => {
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className='min-h-screen relative overflow-x-hidden max-w-full'>
        <BackgroundCanvas />
        
        <div className='relative z-10 w-full overflow-x-hidden'>
          <section className='w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-x-hidden'>
            <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
              <header className='space-y-6'>
                <div className='space-y-4'>
                  <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl text-terminal-cyan leading-tight'>
                    {DICE_ROLLER_COPY.hero.title}
                  </h1>
                  <p className='font-ocr text-base sm:text-lg md:text-xl text-terminal-text/85 leading-relaxed max-w-5xl'>
                    {DICE_ROLLER_COPY.hero.subtitle}
                  </p>
                </div>
                <div className='relative cyber-border cyber-border-cyan bg-terminal-dark/20 backdrop-blur-xl px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-terminal-text/90 shadow-[0_0_30px_rgba(0,255,255,0.15)]'>
                  <span>{DICE_ROLLER_COPY.hero.ribbon}</span>
                  <span
                    className='absolute inset-y-0 left-0 w-1 bg-terminal-cyan/80'
                    aria-hidden='true'
                  ></span>
                </div>
              </header>

              <section className='grid gap-10 xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)]'>
                <div className='space-y-8'>
                  <article className='space-y-3'>
                    <h2 className='font-ibm text-2xl sm:text-3xl text-terminal-cyan'>
                      {DICE_ROLLER_COPY.overview.title}
                    </h2>
                    <p className='font-ocr text-sm text-terminal-text/85 leading-relaxed'>
                      {DICE_ROLLER_COPY.overview.text}
                    </p>
                    <JumpToDiceButton />
                  </article>

                  <div className='grid gap-4'>
                    {FEATURE_CARDS.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.title}
                          className='cyber-border cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-4 space-y-2'
                        >
                          <div className='flex items-center gap-2'>
                            <Icon className='w-4 h-4 text-terminal-cyan' />
                            <p className='font-ibm text-base text-terminal-cyan'>
                              {card.title}
                            </p>
                          </div>
                          <p className='font-ocr text-xs text-terminal-text/80 leading-relaxed'>
                            {card.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <article className='space-y-3'>
                    <h3 className='font-ibm text-xl text-terminal-cyan'>
                      {DICE_ROLLER_COPY.usage.title}
                    </h3>
                    <ul className='space-y-2 font-ocr text-xs text-terminal-text/85'>
                      {DICE_ROLLER_COPY.usage.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className='cyber-border-sm cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-3 leading-relaxed'
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                    <JumpToDiceButton />
                  </article>

                  <article className='space-y-3'>
                    <div className='flex items-center gap-2'>
                      <Keyboard className='w-4 h-4 text-terminal-cyan' />
                      <h3 className='font-ibm text-xl text-terminal-cyan'>
                        Keyboard shortcuts
                      </h3>
                    </div>
                    <div className='grid gap-3'>
                      {KEYBOARD_GUIDE.map((item) => (
                        <div
                          key={item.key}
                          className='cyber-border cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-3 font-ocr text-xs text-terminal-text/85'
                        >
                          <p className='text-terminal-cyan'>
                            <span className='font-ibm text-sm px-2 py-1 bg-terminal-dark cyber-border-sm cyber-border-cyan'>
                              {item.key}
                            </span>{' '}
                            — {item.action}
                          </p>
                        </div>
                      ))}
                    </div>
                    <JumpToDiceButton />
                  </article>
                </div>

                <aside
                  id='dice-roller-section'
                  className='cyber-border cyber-border-cyan bg-terminal-dark/30 backdrop-blur-xl p-4 md:p-6 animate-pulse-glow overflow-x-hidden max-w-full'
                >
                  <p className='font-ocr text-sm text-terminal-text/70 mb-4'>
                    Click dice to add to your pool. Use modifiers and notes as needed.
                  </p>
                  <div className='w-full overflow-x-hidden max-w-full'>
                    <DiceRoller />
                  </div>
                </aside>
              </section>
            </div>
          </section>
        </div>
      </div>
    </ErrorBoundary>
  );
}
