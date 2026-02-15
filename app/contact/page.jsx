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
            {/* Hero */}
            <div className='space-y-6 md:space-y-8'>
              <div className='space-y-4'>
                <p className='text-xs tracking-[0.3em] text-neon/60 font-ocr uppercase'>
                  CONTACT &mdash; CONTACT-00
                </p>
                <h1 className='font-ibm text-4xl sm:text-5xl md:text-6xl font-bold text-text leading-tight'>
                  Let&apos;s connect.
                </h1>
                <p className='font-ocr text-base sm:text-lg md:text-xl text-text/70 leading-relaxed max-w-3xl'>
                  Have a question, opportunity, or just want to say hello? My inbox is always open.
                </p>
                <p className='font-ocr text-sm text-text/50'>
                  I typically respond within a day or two. Looking forward to hearing from you!
                </p>
              </div>

              {/* Divider */}
              <div className='w-full h-px bg-gradient-to-r from-neon/40 via-neon/10 to-transparent' />
            </div>

            <section className='grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]'>
              {/* Form — this one gets the bordered HUDPanel */}
              <HUDPanel title='Send a message' id='CONTACT-01' className='p-6 md:p-8 lg:p-10'>
                <ContactForm />
              </HUDPanel>

              {/* Sidebar — unbounded, simple content */}
              <aside className='space-y-8 px-2'>
                <div>
                  <p className='text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2'>EMAIL DIRECTLY</p>
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
                </div>

                <div>
                  <p className='text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3'>FIND ME ELSEWHERE</p>
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
