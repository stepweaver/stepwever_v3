'use client';

import Link from 'next/link';

/**
 * Prev/Next doc navigation (like meshtastic.org/docs).
 * flatList: [{ slug, title }, ...] with slug null for Introduction.
 */
export default function DocPrevNext({ flatList, currentSlug }) {
  if (!flatList?.length) return null;
  const idx = flatList.findIndex((p) => p.slug === currentSlug);
  const prev = idx > 0 ? flatList[idx - 1] : null;
  const next = idx >= 0 && idx < flatList.length - 1 ? flatList[idx + 1] : null;

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 border-t border-neon/20 pt-6 mt-8"
      aria-label="Previous and next doc"
    >
      <div className="min-w-0">
        {prev ? (
          <Link
            href={prev.slug === null ? "/meshtastic" : `/meshtastic/${prev.slug}`}
            className="text-sm text-text/80 hover:text-neon transition-colors flex items-center gap-2"
          >
            <span className="shrink-0" aria-hidden>←</span>
            <span className="truncate">Previous: {prev.title}</span>
          </Link>
        ) : (
          <span className="text-sm text-text/40">Previous</span>
        )}
      </div>
      <div className="min-w-0 text-right">
        {next ? (
          <Link
            href={next.slug === null ? "/meshtastic" : `/meshtastic/${next.slug}`}
            className="text-sm text-text/80 hover:text-neon transition-colors flex items-center gap-2 justify-end"
          >
            <span className="truncate">Next: {next.title}</span>
            <span className="shrink-0" aria-hidden>→</span>
          </Link>
        ) : (
          <span className="text-sm text-text/40">Next</span>
        )}
      </div>
    </nav>
  );
}
