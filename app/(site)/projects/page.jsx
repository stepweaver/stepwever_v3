'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CAROUSEL_PROJECTS, HOMEPAGE_FEATURED_SLUGS } from '@/lib/carouselProjects';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

function normalize(s) {
  return (s || '').toLowerCase();
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'apps', label: 'Apps' },
  { id: 'automation', label: 'Automation' },
  { id: 'services', label: 'Services' },
];

const FEATURED_SET = new Set(HOMEPAGE_FEATURED_SLUGS);

function getCategory(project) {
  if (project.isService) return 'services';
  const t = (project.tags || []).map((s) => s.toLowerCase());
  if (t.some((tag) => ['automation', 'n8n', 'zapier'].includes(tag))) return 'automation';
  return 'apps';
}

const PAGE_SIZE = 8;

export default function ProjectsIndexPage() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [tagsOpen, setTagsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  const filtered = useMemo(() => {
    const q = normalize(query).trim();
    return CAROUSEL_PROJECTS.filter((p) => {
      if (activeCategory === 'featured' && !FEATURED_SET.has(p.slug)) return false;
      if (activeCategory === 'apps' && getCategory(p) !== 'apps') return false;
      if (activeCategory === 'automation' && getCategory(p) !== 'automation') return false;
      if (activeCategory === 'services' && !p.isService) return false;

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
  }, [query, activeTags, activeCategory]);

  const displayedProjects = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const hasMore = visibleCount < filtered.length;

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setVisibleCount(PAGE_SIZE);
  };

  const clearTags = () => {
    setActiveTags([]);
    setVisibleCount(PAGE_SIZE);
  };

  const selectCategory = (id) => {
    setActiveCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'>
        <header className='mb-10 border-b border-border-theme/40 pb-8'>
          <p className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label sm:text-sm'>
            Full catalog
          </p>
          <h1 className='mt-3 font-ibm text-3xl uppercase tracking-[0.04em] text-terminal-green sm:text-4xl'>
            Projects
          </h1>
          <p className='mt-4 max-w-[68ch] font-ibm text-sm leading-7 text-text-secondary sm:text-base'>
            Case studies and build notes across apps, automation, and client work.
          </p>
          <Link
            href='/'
            className='mt-6 inline-block font-ibm text-sm text-text-secondary underline decoration-border-theme/50 underline-offset-4 transition hover:text-terminal-green hover:decoration-terminal-green/50'
          >
            ← Back to home
          </Link>
        </header>

        {/* Category chips */}
        <div className='mb-6 flex flex-wrap gap-2'>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type='button'
              onClick={() => selectCategory(cat.id)}
              className={[
                'inline-flex items-center border px-3 py-1.5 font-ibm text-xs uppercase tracking-[0.08em] transition sm:text-sm',
                activeCategory === cat.id
                  ? 'border-terminal-green/45 bg-terminal-green/10 text-terminal-green'
                  : 'border-border-theme/40 bg-terminal-dark/25 text-text-secondary hover:border-neon/35 hover:text-neon',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className='mb-6 space-y-3'>
          <label className='block font-ibm text-xs uppercase tracking-[0.08em] text-text-label sm:text-sm'>
            Search
          </label>
          <input
            type='search'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder='Filter by title, stack, or keyword…'
            className='w-full border border-border-theme/40 bg-terminal-dark/40 px-4 py-3 font-ibm text-sm text-text-secondary placeholder:text-text-meta/60 focus:border-terminal-green/45 focus:outline-none focus:ring-2 focus:ring-terminal-green/25'
            autoComplete='off'
          />
        </div>

        {/* Tag cloud -- collapsed on mobile behind a toggle */}
        <div className='mb-10'>
          <div className='mb-3 flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => setTagsOpen((v) => !v)}
              className='font-ibm text-xs uppercase tracking-[0.08em] text-text-label sm:text-sm lg:hidden'
            >
              {tagsOpen ? 'Hide filters' : 'More filters'}
            </button>
            <span className='hidden font-ibm text-xs uppercase tracking-[0.08em] text-text-label sm:text-sm lg:inline'>
              Tags
            </span>
            {activeTags.length > 0 && (
              <button
                type='button'
                onClick={clearTags}
                className='font-ibm text-xs uppercase tracking-[0.08em] text-text-meta underline decoration-border-theme/40 underline-offset-2 hover:text-terminal-green'
              >
                Clear
              </button>
            )}
          </div>
          <div className={`flex-wrap gap-2 ${tagsOpen ? 'flex' : 'hidden lg:flex'}`}>
            {tagsSorted.map((tag) => {
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
                      : 'border-border-theme/30 bg-terminal-dark/25 text-text-secondary hover:border-neon/35 hover:text-neon',
                  ].join(' ')}
                >
                  <span>{tag}</span>
                  {n != null && n > 0 && (
                    <span className='font-ibm normal-case text-xs tabular-nums text-text-meta'>
                      {n}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className='mb-6 font-ibm text-sm uppercase tracking-[0.08em] text-text-meta'>
          Showing {displayedProjects.length} of {filtered.length}
        </p>

        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {displayedProjects.map((p) => {
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
                      {p.title}
                    </h2>
                    {p.description && (
                      <p className='mt-2 flex-1 font-ibm text-sm leading-6 text-text-secondary'>
                        {p.description}
                      </p>
                    )}
                    <span className='mt-4 inline-flex items-center gap-1 font-ibm text-xs uppercase tracking-[0.08em] text-text-label group-hover:text-terminal-green'>
                      View case study →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {hasMore && (
          <div className='mt-8 text-center'>
            <button
              type='button'
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className='inline-flex items-center border border-border-theme/50 px-6 py-3 font-ibm text-sm uppercase tracking-[0.08em] text-text-secondary transition hover:border-neon/50 hover:text-neon'
            >
              Show more ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className='border border-terminal-green/15 bg-terminal-dark/30 p-8 text-center font-ibm text-text-secondary'>
            No projects match your filters. Try clearing tags or shortening the search.
          </div>
        )}
      </div>
    </div>
  );
}
