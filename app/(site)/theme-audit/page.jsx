'use client';

import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import { VALID_THEMES } from '@/components/ThemeProvider/ThemeProvider';
import Link from 'next/link';

function Specimen({ label, className, children }) {
  return (
    <div className='border border-border-theme/40 p-4'>
      <p className='font-ocr text-xs uppercase tracking-[0.14em] text-text-meta mb-2'>
        {label} <span className='font-mono text-text-meta/60 normal-case'>{className}</span>
      </p>
      <div className={className}>{children}</div>
    </div>
  );
}

function ButtonSpecimen({ label, className }) {
  return (
    <div className='border border-border-theme/40 p-4'>
      <p className='font-ocr text-xs uppercase tracking-[0.14em] text-text-meta mb-2'>{label}</p>
      <button type='button' className={className}>
        Sample Button
      </button>
    </div>
  );
}

export default function ThemeAuditPage() {
  const { theme, changeTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className='relative min-h-screen'>
      <div className='relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6'>
        <header className='mb-10 border-b border-border-theme/40 pb-6'>
          <p className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label sm:text-sm'>Dev tooling</p>
          <h1 className='mt-2 font-ibm text-3xl uppercase text-terminal-green'>Theme Audit</h1>
          <p className='mt-3 font-ibm text-sm text-text-secondary leading-relaxed sm:text-base'>
            Typography specimens and contrast checks across all themes. Current: <strong className='text-text-label'>{theme}</strong>
          </p>
        </header>

        {/* Theme switcher */}
        <div className='mb-10 flex flex-wrap gap-2'>
          {VALID_THEMES.map((t) => (
            <button
              key={t}
              type='button'
              onClick={() => changeTheme(t)}
              className={[
                'border px-3 py-1.5 font-ibm text-xs uppercase tracking-[0.06em] transition sm:text-sm',
                t === theme
                  ? 'border-terminal-green/50 bg-terminal-green/10 text-terminal-green'
                  : 'border-border-theme/40 text-text-secondary hover:border-neon/40 hover:text-neon',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Typography specimens */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Typography Hierarchy</h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Specimen label='Body text' className='font-ibm text-base text-text leading-relaxed'>
              This is body text at 16px. It should be easily readable on all themes with strong contrast against the background.
            </Specimen>

            <Specimen label='Secondary text' className='font-ibm text-sm text-text-secondary leading-relaxed'>
              Secondary text at 14px. Used for descriptions, supporting copy, and less prominent information.
            </Specimen>

            <Specimen label='Meta text' className='font-ibm text-xs text-text-meta leading-relaxed'>
              Meta text at 12px. Attribution lines, timestamps, and tertiary details.
            </Specimen>

            <Specimen label='Label text' className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>
              LABEL TEXT — section eyebrows, module IDs, status indicators.
            </Specimen>

            <Specimen label='Heading (H2)' className='font-ibm text-2xl uppercase text-terminal-green'>
              Heading Level Two
            </Specimen>

            <Specimen label='Heading (H3)' className='font-ibm text-lg uppercase text-neon'>
              Heading Level Three
            </Specimen>
          </div>
        </section>

        {/* Links */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Link Styles</h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Specimen label='Primary link' className='font-ibm text-sm'>
              <Link href='#' className='text-neon hover:text-accent transition-colors underline'>
                Primary link style
              </Link>
            </Specimen>

            <Specimen label='Secondary link' className='font-ibm text-sm'>
              <Link href='#' className='text-text-secondary underline decoration-border-theme/50 underline-offset-4 transition hover:text-terminal-green'>
                Secondary link style
              </Link>
            </Specimen>
          </div>
        </section>

        {/* Buttons */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Button Variants</h2>
          <div className='grid gap-4 sm:grid-cols-3'>
            <ButtonSpecimen
              label='Primary'
              className='inline-flex items-center border border-terminal-green/35 px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-terminal-green transition hover:border-terminal-green/70 hover:bg-terminal-green/10 font-ibm'
            />
            <ButtonSpecimen
              label='Secondary'
              className='inline-flex items-center border border-neon/25 px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-text-secondary transition hover:border-neon/55 hover:bg-neon/10 hover:text-neon font-ibm'
            />
            <ButtonSpecimen
              label='Ghost'
              className='inline-flex items-center border border-border-theme/50 px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-text-meta transition hover:border-neon/40 hover:text-text-secondary font-ibm'
            />
          </div>
        </section>

        {/* Input */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Input Field</h2>
          <div className='max-w-md'>
            <label className='block font-ibm text-xs uppercase tracking-[0.08em] text-text-label mb-2 sm:text-sm'>
              Sample input
            </label>
            <input
              type='text'
              readOnly
              value='Sample input text'
              className='w-full border border-border-theme/40 bg-terminal-dark/40 px-4 py-3 font-ibm text-sm text-text-secondary placeholder:text-text-meta/60 focus:border-terminal-green/45 focus:outline-none focus:ring-2 focus:ring-terminal-green/25'
            />
          </div>
        </section>

        {/* Project card excerpt */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Project Card Excerpt</h2>
          <div className='max-w-sm border border-terminal-green/15 bg-terminal-dark/25'>
            <div className='p-4'>
              <h3 className='font-ibm text-lg uppercase leading-snug tracking-[0.03em] text-terminal-green'>
                Sample Project
              </h3>
              <p className='mt-2 font-ibm text-sm leading-6 text-text-secondary'>
                A brief description of the project that demonstrates secondary text contrast on a dark card surface.
              </p>
              <span className='mt-4 inline-flex items-center gap-1 font-ibm text-xs uppercase tracking-[0.08em] text-text-label'>
                View case study →
              </span>
            </div>
          </div>
        </section>

        {/* Terminal-style labels */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Terminal Labels &amp; Chrome</h2>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='border border-border-theme/40 p-4'>
              <p className='font-ocr text-xs uppercase tracking-[0.14em] text-text-meta mb-3'>Module header</p>
              <div className='flex items-center gap-3'>
                <span className='h-2 w-2 bg-terminal-green shadow-[0_0_14px_rgba(0,255,153,0.45)]' />
                <span className='font-ocr text-xs uppercase tracking-[0.16em] text-text-secondary sm:text-sm'>
                  MODULE 01
                </span>
              </div>
            </div>

            <div className='border border-border-theme/40 p-4'>
              <p className='font-ocr text-xs uppercase tracking-[0.14em] text-text-meta mb-3'>Status chips</p>
              <div className='flex gap-2'>
                <span className='border border-neon/25 bg-terminal-dark/50 px-2.5 py-1 font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>
                  Active
                </span>
                <span className='border border-border-theme/40 bg-terminal-dark/50 px-2.5 py-1 font-ocr text-xs uppercase tracking-[0.18em] text-text-meta'>
                  Inactive
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Resume section block */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Resume Block</h2>
          <div className='border border-border-theme/40 p-6'>
            <p className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label mb-1'>Professional Summary</p>
            <p className='font-ibm text-sm text-text-secondary leading-relaxed max-w-3xl'>
              Full-stack engineer and business analyst with 9+ years bridging operations, data, and software systems. This block tests readability of resume-style body copy across themes.
            </p>
          </div>
        </section>

        {/* Panel / surface */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>Surface Panel</h2>
          <div className='surface-panel border border-border-theme/40 p-6'>
            <p className='font-ibm text-base text-text leading-relaxed'>
              Body text on a panel surface with backdrop blur. Verify contrast is maintained when panel overlaps background imagery.
            </p>
            <p className='mt-2 font-ibm text-sm text-text-secondary leading-relaxed'>
              Secondary text on the same surface.
            </p>
          </div>
        </section>

        {/* QA checklist */}
        <section className='mb-12'>
          <h2 className='font-ibm text-xl uppercase text-terminal-green mb-6'>QA Checklist</h2>
          <ul className='space-y-2 font-ibm text-sm text-text-secondary'>
            <li className='flex items-start gap-2'>
              <span className='mt-1 h-3 w-3 shrink-0 border border-border-theme/50' />
              No text below 14px except truly decorative micro-chrome
            </li>
            <li className='flex items-start gap-2'>
              <span className='mt-1 h-3 w-3 shrink-0 border border-border-theme/50' />
              No primary interactive text below 4.5:1 contrast
            </li>
            <li className='flex items-start gap-2'>
              <span className='mt-1 h-3 w-3 shrink-0 border border-border-theme/50' />
              No important text using heavy transparency as its only hierarchy method
            </li>
            <li className='flex items-start gap-2'>
              <span className='mt-1 h-3 w-3 shrink-0 border border-border-theme/50' />
              Panel and text do not collapse into each other
            </li>
          </ul>
        </section>

        <footer className='border-t border-border-theme/40 pt-6'>
          <p className='font-ibm text-xs text-text-meta'>
            This route is for internal QA only and is excluded from search engine indexing.
          </p>
        </footer>
      </div>
    </div>
  );
}
