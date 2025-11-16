'use client';

import Link from 'next/link';
import { memo } from 'react';
import { ArrowUpRight, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { SiBluesky, SiGithub } from 'react-icons/si';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ContactForm from '@/components/ui/ContactForm';
import GlitchLambda from '@/components/ui/GlitchLambda';

const CONTACT_COPY = {
  hero: {
    title: 'Initiate contact sequence.',
    subtitle:
      'Submit a briefing and I’ll return with diagnostics & execution options.',
    ribbon: 'Comms online. Packet loss: 0%. Ready when you are.',
  },
  helpCta: {
    title: 'Want answers now?',
    body: 'Browse services, explore recent builds, or fire up the terminal to test ideas while you wait for a reply.',
    link: { href: '/services', label: 'View services' },
  },
};

const CONTACT_CHANNELS = [
  {
    title: 'Email the studio',
    description:
      'Best for scoped projects, detailed briefs, partnership outreach, or anything requiring more than a few sentences.',
    icon: Mail,
    entries: [
      {
        label: 'info@stepweaver.dev',
        href: 'mailto:info@stepweaver.dev',
        helper: 'Checked daily. Expect a thoughtful, actionable response.',
      },
    ],
  },
  {
    title: 'Project comms',
    description:
      'Want to talk through your idea before the form? Use the interactive terminal to send a structured brief.',
    icon: MessageSquare,
    entries: [
      {
        label: 'Launch the terminal',
        href: '/terminal',
        helper: 'The contact command guides you step-by-step.',
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
    iconProps: { className: 'w-4 h-4' },
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/stepweaver.dev',
    icon: SiBluesky,
    external: true,
    iconProps: { className: 'w-4 h-4' },
  },
  {
    label: 'terminal',
    href: '/terminal',
    icon: GlitchLambda,
    external: false,
    iconProps: {
      className: 'text-terminal-green text-base',
      size: 'small',
      'aria-hidden': true,
    },
  },
];

function ContactPage() {
  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
            <header className='space-y-6'>
              <div className='space-y-4'>
                <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-terminal-green leading-tight'>
                  {CONTACT_COPY.hero.title}
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-terminal-text/80 max-w-6xl leading-relaxed'>
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
                    className='cyber-border cyber-border-border p-5 space-y-3'
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
                  const iconProps = link.iconProps ?? {
                    className: 'w-4 h-4',
                    'aria-hidden': true,
                  };
                  const sharedProps = link.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {};
                  const isTerminalLink = link.href === '/terminal';

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`inline-flex items-center font-ocr text-sm text-terminal-green hover:text-terminal-white transition-colors ${
                        isTerminalLink ? 'gap-0' : 'gap-2'
                      }`}
                      {...sharedProps}
                      aria-label={isTerminalLink ? 'terminal' : undefined}
                    >
                      {isTerminalLink ? (
                        <span className='inline-flex items-center leading-none'>
                          <Icon {...iconProps} />
                          <span className='tracking-tight'>{link.label}</span>
                        </span>
                      ) : (
                        <>
                          <Icon {...iconProps} />
                          {link.label}
                        </>
                      )}
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
