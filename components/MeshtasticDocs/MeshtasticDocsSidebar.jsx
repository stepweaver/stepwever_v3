'use client';

import Link from 'next/link';
import { getLinkClass } from '@/lib/meshtasticNavUtils';

export default function MeshtasticDocsSidebar({
  grouped,
  currentSlug,
  currentSection,
  hasFieldNotes = false,
}) {
  return (
    <aside className='flex flex-col min-h-0' aria-label='Docs navigation'>
      <div className='p-3 border-b border-neon/15 shrink-0'>
        <Link
          href='/meshtastic'
          className='group flex items-center gap-2 text-neon hover:text-accent transition-colors [text-shadow:var(--terminal-title-glow)]'
        >
          <span className='text-lg font-mono' aria-hidden>
            //\
          </span>
          <span className='font-ibm text-sm'>Meshtastic</span>
        </Link>
        <p className='font-ocr text-[9px] tracking-[0.2em] text-neon/30 uppercase mt-1'>
          Field guide
        </p>
      </div>

      <nav className='flex-1 p-3 space-y-1 overflow-y-auto min-h-0'>
        <div className='border-b border-neon/10 pb-1 mb-1'>
          <Link
            href='/meshtastic/dashboard'
            className={getLinkClass(false)}
          >
            Dashboard
          </Link>
        </div>
        {hasFieldNotes && (
          <div className='border-b border-neon/10 pb-1 mb-1'>
            <Link
              href='/meshtastic/field-notes'
              className={getLinkClass(currentSlug === 'field-notes')}
            >
              Field Notes
            </Link>
          </div>
        )}

        {grouped.map(({ section, pages }) => {
          if (!pages?.length) return null;
          const isOpen = currentSection === section;
          const hasActive = pages.some((p) => p.slug === currentSlug);
          return (
            <details
              key={section}
              open={isOpen || hasActive}
              className='group/details border-b border-neon/10 last:border-b-0'
            >
              <summary className='list-none cursor-pointer py-2.5 px-2 flex items-center justify-between gap-2 text-text/90 hover:text-neon transition-colors font-medium text-sm font-ocr'>
                <span>{section}</span>
                <span
                  className='text-neon/50 group-open/details:rotate-90 transition-transform'
                  aria-hidden
                >
                  ›
                </span>
              </summary>
              <ul className='pb-2 pl-2 space-y-0.5'>
                {pages.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/meshtastic/${p.slug}`}
                      className={getLinkClass(p.slug === currentSlug)}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </nav>

      {/* System info */}
      <div className='p-3 border-t border-neon/10 space-y-1'>
        <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
          <span className='w-1 h-1 rounded-full bg-neon/30' />
          <span>Notion-powered docs</span>
        </div>
        <div className='flex items-center gap-2 font-ocr text-[9px] text-text/20'>
          <span className='w-1 h-1 rounded-full bg-neon/30' />
          <span>Auto-synced content</span>
        </div>
      </div>
    </aside>
  );
}
