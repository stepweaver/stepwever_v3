'use client';

import Link from 'next/link';
import { headingIndentClass } from '@/lib/meshtastic-docs-headings';

/**
 * Right sidebar "On this page" table of contents from document headings (meshtastic.org-style).
 */
export default function OnThisPage({ headings }) {
  if (!headings?.length) return null;

  return (
    <aside
      className="hidden xl:block min-w-64 max-w-80 flex-1 pt-8 sticky top-24 self-start border-l border-neon/20 pl-8 pr-4"
      aria-label="On this page"
    >
      <div className="bg-panel/30 py-5 px-5 rounded-sm border border-neon/15">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon/70 mb-3 font-ocr">
          On this page
        </p>
        <nav className="space-y-1.5">
          {headings.map(({ level, text, id }, index) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`block text-sm text-text/70 hover:text-neon transition-colors py-1 font-ocr ${headingIndentClass(level, index === 0)}`}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
