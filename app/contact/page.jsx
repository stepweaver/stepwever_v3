'use client';

import Link from 'next/link';
import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Mail,
  Send,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { SiBluesky, SiGithub } from 'react-icons/si';
import GlitchLambda from '@/components/ui/GlitchLambda';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const ContactForm = dynamic(() => import('@/components/ui/ContactForm'));

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/stepweaver',
    icon: SiGithub,
    external: true,
    tag: 'NET-01',
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/stepweaver.dev',
    icon: SiBluesky,
    external: true,
    tag: 'NET-02',
  },
  {
    label: 'Terminal',
    href: '/terminal',
    icon: GlitchLambda,
    external: false,
    tag: 'NET-03',
    isTerminal: true,
  },
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

function MobileContactBrief() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='lg:hidden shrink-0 border-b border-neon/15'>
      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full px-3 py-2 flex items-center justify-between text-left hover:bg-panel/30 transition-colors'
      >
        <div className='flex items-center gap-2'>
          <Globe className='w-3 h-3 text-neon/50' />
          <span className='font-ocr text-[10px] tracking-[0.2em] text-neon/50 uppercase'>
            Contact info
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
          <div className='flex items-center gap-2'>
            <Mail className='w-3 h-3 text-neon/60 shrink-0' />
            <Link
              href='mailto:stephen@stepweaver.dev'
              className='font-ocr text-[11px] text-neon/80 hover:text-neon transition-colors'
            >
              stephen@stepweaver.dev
            </Link>
          </div>
          <div className='w-full h-px bg-gradient-to-r from-neon/15 via-neon/8 to-transparent' />
          <div className='flex flex-wrap gap-3'>
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              const sharedProps = link.external
                ? { target: '_blank', rel: 'noreferrer' }
                : {};
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className='inline-flex items-center gap-1.5 font-ocr text-[10px] text-neon/60 hover:text-neon transition-colors'
                  {...sharedProps}
                >
                  {link.isTerminal ? (
                    <Icon className='text-neon/60 text-xs' size='small' aria-hidden />
                  ) : (
                    <Icon className='w-3 h-3' aria-hidden />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
          <p className='font-ocr text-[9px] text-text/30'>
            Response time: typically within 24–48h
          </p>
        </div>
      )}
    </div>
  );
}

function ContactPage() {
  return (
    <div className='relative h-[calc(100vh-6rem)] flex flex-col overflow-hidden'>
      <BackgroundCanvas />

      <div className='relative z-10 flex flex-col h-full'>
        {/* ── System Header ── */}
        <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <Send className='w-3.5 h-3.5 text-neon/60' />
            <span className='font-ocr text-[10px] tracking-[0.3em] text-neon/50 uppercase'>
              COMMS-00
            </span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ibm text-xs text-text/50 hidden sm:inline'>
              λstepweaver comms
            </span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='inline-flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
              </span>
              <span className='font-ocr text-[10px] tracking-[0.15em] text-neon/60 uppercase'>
                Accepting messages
              </span>
            </span>
          </div>
        </header>

        {/* ── Mobile expandable brief ── */}
        <MobileContactBrief />

        {/* ── Main Console ── */}
        <div className='flex-1 flex flex-col lg:flex-row min-h-0'>
          {/* ── Sidebar: HUD Panels ── */}
          <aside className='hidden lg:flex lg:flex-col lg:w-72 2xl:w-80 shrink-0 border-r border-neon/15 overflow-y-auto'>
            <div className='p-3 space-y-3 flex-1'>
              {/* System Brief */}
              <SidebarPanel label='SYS.BRIEF'>
                <p className='font-ibm text-lg text-text leading-snug'>
                  Let&apos;s connect.
                </p>
                <p className='font-ocr text-[11px] text-text/50 leading-relaxed mt-2'>
                  Have a question, opportunity, or just want to say hello? My
                  inbox is always open.
                </p>
                <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                <p className='font-ocr text-[10px] text-neon/40 mt-2'>
                  I typically respond within{' '}
                  <span className='text-neon/65'>24–48 hours</span>.
                </p>
              </SidebarPanel>

              {/* Direct Link */}
              <SidebarPanel label='DIRECT.LINK'>
                <Link
                  href='mailto:stephen@stepweaver.dev'
                  className='group flex items-center gap-2.5 px-2 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                >
                  <Mail className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                  <div className='min-w-0'>
                    <p className='font-ibm text-xs text-neon/80 group-hover:text-neon transition-colors'>
                      Email
                    </p>
                    <p className='font-ocr text-[10px] text-text/40 truncate'>
                      stephen@stepweaver.dev
                    </p>
                  </div>
                </Link>
              </SidebarPanel>

              {/* Network */}
              <div>
                <p className='font-ocr text-[9px] tracking-[0.25em] text-neon/40 uppercase px-1 mb-2'>
                  Network
                </p>
                <div className='space-y-1.5'>
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    const sharedProps = link.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {};
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className='group flex items-center gap-2.5 px-3 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                        {...sharedProps}
                      >
                        {link.isTerminal ? (
                          <Icon
                            className='text-neon/55 text-sm shrink-0 group-hover:text-neon/80 transition-colors'
                            size='small'
                            aria-hidden
                          />
                        ) : (
                          <Icon className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                        )}
                        <div className='flex items-baseline gap-2 min-w-0'>
                          <p className='font-ibm text-xs text-neon/80 group-hover:text-neon transition-colors'>
                            {link.label}
                          </p>
                          <span className='font-ocr text-[8px] text-neon/25'>
                            {link.tag}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* System Info */}
              <div className='px-1 space-y-1 mt-auto'>
                <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>Messages are encrypted in transit</span>
                </div>
                <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>No spam &middot; No tracking</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Form Section ── */}
          <section className='flex-1 min-h-0 flex flex-col'>
            {/* Form chrome header */}
            <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Mail className='w-3 h-3 text-neon/40' />
                <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
                  New message
                </span>
              </div>
              <span className='font-ocr text-[10px] text-text/20 hidden sm:inline'>
                CONTACT-01
              </span>
            </div>

            {/* Form body */}
            <div className='flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8'>
              <div className='max-w-2xl mx-auto'>
                <ContactForm />
              </div>
            </div>
          </section>
        </div>

        {/* ── Status Bar ── */}
        <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
          <span className='font-ocr text-[10px] text-neon/45 whitespace-nowrap'>
            &gt; contact
          </span>
          <span className='text-neon/15'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap'>
            Form ready
          </span>
          <span className='text-neon/15 hidden sm:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
            Encrypted
          </span>
          <span className='text-neon/15 hidden md:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/20 uppercase whitespace-nowrap hidden md:inline'>
            Response: 24–48h
          </span>
        </footer>
      </div>
    </div>
  );
}

export default memo(ContactPage);
