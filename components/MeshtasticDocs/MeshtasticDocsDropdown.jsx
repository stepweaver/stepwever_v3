'use client';

import Link from 'next/link';
import { headingIndentClass } from '@/lib/meshtastic-docs-headings';

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DROPDOWN_ID = 'meshtastic-docs-dropdown';

/**
 * Mobile-only dropdown: only "On this page" and its heading links (no section menu on mobile).
 * Not shown on the index page (no headings there).
 */
export default function MeshtasticDocsDropdown({ headings = [], className = '' }) {
  const closeDropdown = () => {
    document.getElementById(DROPDOWN_ID)?.removeAttribute('open');
  };

  if (!headings?.length) return null;

  return (
    <details
      id={DROPDOWN_ID}
      className={`group lg:hidden rounded-sm border border-neon/25 bg-panel/50 backdrop-blur ${className}`}
    >
      <summary className="list-none cursor-pointer flex items-center justify-between gap-2 px-3 py-2 text-neon/90 hover:text-neon transition-colors font-ocr text-xs uppercase tracking-[0.2em]">
        <span>On this page</span>
        <span className="text-neon/60 group-open:rotate-180 transition-transform">{CHEVRON_DOWN}</span>
      </summary>
      <nav className="border-t border-neon/20 p-2" aria-label="On this page">
        <ul className="space-y-0.5">
          {headings.map(({ level, text, id }, index) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                onClick={closeDropdown}
                className={`block py-1 px-2 rounded-sm text-sm text-text/70 hover:text-neon hover:bg-neon/5 transition-colors font-ocr ${headingIndentClass(level, index === 0)}`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
