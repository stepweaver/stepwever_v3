'use client';

import Link from 'next/link';
import { memo } from 'react';
import { ArrowUpRight, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { SiBluesky, SiGithub } from 'react-icons/si';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ContactForm from '@/components/ui/ContactForm';

const CONTACT_COPY = {
  hero: {
    title: 'Ready to get started?',
    subtitle: "Reach out. Let's ship it.",
    ribbon: "Have questions? I'm on comms and ready to assist.",
  },
  helpCta: {
    title: 'Need fast answers?',
    body: 'Browse the services breakdown, play with the terminal, or explore recent work while you wait on a reply.',
    link: { href: '/services', label: 'Explore services' },
  },
};

const CONTACT_CHANNELS = [
  {
    title: 'Email the studio',
    description: 'Best for proposals, partnership pitches, and press.',
    icon: Mail,
    entries: [
      {
        label: 'info@stepweaver.dev',
        href: 'mailto:info@stepweaver.dev',
        helper: 'Primary inbox (monitored daily).',
      },
    ],
  },
  {
    title: 'Project comms',
    description:
      'Want to chat through a scope? Spin up the in-browser terminal.',
    icon: MessageSquare,
    entries: [
      {
        label: 'Launch the terminal',
        href: '/terminal',
        helper: 'Use the `contact` command to send structured briefs.',
      },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/stepweaver',
    icon: SiGithub,
    external: true,
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/stepweaver.dev',
    icon: SiBluesky,
    external: true,
  },
  {
    label: 'Terminal',
    href: '/terminal',
    icon: Sparkles,
    external: false,
  },
];

function ContactPage() {
  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
          <div className='w-full max-w-6xl mx-auto flex flex-col gap-12'>
            <header className='space-y-6'>
              <div className='space-y-4'>
                <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-terminal-green leading-tight'>
                  {CONTACT_COPY.hero.title}
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-terminal-text/80 max-w-3xl leading-relaxed'>
                  {CONTACT_COPY.hero.subtitle}
                </p>
              </div>
              <div className='relative border border-terminal-green/50 px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-terminal-text/90 shadow-[0_0_30px_rgba(0,255,0,0.15)]'>
                <span>{CONTACT_COPY.hero.ribbon}</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-terminal-green/80'
                  aria-hidden='true'
                ></span>
              </div>
            </header>

            <section className='grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]'>
              <div className='space-y-8'>
                <ContactForm />
              </div>

              <aside className='space-y-6'>
                {CONTACT_CHANNELS.map((channel) => (
                  <div
                    key={channel.title}
                    className='border border-terminal-border/60 rounded-lg p-5 space-y-3'
                  >
                    <div className='flex items-center gap-3'>
                      <channel.icon className='w-5 h-5 text-terminal-green' />
                      <div>
                        <p className='font-ibm text-lg text-terminal-green'>
                          {channel.title}
                        </p>
                        <p className='font-ocr text-xs text-terminal-text/70'>
                          {channel.description}
                        </p>
                      </div>
                    </div>
                    <ul className='space-y-2 font-ocr text-sm text-terminal-text/90'>
                      {channel.entries.map((entry) => (
                        <li key={entry.label}>
                          {entry.href ? (
                            <Link
                              href={entry.href}
                              className='inline-flex items-center gap-2 text-terminal-green hover:text-terminal-white transition-colors'
                              target={
                                entry.href.startsWith('http')
                                  ? '_blank'
                                  : undefined
                              }
                              rel={
                                entry.href.startsWith('http')
                                  ? 'noreferrer'
                                  : undefined
                              }
                            >
                              {entry.label}
                              <ArrowUpRight className='w-3.5 h-3.5' />
                            </Link>
                          ) : (
                            <span className='text-terminal-green'>
                              {entry.label}
                            </span>
                          )}
                          <p className='text-terminal-text/60 text-xs'>
                            {entry.helper}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className='border border-terminal-border/60 rounded-lg p-5 space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Sparkles className='w-5 h-5 text-terminal-green' />
                    <p className='font-ibm text-xl text-terminal-green'>
                      {CONTACT_COPY.helpCta.title}
                    </p>
                  </div>
                  <p className='font-ocr text-sm text-terminal-text/80'>
                    {CONTACT_COPY.helpCta.body}
                  </p>
                  <Link
                    href={CONTACT_COPY.helpCta.link.href}
                    className='inline-flex items-center gap-2 font-ocr text-sm text-terminal-green hover:text-terminal-white transition-colors'
                  >
                    {CONTACT_COPY.helpCta.link.label}
                    <ArrowUpRight className='w-4 h-4' />
                  </Link>
                </div>
              </aside>
            </section>

            <footer className='border-t border-terminal-border/50 pt-8 flex flex-wrap gap-4 md:items-center md:justify-between'>
              <div className='flex flex-wrap gap-4'>
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  const sharedProps = link.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {};
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className='inline-flex items-center gap-2 font-ocr text-sm text-terminal-green hover:text-terminal-white transition-colors'
                      {...sharedProps}
                    >
                      <Icon className='w-4 h-4' />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(ContactPage);
