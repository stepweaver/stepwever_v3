'use client';

import Link from 'next/link';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Mail } from 'lucide-react';
import { SiBluesky, SiGithub } from 'react-icons/si';
import GlitchLambda from '@/components/ui/GlitchLambda';
import { HUDPanel } from '@/components/ui/HUDPanel';

// Lazy load heavy components
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
      className: 'text-neon text-base',
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
        <section className='w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
            <HUDPanel
              title="Let's connect."
              id='CONTACT-00'
              className='p-6 md:p-8'
            >
              <p className='font-ocr text-base sm:text-lg md:text-xl text-text/80 max-w-6xl leading-relaxed mb-4'>
                Have a question, opportunity, or just want to say hello? My inbox is always open.
              </p>
              <div className='relative border border-neon/30 rounded-lg bg-panel/50 backdrop-blur-xl px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-text/90 shadow-[0_0_30px_rgba(0,255,0,0.15)]'>
                <span>I typically respond within a day or two. Looking forward to hearing from you!</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-neon/80 rounded-l-lg'
                  aria-hidden='true'
                />
              </div>
            </HUDPanel>

            <section className='grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]'>
              <HUDPanel title='Send a message' id='CONTACT-01' className='p-5 md:p-6'>
                <ContactForm />
              </HUDPanel>

              <aside className='space-y-6'>
                <HUDPanel title='Email directly' id='CONTACT-02' className='p-5'>
                  <p className='font-ocr text-xs text-text/70 mb-3'>
                    For those who prefer the classic approach.
                  </p>
                  <Link
                    href='mailto:stephen@stepweaver.dev'
                    className='inline-flex items-center gap-2 font-ocr text-sm text-neon hover:text-accent transition-colors'
                  >
                    <Mail className='w-4 h-4 shrink-0' />
                    stephen@stepweaver.dev
                  </Link>
                </HUDPanel>

                <HUDPanel title='Find me elsewhere' id='CONTACT-03' className='p-5'>
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
                          className={`inline-flex items-center font-ocr text-sm text-neon hover:text-accent transition-colors ${
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
                </HUDPanel>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(ContactPage);
