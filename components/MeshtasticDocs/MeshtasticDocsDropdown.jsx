'use client';

import Link from 'next/link';

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DROPDOWN_ID = 'meshtastic-docs-dropdown';

/**
 * Mobile-only dropdown: Introduction then sections with pages (like meshtastic.org), plus "On this page" headings.
 */
export default function MeshtasticDocsDropdown({ grouped, currentSlug, currentSection, headings = [], className = '' }) {
  const isIntro = currentSlug === null;
  const linkClass = (active) =>
    `block py-1 px-2 rounded text-sm transition-colors ${active ? 'text-neon bg-neon/10' : 'text-text/80 hover:text-neon hover:bg-neon/5'}`;

  const closeDropdown = () => {
    document.getElementById(DROPDOWN_ID)?.removeAttribute('open');
  };

  return (
    <details
      id={DROPDOWN_ID}
      className={`group lg:hidden rounded-lg border border-neon/20 bg-panel/50 backdrop-blur ${className}`}
    >
      <summary className="list-none cursor-pointer flex items-center justify-between gap-2 px-3 py-2 text-neon/90 hover:text-neon transition-colors font-ocr text-xs uppercase tracking-wider">
        <span>Documentation</span>
        <span className="text-neon/60 group-open:rotate-180 transition-transform">{CHEVRON_DOWN}</span>
      </summary>
      <nav className="border-t border-neon/20 p-3 space-y-3" aria-label="Docs navigation">
        <div>
          <Link href="/meshtastic" className={linkClass(isIntro)}>
            Introduction
          </Link>
        </div>
        {grouped?.map(({ section, pages }) => {
          if (!pages?.length) return null;
          return (
            <div key={section}>
              <p className="text-[10px] uppercase tracking-widest text-neon/60 font-ocr mb-1.5 px-2">{section}</p>
              <ul className="space-y-0.5">
                {pages.map((p) => (
                  <li key={p.id}>
                    <Link href={`/meshtastic/${p.slug}`} className={linkClass(p.slug === currentSlug)}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {headings?.length > 0 && (
          <div className="pt-1.5 border-t border-neon/20">
            <p className="text-[10px] uppercase tracking-widest text-neon/60 font-ocr mb-1 px-2">On this page</p>
            <ul className="space-y-0.5">
              {headings.map(({ level, text, id }) => {
                const indentClass = level === 1 ? 'pl-0 font-medium' : level === 2 ? 'pl-4' : 'pl-6';
                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      onClick={closeDropdown}
                      className={`block py-1 px-2 rounded text-sm text-text/80 hover:text-neon hover:bg-neon/5 transition-colors ${indentClass}`}
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </details>
  );
}
