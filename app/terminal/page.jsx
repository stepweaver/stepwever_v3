'use client';

import { Command, Map, MessageSquare, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import Terminal from '@/components/Terminal/Terminal';

const TERMINAL_COPY = {
  hero: {
    title: 'Codex terminal: hands-on mission control.',
    subtitle:
      "This isn't a fake console overlay. It's a tiny ops-style shell wired into my site content so you can explore work, read, and reach out from the same green glow I use for real tooling.",
    ribbon:
      'Runs fully in your browser. No login, no install—just type `help` to start exploring.',
    meta: [
      {
        label: 'Use it for',
        value: 'skimming work, poking at ideas, sending briefs',
      },
      { label: 'Feels like', value: 'a dev console, not a landing page' },
      { label: 'Built with', value: 'Next.js, React, custom CLI engine' },
    ],
  },
  overview: {
    title: 'Why a terminal instead of another scrolling page?',
    paragraphs: [
      "Because I'd rather show you how I think than hide behind marketing copy. The Codex terminal behaves like a small ops console: you can list posts, open retros, and follow prompts that turn fuzzy ideas into concrete project shapes.",
      "Under the hood, it mirrors the way I design real tools: opinionated commands, readable output, and guardrails that keep people oriented. You can't break anything here—but you will get a feel for how I build systems that stay legible even as they grow.",
    ],
  },
  usage: {
    title: 'How to drive it',
    steps: [
      'Start with `help` to see all available commands and get oriented. From there, use `codex` to navigate site content—blog, projects, contact, and utilities.',
      "Jump into `blog`, `projects`, or `community` and use `ls` to see what's there. The prompt path updates so you always know where you are.",
      'Use `cat [number]` to open an item and `grep [tag]` to filter by topic. `pwd` echoes your location, `clear` wipes the scrollback.',
      '`contact` launches a guided brief that asks about your goals, constraints, and timing—so when I reply, we\'re already past the "so what are you looking for?" stage.',
    ],
  },
};

const FEATURE_CARDS = [
  {
    title: 'Guided contact',
    body: 'The `contact` flow asks the right questions up front—goals, constraints, priorities—so my first reply can include options and next steps, not more forms.',
    icon: MessageSquare,
  },
  {
    title: 'Content drill-down',
    body: 'Point the shell at `blog`, `projects`, or `community` to pull up posts, retros, and spotlights. Everything stays in one viewport so you can read, copy, and move on.',
    icon: Map,
  },
  {
    title: 'Command-grade UX',
    body: 'History, autocomplete, dice rollers, weather, and CRT theming keep it fun—but the layout, prompts, and errors are all designed like real tooling.',
    icon: Sparkles,
  },
];

const COMMAND_GUIDE = [
  {
    command: 'codex',
    summary: 'Navigate site content.',
    detail:
      'Opens the directory of site content—blog, projects, utilities, and contact. From here you can branch into specific areas to explore work and ideas.',
  },
  {
    command: 'blog | projects | community',
    summary: 'Browse content by area with familiar CLI verbs.',
    detail:
      'Each "directory" mirrors the public site but stays inside the terminal. Use `ls` to list entries, `cat [number]` to open one, and `grep` to filter by tag.',
  },
  {
    command: 'contact',
    summary: 'Guided intake for potential work.',
    detail:
      "Walks through what you're trying to achieve, what's in the way, and how fast you need to move. The output lands as a structured message in my inbox.",
  },
  {
    command: 'back / cd ..',
    summary: 'One-step escape hatch.',
    detail:
      'Climb a level up the path whenever you want to zoom out of a nested folder without losing state.',
  },
  {
    command: 'help',
    summary: 'Start here—command reference.',
    detail:
      'Prints all available commands and how to use them. This is your starting point to understand what the terminal can do.',
  },
  {
    command: 'clear, theme',
    summary: 'Quality-of-life commands.',
    detail:
      'Tidy the viewport or toggle color schemes if you prefer something softer than full neon.',
  },
];

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
            <header className='space-y-8'>
              <div className='space-y-4'>
                <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl text-terminal-green leading-tight'>
                  {TERMINAL_COPY.hero.title}
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-terminal-text/85 leading-relaxed max-w-5xl'>
                  {TERMINAL_COPY.hero.subtitle}
                </p>
              </div>
              <div className='relative border border-terminal-green/50 px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-terminal-text/90 shadow-[0_0_30px_rgba(0,255,0,0.15)]'>
                <span>{TERMINAL_COPY.hero.ribbon}</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-terminal-green/80'
                  aria-hidden='true'
                ></span>
              </div>
              <div className='grid gap-4 sm:grid-cols-3'>
                {TERMINAL_COPY.hero.meta.map((item) => (
                  <div
                    key={item.label}
                    className='border border-terminal-border/60 p-4 flex flex-col gap-1 font-ocr text-sm text-terminal-text/80'
                  >
                    <span className='text-terminal-green text-xs uppercase tracking-wide'>
                      {item.label}
                    </span>
                    <span className='text-terminal-white text-base'>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </header>

            <section className='grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]'>
              <div className='space-y-10'>
                <article className='space-y-4'>
                  <h2 className='font-ibm text-2xl sm:text-3xl text-terminal-green'>
                    {TERMINAL_COPY.overview.title}
                  </h2>
                  {TERMINAL_COPY.overview.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className='font-ocr text-base text-terminal-text/85 leading-relaxed'
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>

                <div className='grid gap-6'>
                  {FEATURE_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.title}
                        className='border border-terminal-border/60 rounded-lg p-5 space-y-3'
                      >
                        <div className='flex items-center gap-3'>
                          <Icon className='w-5 h-5 text-terminal-green' />
                          <p className='font-ibm text-lg text-terminal-green'>
                            {card.title}
                          </p>
                        </div>
                        <p className='font-ocr text-sm text-terminal-text/80 leading-relaxed'>
                          {card.body}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <article className='space-y-4'>
                  <h3 className='font-ibm text-2xl text-terminal-green'>
                    {TERMINAL_COPY.usage.title}
                  </h3>
                  <ul className='space-y-3 font-ocr text-sm text-terminal-text/85'>
                    {TERMINAL_COPY.usage.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className='border border-terminal-border/40 p-4 leading-relaxed'
                      >
                        {step}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Command className='w-5 h-5 text-terminal-green' />
                    <h3 className='font-ibm text-2xl text-terminal-green'>
                      Command map
                    </h3>
                  </div>
                  <div className='grid gap-4'>
                    {COMMAND_GUIDE.map((item) => (
                      <div
                        key={item.command}
                        className='border border-terminal-border/60 rounded-lg p-4 space-y-1 font-ocr text-sm text-terminal-text/85'
                      >
                        <p className='text-terminal-green'>
                          <span className='font-ibm text-base'>
                            {item.command}
                          </span>{' '}
                          — {item.summary}
                        </p>
                        <p className='text-terminal-text/75'>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className='border border-terminal-border/60 rounded-xl p-4 md:p-6 shadow-[0_0_35px_rgba(255,0,255,0.12)]'>
                <p className='font-ocr text-sm text-terminal-text/70 mb-4'>
                  The shell lives here. Type `help` to start and see all
                  available commands. Use `codex` to navigate site content, then
                  wander through `blog`, `projects`, or `community`. Use `back`
                  to climb up a level whenever you want to come up for air.
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
