'use client';

import {
  Command,
  Map,
  BookOpen,
  Sparkles,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { HUDPanel } from '@/components/ui/HUDPanel';

// Lazy load heavy components
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const Terminal = dynamic(() => import('@/components/Terminal/Terminal'), {
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
        <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>LINK ESTABLISHED...</div>
        <div className='mt-4 space-y-3'>
          <div className='h-4 bg-neon/10 w-3/4' />
          <div className='h-4 bg-neon/10 w-1/2' />
          <div className='h-4 bg-neon/10 w-2/3' />
        </div>
      </div>
    </div>
  ),
});

const TERMINAL_COPY = {
  hero: {
    title: 'Interactive terminal.',
    subtitle:
      "A command-line interface to explore my site. Browse my blog and more!",
    ribbon:
      'Runs fully in your browser. Type `help` to start.',
  },
  overview: {
    title: 'Why a terminal?',
    text: "Because I spend most of my day in one. This is how I think and work — opinionated commands, readable output, and a bit of fun. It's also a chance to show off some skills while you explore my content.",
  },
  usage: {
    title: 'Quick start',
    steps: [
      'Type `help` to see available commands.',
      'Use `codex` to enter content mode and browse posts by hashtags and dates.',
      'Use `ls` to list items and `cat [number]` to read. `back` climbs up a level.',
    ],
  },
};

const FEATURE_CARDS = [
  {
    title: 'Interactive resume',
    body: 'Type `resume` to explore my experience, education, and skills — or download the PDF directly.',
    icon: BookOpen,
  },
  {
    title: 'Chat with an LLM',
    body: 'Use `chat <message>` to discuss my background with an AI trained on my experience.',
    icon: Sparkles,
  },
  {
    title: 'Content exploration',
    body: 'Use `codex` to browse my blog posts, projects, and community contributions.',
    icon: Map,
  },
];

const COMMAND_GUIDE = [
  { command: 'help', summary: 'Show available commands.' },
  { command: 'resume', summary: 'View experience, education, skills, or download PDF.' },
  { command: 'chat <message>', summary: 'Discuss Stephen\'s experience with an LLM.' },
  { command: 'codex', summary: 'Browse blog (hashtags and dates).' },
  { command: 'contact', summary: 'Send a message to Stephen.' },
  { command: 'back', summary: 'Exit current mode.' },
];

const JumpToTerminalButton = () => {
  const scrollToTerminal = () => {
    const terminal = document.getElementById('terminal-section');
    if (terminal) {
      terminal.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the terminal input after a brief delay
      setTimeout(() => {
        const terminalInput = terminal.querySelector('input[type="text"]');
        if (terminalInput) {
          terminalInput.focus();
        }
      }, 500);
    }
  };

  return (
    <button
      onClick={scrollToTerminal}
      className='xl:hidden w-full mt-6 py-3 px-4 border-2 border-neon rounded-sm bg-panel/50 backdrop-blur-xl hover:bg-neon/10 text-neon font-ocr text-sm transition-all duration-200 flex items-center justify-center gap-2'
      aria-label='Jump to terminal'
    >
      <TerminalIcon className='w-4 h-4' />
      <span>Jump to terminal</span>
    </button>
  );
};

export default function TerminalPage() {
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
            <HUDPanel
              title={TERMINAL_COPY.hero.title}
              id='TERM-00'
              className='p-6 md:p-8'
            >
              <p className='font-ocr text-base sm:text-lg md:text-xl text-text/85 leading-relaxed max-w-5xl mb-4'>
                {TERMINAL_COPY.hero.subtitle}
              </p>
              <div className='relative border border-neon/30 rounded-sm bg-panel/50 backdrop-blur-xl px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-text/90'>
                <span>{TERMINAL_COPY.hero.ribbon}</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-neon/80 rounded-l-sm'
                  aria-hidden='true'
                />
              </div>
            </HUDPanel>

            <section className='grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1.8fr)]'>
              <div className='space-y-8'>
                <article className='space-y-3'>
                  <h2 className='font-ibm text-2xl sm:text-3xl text-neon'>
                    {TERMINAL_COPY.overview.title}
                  </h2>
                  <p className='font-ocr text-sm text-text/85 leading-relaxed'>
                    {TERMINAL_COPY.overview.text}
                  </p>
                  <JumpToTerminalButton />
                </article>

                <div className='grid gap-4'>
                  {FEATURE_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.title}
                        className='border border-neon/20 rounded-sm bg-panel/50 backdrop-blur-xl p-4 space-y-2'
                      >
                        <div className='flex items-center gap-2'>
                          <Icon className='w-4 h-4 text-neon' />
                          <p className='font-ibm text-base text-neon'>
                            {card.title}
                          </p>
                        </div>
                        <p className='font-ocr text-xs text-text/80 leading-relaxed'>
                          {card.body}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <article className='space-y-3'>
                  <h3 className='font-ibm text-xl text-neon'>
                    {TERMINAL_COPY.usage.title}
                  </h3>
                  <ul className='space-y-2 font-ocr text-xs text-text/85'>
                    {TERMINAL_COPY.usage.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className='border border-neon/20 rounded-sm bg-panel/50 backdrop-blur-xl p-3 leading-relaxed'
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                  <JumpToTerminalButton />
                </article>

                <article className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Command className='w-4 h-4 text-neon' />
                    <h3 className='font-ibm text-xl text-neon'>
                      Commands
                    </h3>
                  </div>
                  <div className='grid gap-3'>
                    {COMMAND_GUIDE.map((item) => (
                      <div
                        key={item.command}
                        className='border border-neon/20 rounded-sm bg-panel/50 backdrop-blur-xl p-3 font-ocr text-xs text-text/85'
                      >
                        <p className='text-neon'>
                          <span className='font-ibm text-sm'>
                            {item.command}
                          </span>{' '}
                          — {item.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                  <JumpToTerminalButton />
                </article>
              </div>

              <aside
                id='terminal-section'
                className='hud-panel relative overflow-hidden p-4 md:p-6'
              >
                <p className='font-ocr text-sm text-text/70 mb-4'>
                  Type `help` to see commands. Use `codex` to navigate content.
                </p>
                <div className='w-full'>
                  <Terminal />
                </div>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
