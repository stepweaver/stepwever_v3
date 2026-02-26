'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLinkClass } from '@/lib/meshtasticNavUtils';

/**
 * Mobile-only slide-out drawer for navigating between Meshtastic doc sections/pages.
 * Mirrors the desktop sidebar content in a mobile-friendly overlay.
 * Uses a portal to render the backdrop + drawer at document.body level so it
 * sits above the fixed navbar (z-50) regardless of parent stacking contexts.
 */
export default function MeshtasticDocsMobileNav({ grouped, currentSlug, currentSection, hasFieldNotes = false }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Uses shared getLinkClass from lib/meshtasticNavUtils

  return (
    <>
      {/* Toggle button (stays in-flow alongside the "On this page" dropdown) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-sm border border-neon/25 bg-panel/50 text-neon/90 hover:text-neon hover:bg-panel/70 hover:border-neon/40 transition-colors font-ocr text-xs uppercase tracking-[0.2em]"
        aria-label="Open docs navigation"
        aria-expanded={open}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span>Docs Menu</span>
      </button>

      {/* Portal: backdrop + drawer rendered at document.body to escape parent stacking contexts */}
      {open && mounted && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9998] bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out drawer */}
          <aside
            className="fixed top-0 left-0 z-[9999] h-full w-72 max-w-[85vw] lg:hidden"
            aria-label="Docs navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="h-full flex flex-col bg-[rgb(var(--bg))] border-r border-neon/20 overflow-hidden shadow-neon">
              {/* Header */}
              <div className="p-4 border-b border-neon/20 shrink-0 flex items-center justify-between">
                <Link
                  href="/meshtastic"
                  className="text-neon font-semibold hover:text-accent transition-colors flex items-center gap-2 [text-shadow:var(--terminal-title-glow)]"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-lg font-mono" aria-hidden>//\</span>
                  <span className="font-ibm">Meshtastic</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 text-text/60 hover:text-neon transition-colors rounded"
                  aria-label="Close docs navigation"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {/* Field Notes as a direct link - appears FIRST */}
                {hasFieldNotes && (
                  <div className="border-b border-neon/5 pb-1 mb-1">
                    <Link
                      href="/meshtastic/field-notes"
                      className={getLinkClass(currentSlug === 'field-notes')}
                      onClick={() => setOpen(false)}
                    >
                      Field Notes
                    </Link>
                  </div>
                )}
                
                {/* Regular doc sections */}
                {grouped.map(({ section, pages }) => {
                  if (!pages?.length) return null;
                  const sectionOpen = currentSection === section;
                  const hasActive = pages.some((p) => p.slug === currentSlug);
                  return (
                    <details
                      key={section}
                      open={sectionOpen || hasActive}
                      className="group/details border-b border-neon/5 last:border-b-0"
                    >
                      <summary className="list-none cursor-pointer py-2.5 px-2 flex items-center justify-between gap-2 text-text/90 hover:text-neon transition-colors font-medium text-sm font-ocr">
                        <span>{section}</span>
                        <span
                          className="text-neon/50 group-open/details:rotate-90 transition-transform"
                          aria-hidden
                        >
                          ›
                        </span>
                      </summary>
                      <ul className="pb-2 pl-2 space-y-0.5">
                        {pages.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/meshtastic/${p.slug}`}
                              className={getLinkClass(p.slug === currentSlug)}
                              onClick={() => setOpen(false)}
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
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
