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
      className="hidden xl:block w-52 shrink-0 pt-8 sticky top-24 self-start"
      aria-label="On this page"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-neon/70 mb-3 font-ocr">
        On this page
      </p>
      <nav className="space-y-1">
        {headings.map(({ level, text, id }, index) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`block text-sm text-text/80 hover:text-neon transition-colors py-0.5 ${headingIndentClass(level, index === 0)}`}
          >
            {text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
