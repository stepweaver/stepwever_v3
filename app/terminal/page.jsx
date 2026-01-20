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

// Lazy load heavy components
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const Terminal = dynamic(() => import('@/components/Terminal/Terminal'), {
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <p className='text-terminal-text font-ocr'>Loading terminal...</p>
    </div>
  ),
});

const TERMINAL_COPY = {
  hero: {
    title: 'Interactive terminal.',
    subtitle:
      "A command-line interface to explore my site. Browse my blog, projects, and more!",
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
      'Use `codex` to enter content mode, then explore `blog`, `projects`, or `community`.',
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
  { command: 'codex', summary: 'Browse blog posts, projects, and community content.' },
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
      className='xl:hidden w-full mt-6 py-3 px-4 cyber-border-sm cyber-border-green bg-terminal-dark/30 backdrop-blur-xl hover:bg-terminal-dark/50 text-terminal-green font-ocr text-sm transition-all duration-200 hover:border-terminal-green hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] flex items-center justify-center gap-2'
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
        <section className='w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
            <header className='space-y-6'>
              <div className='space-y-4'>
                <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl text-terminal-green leading-tight'>
                  {TERMINAL_COPY.hero.title}
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-terminal-text/85 leading-relaxed max-w-5xl'>
                  {TERMINAL_COPY.hero.subtitle}
                </p>
              </div>
              <div className='relative cyber-border cyber-border-green bg-terminal-dark/20 backdrop-blur-xl px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-terminal-text/90 shadow-[0_0_30px_rgba(0,255,0,0.15)]'>
                <span>{TERMINAL_COPY.hero.ribbon}</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-terminal-green/80'
                  aria-hidden='true'
                ></span>
              </div>
            </header>

            <section className='grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1.8fr)]'>
              <div className='space-y-8'>
                <article className='space-y-3'>
                  <h2 className='font-ibm text-2xl sm:text-3xl text-terminal-green'>
                    {TERMINAL_COPY.overview.title}
                  </h2>
                  <p className='font-ocr text-sm text-terminal-text/85 leading-relaxed'>
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
                        className='cyber-border cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-4 space-y-2'
                      >
                        <div className='flex items-center gap-2'>
                          <Icon className='w-4 h-4 text-terminal-green' />
                          <p className='font-ibm text-base text-terminal-green'>
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
                  <h3 className='font-ibm text-xl text-terminal-green'>
                    {TERMINAL_COPY.usage.title}
                  </h3>
                  <ul className='space-y-2 font-ocr text-xs text-terminal-text/85'>
                    {TERMINAL_COPY.usage.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className='cyber-border-sm cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-3 leading-relaxed'
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                  <JumpToTerminalButton />
                </article>

                <article className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <Command className='w-4 h-4 text-terminal-green' />
                    <h3 className='font-ibm text-xl text-terminal-green'>
                      Commands
                    </h3>
                  </div>
                  <div className='grid gap-3'>
                    {COMMAND_GUIDE.map((item) => (
                      <div
                        key={item.command}
                        className='cyber-border cyber-border-border bg-terminal-dark/30 backdrop-blur-xl p-3 font-ocr text-xs text-terminal-text/85'
                      >
                        <p className='text-terminal-green'>
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
                className='cyber-border cyber-border-green bg-transparent p-4 md:p-6 animate-pulse-glow'
              >
                <p className='font-ocr text-sm text-terminal-text/70 mb-4'>
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
