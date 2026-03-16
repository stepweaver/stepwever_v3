'use client';

import {
  Command,
  Map,
  BookOpen,
  Sparkles,
  Terminal as TerminalIcon,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import TerminalShell from '@/components/Terminal/TerminalShell';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const Terminal = dynamic(() => import('@/components/Terminal/Terminal'), {
  ssr: false,
  loading: () => <div className='h-full' />,
});

const FEATURE_MODULES = [
  {
    title: 'Resume',
    cmd: 'resume',
    body: 'Experience, education, skills. Or download the PDF.',
    icon: BookOpen,
    tag: 'MOD-01',
  },
  {
    title: 'LLM Chat',
    cmd: 'chat <msg>',
    body: 'Discuss my background with λlambda, a portfolio-native AI trained on my experience.',
    icon: Sparkles,
    tag: 'MOD-02',
  },
  {
    title: 'Codex',
    cmd: 'codex',
    body: 'Browse blog posts, projects, and community contributions.',
    icon: Map,
    tag: 'MOD-03',
  },
];

const COMMAND_GUIDE = [
  { command: 'help', summary: 'Show commands' },
  { command: 'resume', summary: 'View experience' },
  { command: 'chat <msg>', summary: 'Talk to λlambda' },
  { command: 'codex', summary: 'Browse content' },
  { command: 'roll', summary: 'Roll RPG dice' },
  { command: 'weather', summary: 'Check weather' },
  { command: 'cd contact', summary: 'Open contact page' },
  { command: 'cd codex', summary: 'Open Codex' },
  { command: 'cd dice-roller', summary: 'Open dice roller' },
  { command: 'zork', summary: 'Play Zork' },
  { command: 'blackjack', summary: 'Play Blackjack' },
  { command: 'contact', summary: 'Send message' },
  { command: 'clear', summary: 'Clear screen' },
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
        className='w-full px-3 py-2 flex items-center justify-between text-left hover:bg-panel/30 transition-colors'
      >
        <div className='flex items-center gap-2'>
          <Command className='w-3 h-3 text-neon/50' />
          <span className='font-ocr text-xs tracking-[0.2em] text-neon/50 uppercase'>
            System modules
          </span>
        </div>
        <ChevronRight
          className={`w-3 h-3 text-neon/40 transition-transform duration-200 ${
            expanded ? 'rotate-90' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className='px-3 pb-3 motion-safe:animate-[hudFadeIn_0.15s_ease-out]'>
          <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            {COMMAND_GUIDE.map((item) => (
              <div
                key={item.command}
                className='font-ocr text-xs text-neon/50'
              >
                <span className='text-neon/70'>{item.command}</span>
                <span className='text-text/40'> - {item.summary}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TerminalPage() {
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
    return () => {
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <div className='relative h-[calc(100vh-6rem)] flex flex-col overflow-hidden'>
      <BackgroundCanvas />

      <div className='relative z-10 flex flex-col h-full'>
        {/* ── System Header ── */}
        <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <TerminalIcon className='w-3.5 h-3.5 text-neon/60' />
            <span className='font-ocr text-xs tracking-[0.3em] text-neon/50 uppercase'>
              TERM-00
            </span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ibm text-xs text-text/50 hidden sm:inline'>
              λstepweaver terminal
            </span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='font-ocr text-xs text-neon/35 hidden sm:inline'>
              v4.0.0
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
              </span>
              <span className='font-ocr text-xs tracking-[0.15em] text-neon/60 uppercase'>
                Active
              </span>
            </span>
          </div>
        </header>

        {/* ── Mobile expandable brief ── */}
        <MobileBriefBar />

        {/* ── Main Console + Case Study ── */}
        <div className='flex-1 flex flex-col min-h-0'>
          {/* ── Main Console ── */}
          <div className='flex-1 flex flex-col lg:flex-row min-h-0'>
            {/* ── Sidebar: HUD Panels ── */}
            <aside className='hidden lg:flex lg:flex-col lg:w-72 2xl:w-80 shrink-0 border-r border-neon/15 overflow-y-auto'>
              <div className='p-3 space-y-3 flex-1'>
                {/* System Brief */}
                <SidebarPanel label='SYS.BRIEF'>
                  <p className='font-ibm text-lg text-text leading-snug'>
                    Interactive terminal.
                  </p>
                  <p className='font-ocr text-sm text-text/50 leading-relaxed mt-2'>
                    A command-line interface to explore my site. Browse content,
                    launch tools, and chat with an AI assistant.
                  </p>
                  <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                  <p className='font-ocr text-xs text-neon/40 mt-2'>
                    Type <span className='text-neon/65'>help</span> to get
                    started.
                  </p>
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
                            <p className='font-mono text-xs text-accent/45 mt-1'>
                              &gt; {mod.cmd}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Command Reference */}
                <SidebarPanel label='CMD.REF'>
                  <div className='space-y-1.5'>
                    {COMMAND_GUIDE.map((item) => (
                      <div
                        key={item.command}
                        className='flex items-baseline gap-2 font-ocr text-xs'
                      >
                        <code className='text-neon/65 shrink-0 font-ibm text-sm'>
                          {item.command}
                        </code>
                        <span className='text-text/30 truncate'>
                          {item.summary}
                        </span>
                      </div>
                    ))}
                  </div>
                </SidebarPanel>

                {/* System Info */}
                <div className='px-1 space-y-1'>
                  <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                    <span className='w-1 h-1 rounded-full bg-neon/30' />
                    <span>Browser-first interface · Some commands call services</span>
                  </div>
                  <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                    <span className='w-1 h-1 rounded-full bg-neon/30' />
                    <span>Shared AI, contact, weather, and dice tooling</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Terminal Section ── */}
            <section
              id='terminal-section'
              className='flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden'
            >
              {/* Terminal chrome header */}
              <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
                <div className='flex gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 border border-white/10' />
                  <div className='w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 border border-white/10' />
                  <div className='w-2.5 h-2.5 rounded-full bg-[#27ca3f]/70 border border-white/10' />
                </div>
                <span className='font-ocr text-xs tracking-[0.18em] text-neon/40 uppercase'>
                  ~/terminal
                </span>
                <span className='font-ocr text-xs text-text/20 hidden sm:inline'>
                  user@stepweaver.dev
                </span>
              </div>

              {/* Terminal body */}
              <div className='flex-1 min-h-0'>
                <TerminalShell fullPage>
                  <Terminal />
                </TerminalShell>
              </div>
            </section>
          </div>

          {/* ── Case Study Section ── */}
          <section
            id='terminal-case-study'
            className='shrink-0 border-t border-neon/20 bg-panel/70 backdrop-blur-sm px-3 sm:px-5 py-4 overflow-y-auto'
          >
            <div className='max-w-5xl mx-auto space-y-6'>
              <header className='space-y-2'>
                <p className='font-ocr text-[10px] tracking-[0.35em] text-neon/50 uppercase'>
                  Case Study
                </p>
                <h2 className='font-ibm text-2xl sm:text-3xl text-text'>
                  Portfolio Terminal UI
                </h2>
                <p className='font-ocr text-sm text-text/60'>
                  A command-driven interface that turns a typical portfolio into an
                  interactive operating environment for navigation, AI chat, utilities,
                  and small tools.
                </p>
              </header>

              <div className='grid gap-6 lg:grid-cols-[2fr,1.3fr]'>
                <div className='space-y-5'>
                  <div className='hud-panel p-4'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase mb-2'>
                      Overview
                    </p>
                    <p className='font-ibm text-sm text-text/90 leading-relaxed'>
                      I built a terminal-style interface for my portfolio to turn a
                      typical developer site into something more interactive, memorable,
                      and useful. Instead of making visitors click through a stack of
                      static pages, the terminal lets them explore my work through
                      commands, browse content, launch tools, chat with my AI assistant,
                      and move through the site the way I think: through systems, not
                      just screens.
                    </p>
                    <p className='font-ibm text-sm text-text/80 leading-relaxed mt-3'>
                      The result is a browser-first terminal built with Next.js and
                      React that acts as an interface layer across the portfolio.
                      Visitors can view my resume, browse my Codex, launch a
                      portfolio-native AI assistant, send a message through a guided
                      terminal flow, check weather, roll RPG dice, and even play Zork
                      or Blackjack.
                    </p>
                  </div>

                  <div className='hud-panel p-4 space-y-3'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      System & Features
                    </p>
                    <p className='font-ibm text-sm text-text/85 leading-relaxed'>
                      Under the hood, the terminal is driven by a modular command
                      engine, special command modes, reusable data utilities, and shared
                      integrations with the rest of the site. The chat command is wired
                      into the same protected AI backend that powers my website chat
                      surfaces, with channel-aware behavior so λlambda responds
                      differently in the terminal than it does in the widget or
                      full-page chat. The contact command walks users through a guided
                      message flow and submits directly to the site’s contact API. The
                      Codex mode lets users browse posts like a small file system,
                      including listing entries, opening posts, filtering by hashtag,
                      and navigating back out.
                    </p>
                  </div>

                  <div className='hud-panel p-4 space-y-3'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      Shared Integrations
                    </p>
                    <p className='font-ibm text-sm text-text/85 leading-relaxed'>
                      I used the terminal as a bridge into adjacent portfolio features.
                      The <span className='font-mono text-text/90'>roll</span> command
                      connects to the same dice logic used by my standalone dice roller
                      app, which parses standard RPG notation and prefers{' '}
                      <span className='font-mono text-text/90'>
                        crypto.getRandomValues()
                      </span>{' '}
                      when available in the browser. The weather command supports
                      geolocation, city lookup, forecast mode, and multi-match selection
                      handling. Together, those features help the terminal feel like a
                      real environment rather than a themed menu.
                    </p>
                    <p className='font-ibm text-sm text-text/80 leading-relaxed'>
                      There is also real security and defensive thinking in the AI
                      layer. The chat route uses same-origin checks, rate limiting,
                      input sanitization, prompt-injection filtering, server-side system
                      prompts, request timeouts, and Groq-first/OpenAI-fallback provider
                      logic. That makes λlambda feel like part of the product, not a raw
                      client-side API key demo.
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='hud-panel p-4 space-y-2'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      Portfolio Card Summary
                    </p>
                    <p className='font-ibm text-sm text-text/85 leading-relaxed'>
                      Portfolio Terminal UI — A command-driven portfolio interface built
                      with Next.js and React. Visitors can browse my resume and Codex,
                      chat with λlambda, send messages through a guided terminal flow,
                      check weather, roll RPG dice, and launch small interactive
                      features from one branded command surface. It is part portfolio,
                      part interface experiment, and part proof that I like building
                      systems people can actually explore.
                    </p>
                  </div>

                  <div className='hud-panel p-4 space-y-2'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      UX Notes
                    </p>
                    <p className='font-ibm text-sm text-text/85 leading-relaxed'>
                      From a UX standpoint, I focused on making it feel cinematic
                      without losing usability. The interface supports command history,
                      keyboard navigation, input focus management, sanitized rich
                      output, mobile-aware layout handling, and accessibility help text
                      for keyboard users. A custom boot sequence and a
                      Terminator-inspired visual layer push the terminal further into
                      branded identity instead of a generic “hacker UI.”
                    </p>
                  </div>

                  <div className='hud-panel p-4 space-y-2'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      Tech Stack
                    </p>
                    <ul className='font-ocr text-xs text-text/70 space-y-1.5'>
                      <li>Next.js 15, React 19, Tailwind CSS</li>
                      <li>Modular terminal command architecture with mode-based flows</li>
                      <li>DOMPurify for sanitized output</li>
                      <li>
                        Protected AI routing with Groq and OpenAI support via a shared{' '}
                        <span className='font-mono text-text/90'>/api/chat</span> route
                      </li>
                      <li>OpenWeather integration for weather lookup and forecasts</li>
                      <li>
                        Shared dice engine used across both the terminal and the full
                        dice roller
                      </li>
                    </ul>
                  </div>

                  <div className='hud-panel p-4 space-y-2'>
                    <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
                      Why It Matters
                    </p>
                    <p className='font-ibm text-sm text-text/85 leading-relaxed'>
                      This project shows how I like to build: practical systems wrapped
                      in strong presentation. It combines interface design, command
                      architecture, routing, API integration, AI orchestration, and
                      reusable utilities in one cohesive product. It is creative, but
                      it is also structured—an example of taking something familiar, a
                      portfolio, and building the more interesting interaction model
                      hiding inside it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Status Bar ── */}
        <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
          <span className='font-ocr text-xs text-neon/45 whitespace-nowrap'>
            &gt; help
          </span>
          <span className='text-neon/15'>│</span>
          <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap'>
            Session active
          </span>
          <span className='text-neon/15 hidden sm:inline'>│</span>
          <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
            Browser-first interface
          </span>
          <span className='text-neon/15 hidden md:inline'>│</span>
          <span className='font-ocr text-xs text-text/20 uppercase whitespace-nowrap hidden md:inline'>
            Selective server calls
          </span>
        </footer>
      </div>
    </div>
  );
}
