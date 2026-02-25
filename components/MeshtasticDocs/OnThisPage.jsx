'use client';

import Link from 'next/link';
import { headingIndentClass } from '@/lib/meshtastic-docs-headings';

export default function OnThisPage({ headings }) {
  if (!headings?.length) return null;

  return (
    <aside
      className='hidden xl:block min-w-64 max-w-80 flex-1 pt-8 sticky top-24 self-start border-l border-neon/15 pl-6 pr-4'
      aria-label='On this page'
    >
      <div className='py-4 px-4 rounded-sm bg-panel/20 border border-neon/10'>
        <p className='font-ocr text-[9px] tracking-[0.25em] text-neon/45 uppercase mb-3'>
          On this page
        </p>
        <nav className='space-y-1'>
          {headings.map(({ level, text, id }, index) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`block text-[12px] text-text/55 hover:text-neon transition-colors py-0.5 font-ocr ${headingIndentClass(level, index === 0)}`}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
