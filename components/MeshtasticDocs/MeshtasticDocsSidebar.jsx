'use client';

import Link from 'next/link';

/**
 * Sidebar: Introduction (index) then sections with their pages (like meshtastic.org left menu).
 * Each doc appears once under its section; right menu is "On this page" (headers only).
 */
export default function MeshtasticDocsSidebar({ grouped, currentSlug, currentSection }) {
  const isIntro = currentSlug === null;
  const linkClass = (active) =>
    `block py-1.5 px-2 rounded text-sm transition-colors border-l-2 -ml-0.5 pl-2.5 ${
      active
        ? 'text-neon bg-neon/10 border-neon'
        : 'text-text/80 hover:text-neon hover:bg-neon/5 border-transparent'
    }`;

  return (
    <aside
      className="relative h-full flex flex-col overflow-hidden rounded-r-2xl border border-neon/20 bg-panel/70 shadow-neon-sm backdrop-blur"
      aria-label="Docs navigation"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute left-3 top-3 h-2 w-8 border-l border-t border-neon/50" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-2 w-8 border-b border-r border-neon/50" />
      <div className="relative z-10 p-4 border-b border-neon/20 shrink-0">
        <Link
          href="/meshtastic"
          className="text-neon font-semibold hover:text-accent transition-colors flex items-center gap-2"
        >
          <span className="text-lg font-mono" aria-hidden>//\</span>
          <span>Meshtastic</span>
        </Link>
        <p className="text-xs tracking-[0.2em] text-neon/60 uppercase font-ocr mt-1">Field Notes</p>
      </div>
      <nav className="relative z-10 flex-1 overflow-y-auto p-3 space-y-1">
        <div className="pb-2 border-b border-neon/20">
          <Link href="/meshtastic" className={linkClass(isIntro)}>
            Introduction
          </Link>
        </div>
        {grouped.map(({ section, pages }) => {
          if (!pages?.length) return null;
          const isOpen = currentSection === section;
          const hasActive = pages.some((p) => p.slug === currentSlug);
          return (
            <details
              key={section}
              open={isOpen || hasActive}
              className="group/details border-b border-neon/10 last:border-b-0"
            >
              <summary className="list-none cursor-pointer py-2.5 px-2 flex items-center justify-between gap-2 text-text/90 hover:text-neon transition-colors font-medium text-sm font-ocr">
                <span>{section}</span>
                <span className="text-neon/50 group-open/details:rotate-90 transition-transform" aria-hidden>›</span>
              </summary>
              <ul className="pb-2 pl-2 space-y-0.5">
                {pages.map((p) => {
                  const active = p.slug === currentSlug;
                  return (
                    <li key={p.id}>
                      <Link href={`/meshtastic/${p.slug}`} className={linkClass(active)}>
                        {p.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </nav>
    </aside>
  );
}
