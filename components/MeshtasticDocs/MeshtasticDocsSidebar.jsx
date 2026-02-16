'use client';

import Link from 'next/link';
import { getLinkClass } from '@/lib/meshtasticNavUtils';

/**
 * Sidebar: sections with their pages only (like meshtastic.org). No duplicate "Introduction";
 * index/landing is reached via the header "Meshtastic" / "Field Notes" link.
 */
export default function MeshtasticDocsSidebar({ grouped, currentSlug, currentSection }) {

  return (
    <aside
      className="flex flex-col min-h-0"
      aria-label="Docs navigation"
    >
      <div className="p-4 border-b border-neon/15 shrink-0">
        <Link
          href="/meshtastic"
          className="text-neon font-semibold hover:text-accent transition-colors flex items-center gap-2 [text-shadow:var(--terminal-title-glow)]"
        >
          <span className="text-lg font-mono" aria-hidden>//\</span>
          <span className="font-ibm">Meshtastic</span>
        </Link>
        <p className="text-xs tracking-[0.2em] text-neon/60 uppercase font-ocr mt-1">Field Notes</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-h-0">
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
                {pages
                  .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
                  .map((p) => {
                    const active = p.slug === currentSlug;
                    return (
                      <li key={p.id}>
                        <Link href={`/meshtastic/${p.slug}`} className={getLinkClass(active)}>
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
