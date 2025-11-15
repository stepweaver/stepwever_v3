'use client';

import { Command, Map, MessageSquare, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import Terminal from '@/components/Terminal/Terminal';

const TERMINAL_COPY = {
  hero: {
    title: 'Codex terminal: always-on mission control.',
    subtitle:
      'An interactive CLI that mirrors the on-call consoles I use in production—except this one lets prospective partners explore projects, content, and contact workflows without leaving the neon shell.',
    ribbon: 'Runs in-browser, powered by Next.js + streamed I/O. Zero page reloads.',
    meta: [
      { label: 'Stacks mirrored', value: 'Blog • Projects • Community' },
      { label: 'Guided ops', value: 'contact, weather, dice, utilities' },
      { label: 'Latency budget', value: '<120ms echo target' },
    ],
  },
  overview: {
    title: 'Why build a terminal for a studio site?',
    paragraphs: [
      'Because experimentation beats marketing copy. The Codex terminal lets you poke at real data, skim curated references, and send structured briefs without waiting on static forms.',
      'It also acts as a living spec for how I design operational tooling: opinionated, legible, and multiplayer-friendly. Every interaction is logged, commands are namespaced, and nothing is hidden behind menus.',
    ],
  },
  usage: {
    title: 'How to drive it',
    steps: [
      'Launch with `codex` — that command is the root directory. Everything branches from there.',
      'Drill into `blog`, `projects`, or `community` to browse content streams. The prompt updates so you always know where you are.',
      'Use `ls`, `cat [number]`, and `grep [tag]` for search + detail views. `pwd` mirrors your current location, `clear` resets the buffer.',
      'Dispatch `contact` when you are ready to send a structured brief. The assistant walks you through scope, budget, and urgency.',
    ],
  },
};

const FEATURE_CARDS = [
  {
    title: 'Guided contact',
    body: 'The `contact` macro walks through project scope, constraints, and next steps so I can respond with actionable diagnostics.',
    icon: MessageSquare,
  },
  {
    title: 'Content drill-down',
    body: 'Use `blog`, `projects`, or `community` to surface curated posts, project retros, and partner spotlights pulled straight from the Codex API.',
    icon: Map,
  },
  {
    title: 'Command-grade UX',
    body: 'Autocomplete, history, weather, dice rollers, and neon CRT theming make the shell feel like real tooling—not a gimmick.',
    icon: Sparkles,
  },
];

const COMMAND_GUIDE = [
  {
    command: 'codex',
    summary: 'Boot sequence + root directory.',
    detail: 'Lists every available category. Think of it as `~/codex` with read-only knowledge mounted.',
  },
  {
    command: 'blog | projects | community',
    summary: 'Category deep-dives with `ls`, `cat`, and `grep` support.',
    detail: 'Each directory mirrors the public site but stays inside the terminal so you can skim and copy without losing focus.',
  },
  {
    command: 'contact',
    summary: 'Guided project brief.',
    detail: 'Launches an interactive prompt that structures goals, constraints, and timelines into a ready-to-send message.',
  },
  {
    command: 'back / cd ..',
    summary: 'Single-step escape hatch.',
    detail: 'Returns you to the parent directory so you never get lost while exploring nested feeds.',
  },
  {
    command: 'clear, help, theme',
    summary: 'Quality-of-life commands.',
    detail: 'Reset the viewport, print available actions, or toggle neon palettes without refreshing.',
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
                <span className='absolute inset-y-0 left-0 w-1 bg-terminal-green/80' aria-hidden='true'></span>
              </div>
              <div className='grid gap-4 sm:grid-cols-3'>
                {TERMINAL_COPY.hero.meta.map((item) => (
                  <div
                    key={item.label}
                    className='border border-terminal-border/60 p-4 flex flex-col gap-1 font-ocr text-sm text-terminal-text/80'
                  >
                    <span className='text-terminal-green text-xs uppercase tracking-wide'>{item.label}</span>
                    <span className='text-terminal-white text-base'>{item.value}</span>
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
                    <p key={idx} className='font-ocr text-base text-terminal-text/85 leading-relaxed'>
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
                          <p className='font-ibm text-lg text-terminal-green'>{card.title}</p>
                        </div>
                        <p className='font-ocr text-sm text-terminal-text/80 leading-relaxed'>{card.body}</p>
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
                      <li key={idx} className='border border-terminal-border/40 p-4 leading-relaxed'>
                        {step}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Command className='w-5 h-5 text-terminal-green' />
                    <h3 className='font-ibm text-2xl text-terminal-green'>Command map</h3>
                  </div>
                  <div className='grid gap-4'>
                    {COMMAND_GUIDE.map((item) => (
                      <div
                        key={item.command}
                        className='border border-terminal-border/60 rounded-lg p-4 space-y-1 font-ocr text-sm text-terminal-text/85'
                      >
                        <p className='text-terminal-green'>
                          <span className='font-ibm text-base'>{item.command}</span> — {item.summary}
                        </p>
                        <p className='text-terminal-text/75'>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className='border border-terminal-border/60 rounded-xl p-4 md:p-6 shadow-[0_0_35px_rgba(255,0,255,0.12)]'>
                <p className='font-ocr text-sm text-terminal-text/70 mb-4'>
                  Terminal output lives here. Type `codex` to begin, then explore with `blog`, `projects`, or `community`. Use
                  `back` whenever you need daylight.
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
