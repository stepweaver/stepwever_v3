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
    body: 'Experience, education, skills — or download the PDF.',
    icon: BookOpen,
    tag: 'MOD-01',
  },
  {
    title: 'LLM Chat',
    cmd: 'chat <msg>',
    body: 'Discuss my background with an AI trained on my experience.',
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
  { command: 'chat <msg>', summary: 'Talk to LLM' },
  { command: 'codex', summary: 'Browse content' },
  { command: 'contact', summary: 'Send message' },
  { command: 'clear', summary: 'Clear screen' },
];

function SidebarPanel({ children, label, className = '' }) {
  return (
    <div className={`hud-panel p-3 ${className}`}>
      {label && (
        <p className='font-ocr text-[9px] tracking-[0.25em] text-neon/45 uppercase mb-2'>
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
          <span className='font-ocr text-[10px] tracking-[0.2em] text-neon/50 uppercase'>
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
        <div className='px-3 pb-3 space-y-2 motion-safe:animate-[hudFadeIn_0.15s_ease-out]'>
          <div className='grid grid-cols-3 gap-2'>
            {FEATURE_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.tag}
                  className='flex items-center gap-1.5 px-2 py-1.5 rounded-sm bg-panel/30 border border-neon/8'
                >
                  <Icon className='w-3 h-3 text-neon/60 shrink-0' />
                  <div className='min-w-0'>
                    <p className='font-ibm text-[10px] text-neon/80 truncate'>
                      {mod.title}
                    </p>
                    <p className='font-mono text-[9px] text-accent/40'>
                      {mod.cmd}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='w-full h-px bg-gradient-to-r from-neon/15 via-neon/8 to-transparent' />
          <div className='grid grid-cols-2 gap-x-4 gap-y-1.5 px-1'>
            {COMMAND_GUIDE.map((item) => (
              <span key={item.command} className='font-ocr text-[9px]'>
                <span className='text-neon/60'>{item.command}</span>
                <span className='text-text/30'> — {item.summary}</span>
              </span>
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
            <span className='font-ocr text-[10px] tracking-[0.3em] text-neon/50 uppercase'>
              TERM-00
            </span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ibm text-xs text-text/50 hidden sm:inline'>
              λstepweaver terminal
            </span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='font-ocr text-[10px] text-neon/35 hidden sm:inline'>
              v3.8.0
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
              </span>
              <span className='font-ocr text-[10px] tracking-[0.15em] text-neon/60 uppercase'>
                Active
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
                  Interactive terminal.
                </p>
                <p className='font-ocr text-[11px] text-text/50 leading-relaxed mt-2'>
                  A command-line interface to explore my site. Browse content,
                  chat with an AI, and more.
                </p>
                <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                <p className='font-ocr text-[10px] text-neon/40 mt-2'>
                  Type <span className='text-neon/65'>help</span> to get
                  started.
                </p>
              </SidebarPanel>

              {/* Feature Modules */}
              <div>
                <p className='font-ocr text-[9px] tracking-[0.25em] text-neon/40 uppercase px-1 mb-2'>
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
                          <p className='font-ocr text-[10px] text-text/40 leading-snug mt-0.5'>
                            {mod.body}
                          </p>
                          <p className='font-mono text-[10px] text-accent/45 mt-1'>
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
                      className='flex items-baseline gap-2 font-ocr text-[10px]'
                    >
                      <code className='text-neon/65 shrink-0 font-ibm text-[11px]'>
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
                <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>Browser-based &middot; No data sent to server</span>
                </div>
                <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>Runs locally in your browser</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Terminal Section ── */}
          <section
            id='terminal-section'
            className='flex-1 min-h-0 flex flex-col'
          >
            {/* Terminal chrome header */}
            <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
              <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 border border-white/10' />
                <div className='w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 border border-white/10' />
                <div className='w-2.5 h-2.5 rounded-full bg-[#27ca3f]/70 border border-white/10' />
              </div>
              <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
                ~/terminal
              </span>
              <span className='font-ocr text-[10px] text-text/20 hidden sm:inline'>
                user@stepweaver.dev
              </span>
            </div>

            {/* Terminal body */}
            <div className='flex-1 min-h-0'>
              <Terminal />
            </div>
          </section>
        </div>

        {/* ── Status Bar ── */}
        <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
          <span className='font-ocr text-[10px] text-neon/45 whitespace-nowrap'>
            &gt; help
          </span>
          <span className='text-neon/15'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap'>
            Session active
          </span>
          <span className='text-neon/15 hidden sm:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
            Local runtime
          </span>
          <span className='text-neon/15 hidden md:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/20 uppercase whitespace-nowrap hidden md:inline'>
            No telemetry
          </span>
        </footer>
      </div>
    </div>
  );
}
