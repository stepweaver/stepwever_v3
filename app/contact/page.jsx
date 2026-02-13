'use client';

import Link from 'next/link';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Mail } from 'lucide-react';
import { SiBluesky, SiGithub } from 'react-icons/si';
import GlitchLambda from '@/components/ui/GlitchLambda';

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
            <header className='space-y-6'>
              <div className='space-y-4'>
                <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neon leading-tight'>
                  Let's connect.
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-text/80 max-w-6xl leading-relaxed'>
                  Have a question, opportunity, or just want to say hello? My inbox is always open.
                </p>
              </div>
              <div className='relative border border-neon/30 rounded-lg bg-panel/50 backdrop-blur-xl px-5 sm:px-8 py-4 font-ocr text-sm sm:text-base text-text/90 shadow-[0_0_30px_rgba(0,255,0,0.15)]'>
                <span>I typically respond within a day or two. Looking forward to hearing from you!</span>
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-neon/80 rounded-l-lg'
                  aria-hidden='true'
                ></span>
              </div>
            </header>

            <section className='grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]'>
              <div className='space-y-8'>
                <ContactForm />
              </div>

              <aside className='space-y-6'>
                <div className='border border-neon/20 rounded-lg bg-panel/50 backdrop-blur-xl p-5 space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-5 h-5 text-neon' />
                    <div>
                      <p className='font-ibm text-lg text-neon'>
                        Email directly
                      </p>
                      <p className='font-ocr text-xs text-text/70'>
                        For those who prefer the classic approach.
                      </p>
                    </div>
                  </div>
                  <div className='font-ocr text-sm text-text/90'>
                    <Link
                      href='mailto:stephen@stepweaver.dev'
                      className='inline-flex items-center gap-2 text-neon hover:text-accent transition-colors'
                    >
                      stephen@stepweaver.dev
                    </Link>
                  </div>
                </div>

                <div className='border border-neon/20 rounded-lg bg-panel/50 backdrop-blur-xl p-5 space-y-4'>
                  <p className='font-ibm text-lg text-neon'>
                    Find me elsewhere
                  </p>
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
                </div>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default memo(ContactPage);
