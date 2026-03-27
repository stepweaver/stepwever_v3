'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CAROUSEL_PROJECTS } from '@/lib/carouselProjects';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

function normalize(s) {
  return (s || '').toLowerCase();
}

/** Collapsed tag strip: enough for ~2–3 rows on mobile without hiding the grid. */
const TAGS_COLLAPSED_MAX = 12;

export default function ProjectsIndexPage() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const { tagsSorted, tagCounts } = useMemo(() => {
    const counts = new Map();
    CAROUSEL_PROJECTS.forEach((p) => {
      (p.tags || []).forEach((t) => {
        counts.set(t, (counts.get(t) || 0) + 1);
      });
    });
    const tags = Array.from(counts.keys()).sort((a, b) => {
      const ca = counts.get(a) ?? 0;
      const cb = counts.get(b) ?? 0;
      if (cb !== ca) return cb - ca;
      return a.localeCompare(b);
    });
    return { tagsSorted: tags, tagCounts: counts };
  }, []);

  const tagOrder = useMemo(
    () => new Map(tagsSorted.map((t, i) => [t, i])),
    [tagsSorted]
  );

  const displayTags = useMemo(() => {
    if (tagsExpanded || tagsSorted.length <= TAGS_COLLAPSED_MAX) return tagsSorted;
    const head = tagsSorted.slice(0, TAGS_COLLAPSED_MAX);
    const extra = activeTags
      .filter((t) => !head.includes(t))
      .sort((a, b) => (tagOrder.get(a) ?? 0) - (tagOrder.get(b) ?? 0));
    return extra.length ? [...head, ...extra] : head;
  }, [tagsSorted, tagsExpanded, activeTags, tagOrder]);

  const hiddenTagCount = tagsSorted.length - displayTags.length;

  const filtered = useMemo(() => {
    const q = normalize(query).trim();
    return CAROUSEL_PROJECTS.filter((p) => {
      if (activeTags.length > 0) {
        const tags = p.tags || [];
        const any = activeTags.some((t) => tags.includes(t));
        if (!any) return false;
      }
      if (!q) return true;
      const hay = [
        p.title,
        p.description,
        ...(p.tags || []),
        ...(p.keywords || []),
      ]
        .filter(Boolean)
        .join(' ');
      return normalize(hay).includes(q);
    });
  }, [query, activeTags]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setActiveTags([]);

  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'>
        <header className='mb-10 border-b border-terminal-green/15 pb-8'>
          <p className='font-ocr text-[10px] uppercase tracking-[0.28em] text-neon/60 sm:text-xs'>
            Full catalog
          </p>
          <h1 className='mt-3 font-ibm text-3xl uppercase tracking-[0.04em] text-terminal-green sm:text-4xl'>
            Projects
          </h1>
          <p className='mt-4 max-w-[68ch] font-ibm text-sm leading-7 text-terminal-dimmed sm:text-base'>
            Case studies and build notes across apps, automation, and client work. Use search and tags to
            narrow the list.
          </p>
          <Link
            href='/'
            className='mt-6 inline-block font-ibm text-sm text-neon/75 underline decoration-neon/30 underline-offset-4 transition hover:text-terminal-green hover:decoration-terminal-green/50'
          >
            ← Back to home
          </Link>
        </header>

        <div className='mb-8 space-y-4'>
          <label className='block font-ibm text-xs uppercase tracking-[0.08em] text-neon/70 sm:text-sm'>
            Search
          </label>
          <input
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Filter by title, stack, or keyword…'
            className='w-full border border-terminal-green/20 bg-terminal-dark/40 px-4 py-3 font-ibm text-sm text-terminal-dimmed placeholder:text-terminal-dimmed/50 focus:border-terminal-green/45 focus:outline-none focus:ring-2 focus:ring-terminal-green/25'
            autoComplete='off'
          />
        </div>

        <div className='mb-10'>
          <div className='mb-3 flex flex-wrap items-center gap-2'>
            <span className='font-ibm text-xs uppercase tracking-[0.08em] text-neon/70 sm:text-sm'>
              Tags
            </span>
            {activeTags.length > 0 && (
              <button
                type='button'
                onClick={clearTags}
                className='font-ibm text-xs uppercase tracking-[0.08em] text-neon/60 underline decoration-neon/25 underline-offset-2 hover:text-terminal-green'
              >
                Clear
              </button>
            )}
          </div>
          <div className='flex flex-wrap gap-2'>
            {displayTags.map((tag) => {
              const on = activeTags.includes(tag);
              const n = tagCounts.get(tag);
              return (
                <button
                  key={tag}
                  type='button'
                  onClick={() => toggleTag(tag)}
                  aria-pressed={on}
                  title={n != null ? `${n} project${n === 1 ? '' : 's'}` : undefined}
                  className={[
                    'inline-flex items-baseline gap-1.5 border px-3 py-1.5 font-ibm text-xs tracking-[0.05em] transition sm:text-sm',
                    on
                      ? 'border-terminal-green/45 bg-terminal-green/10 text-terminal-green'
                      : 'border-neon/15 bg-terminal-dark/25 text-terminal-dimmed hover:border-neon/35 hover:text-neon/85',
                  ].join(' ')}
                >
                  <span>{tag}</span>
                  {n != null && n > 0 && (
                    <span className='font-ibm normal-case text-[9px] tabular-nums text-neon/35 sm:text-[10px]'>
                      {n}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {!tagsExpanded && hiddenTagCount > 0 && (
            <button
              type='button'
              onClick={() => setTagsExpanded(true)}
              className='mt-3 font-ibm text-xs uppercase tracking-[0.08em] text-neon/60 underline decoration-neon/25 underline-offset-2 transition hover:text-terminal-green'
            >
              Show {hiddenTagCount} more tag{hiddenTagCount === 1 ? '' : 's'}
            </button>
          )}
          {tagsExpanded && tagsSorted.length > TAGS_COLLAPSED_MAX && (
            <button
              type='button'
              onClick={() => setTagsExpanded(false)}
              className='mt-3 font-ibm text-xs uppercase tracking-[0.08em] text-neon/60 underline decoration-neon/25 underline-offset-2 transition hover:text-terminal-green'
            >
              Show fewer tags
            </button>
          )}
        </div>

        <p className='mb-6 font-ibm text-sm uppercase tracking-[0.08em] text-neon/60'>
          Showing {filtered.length} of {CAROUSEL_PROJECTS.length}
        </p>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((p) => {
            const href = `/projects/${p.slug}`;
            const img = p.imageUrl || '/images/terminal_ui.png';

            return (
              <li key={p.slug}>
                <Link
                  href={href}
                  className='group flex h-full flex-col border border-terminal-green/15 bg-terminal-dark/25 transition hover:border-terminal-green/35 hover:bg-terminal-dark/40'
                >
                  <div className='relative aspect-[16/10] overflow-hidden border-b border-terminal-green/10 bg-terminal-dark/40'>
                    <OptimizedImage
                      src={img}
                      alt=''
                      className='h-full w-full object-cover opacity-90 transition group-hover:opacity-100'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-terminal-dark/80 via-transparent to-transparent' />
                  </div>
                  <div className='flex flex-1 flex-col p-4'>
                    <h2 className='font-ibm text-lg uppercase leading-snug tracking-[0.03em] text-terminal-green group-hover:text-neon'>
                      Case Study: {p.title}
                    </h2>
                    {p.description && (
                      <p className='mt-2 flex-1 font-ibm text-sm leading-6 text-terminal-dimmed'>
                        {p.description}
                      </p>
                    )}
                    <span className='mt-4 inline-flex items-center gap-1 font-ibm text-xs uppercase tracking-[0.08em] text-neon/65 group-hover:text-terminal-green'>
                      View case study →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className='border border-terminal-green/15 bg-terminal-dark/30 p-8 text-center font-ibm text-terminal-dimmed'>
            No projects match your filters. Try clearing tags or shortening the search.
          </div>
        )}
      </div>
    </div>
  );
}
