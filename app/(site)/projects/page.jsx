'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const categoryCounts = useMemo(() => {
    const counts = { featured: 0, apps: 0, automation: 0, services: 0 };
    for (const p of CAROUSEL_PROJECTS) {
      if (FEATURED_SET.has(p.slug)) counts.featured += 1;
      counts[getCategory(p)] += 1;
    }
    return counts;
  }, []);

  const visibleCategories = useMemo(() => {
    if (CAROUSEL_PROJECTS.length === 0) return [];
    return CATEGORIES.filter((cat) => {
      if (cat.id === 'all') return true;
      return (categoryCounts[cat.id] ?? 0) > 0;
    });
  }, [categoryCounts]);

  useEffect(() => {
    if (visibleCategories.length === 0) return;
    if (!visibleCategories.some((c) => c.id === activeCategory)) {
      setActiveCategory('all');
    }
  }, [visibleCategories, activeCategory]);

  useEffect(() => {
    if (tagsSorted.length === 0 && activeTags.length > 0) {
      setActiveTags([]);
    }
  }, [tagsSorted.length, activeTags.length]);

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

      <div className='relative z-10 w-full px-4 pb-16 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-8 space-y-4 md:space-y-5'>
            <div className='space-y-3'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                <p className='font-ocr text-xs uppercase tracking-[0.3em] text-neon/60'>
                  Full catalog
                </p>
                <Link
                  href='/'
                  aria-label='Back to home'
                  className='shrink-0 font-ocr text-[10px] uppercase tracking-[0.15em] text-neon/50 transition-colors hover:text-neon'
                >
                  ← Home
                </Link>
              </div>
              <h1 className='font-ibm text-4xl font-bold leading-tight text-text sm:text-5xl md:text-6xl'>
                Projects
              </h1>
              <p className='max-w-3xl font-ibm text-base leading-relaxed text-text/75 sm:text-lg'>
                Case studies and build notes across apps, automation, and client work.
              </p>
            </div>
            <div className='h-px w-full bg-gradient-to-r from-neon/40 via-neon/10 to-transparent' />
          </div>

          <div className='mb-8 space-y-6'>
            {visibleCategories.length > 0 && (
              <div>
                <p className='mb-3 font-ocr text-[10px] uppercase tracking-[0.25em] text-neon/50'>
                  Browse
                </p>
                <div className='flex flex-wrap gap-2'>
                  {visibleCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type='button'
                        onClick={() => selectCategory(cat.id)}
                        className={`
                        cursor-pointer rounded-sm border px-3 py-1 font-ocr text-xs uppercase tracking-wider transition-all duration-200
                        ${
                          isActive
                            ? 'border-neon bg-neon/25 text-neon [text-shadow:var(--terminal-strong-glow)] [box-shadow:0_0_12px_rgb(var(--neon)/0.4)]'
                            : 'border-neon/25 text-text/60 hover:border-neon/50 hover:bg-neon/5 hover:text-neon'
                        }
                      `}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className='space-y-3'>
              <label className='block font-ocr text-[10px] uppercase tracking-[0.25em] text-neon/50'>
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
                className='w-full rounded-sm border border-neon/25 bg-panel/50 px-4 py-3 font-ibm text-sm text-text/80 placeholder:text-text/40 focus:border-neon/50 focus:outline-none focus:ring-2 focus:ring-neon/20'
                autoComplete='off'
              />
            </div>

            {tagsSorted.length > 0 && (
              <div>
                <div className='mb-3 flex flex-wrap items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => setTagsOpen((v) => !v)}
                    className='font-ocr text-[10px] uppercase tracking-[0.25em] text-neon/50 lg:hidden'
                  >
                    {tagsOpen ? 'Hide filters' : 'More filters'}
                  </button>
                  <span className='hidden font-ocr text-[10px] uppercase tracking-[0.25em] text-neon/50 lg:inline'>
                    Filter by tag
                  </span>
                  {activeTags.length > 0 && (
                    <button
                      type='button'
                      onClick={clearTags}
                      className='font-ocr text-[10px] uppercase tracking-[0.15em] text-neon/50 transition-colors hover:text-neon'
                    >
                      [ Clear filters ]
                    </button>
                  )}
                </div>
                <div className={`flex flex-wrap gap-2 ${tagsOpen ? 'flex' : 'hidden lg:flex'}`}>
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
                        className={`
                        inline-flex items-baseline gap-1.5 rounded-sm border px-3 py-1 font-ocr text-xs uppercase tracking-wider transition-all duration-200
                        ${
                          on
                            ? 'border-neon bg-neon/25 text-neon [text-shadow:var(--terminal-strong-glow)] [box-shadow:0_0_12px_rgb(var(--neon)/0.4)]'
                            : 'border-neon/25 text-text/60 hover:border-neon/50 hover:bg-neon/5 hover:text-neon'
                        }
                      `}
                      >
                        <span>{tag}</span>
                        {n != null && n > 0 && (
                          <span className='font-ocr text-xs tabular-nums normal-case text-text/30'>{n}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className='mb-6 h-px bg-neon/10' />

          <p className='mb-6 font-ocr text-xs uppercase tracking-wide text-text/50'>
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
                    className='group flex h-full flex-col rounded-sm border border-neon/15 bg-panel/20 transition-all duration-200 hover:border-neon/35 hover:bg-panel/40'
                  >
                    <div className='relative aspect-[16/10] overflow-hidden border-b border-neon/10 bg-panel/30'>
                      <OptimizedImage
                        src={img}
                        alt=''
                        className='h-full w-full object-cover opacity-90 transition group-hover:opacity-100'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      />
                      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-transparent' />
                    </div>
                    <div className='flex flex-1 flex-col p-4'>
                      <h2 className='font-ibm text-lg uppercase leading-snug tracking-[0.03em] text-text group-hover:text-neon'>
                        {p.title}
                      </h2>
                      {p.description && (
                        <p className='mt-2 flex-1 font-ibm text-sm leading-6 text-text/75'>
                          {p.description}
                        </p>
                      )}
                      <span className='mt-4 inline-flex items-center gap-1 font-ocr text-xs uppercase tracking-wider text-neon/50 transition-colors group-hover:text-neon'>
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
                className='inline-flex items-center rounded-sm border border-neon/25 px-6 py-3 font-ocr text-xs uppercase tracking-wider text-text/70 transition-all duration-200 hover:border-neon/50 hover:text-neon'
              >
                Show more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className='rounded-sm border border-neon/10 bg-panel/20 p-8 text-center font-ibm text-text/70'>
              No projects match your filters. Try clearing tags or shortening the search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
