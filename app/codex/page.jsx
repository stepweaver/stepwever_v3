'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PostItem from '@/components/Codex/PostItem';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

function CodexContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeHashtags, setActiveHashtags] = useState([]);

  useEffect(() => {
    const hashtagParam = searchParams.get('hashtag');
    if (hashtagParam) setActiveHashtags([hashtagParam]);
  }, [searchParams]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const MIN_DISPLAY_MS = 2400;
        const start = Date.now();
        const res = await fetch('/api/codex');
        if (!res.ok) throw new Error('Failed to fetch content');
        const data = await res.json();
        const elapsed = Date.now() - start;
        if (elapsed < MIN_DISPLAY_MS) {
          await new Promise((r) => setTimeout(r, MIN_DISPLAY_MS - elapsed));
        }
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setPosts([]);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const allPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = a.updated ? new Date(a.updated) : new Date(a.date);
      const dateB = b.updated ? new Date(b.updated) : new Date(b.date);
      return dateB - dateA;
    });
  }, [posts]);

  const filteredHashtags = useMemo(() => {
    const tags = new Set();
    allPosts.forEach((post) => {
      if (post.hashtags) post.hashtags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (activeHashtags.length === 0) return allPosts;
    return allPosts.filter((post) => {
      const postTags = post.hashtags || [];
      return activeHashtags.some((tag) => postTags.includes(tag));
    });
  }, [allPosts, activeHashtags]);

  const handleHashtagClick = (tag) => {
    setActiveHashtags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-').map((part) => part.replace(/[^0-9]/g, ''));
      if (!year || !month || !day) return dateStr;
      const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, '0');
      const d = String(date.getUTCDate()).padStart(2, '0');
      return `[${y}-${m}-${d}]`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="mb-12 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] text-neon/60 font-ocr uppercase">
                CODEX &mdash; CODEX-00
              </p>
              <h1 className="font-ibm text-4xl sm:text-5xl md:text-6xl font-bold text-text leading-tight">
                Digital codex.
              </h1>
              <p className="font-ocr text-base sm:text-lg md:text-xl text-text/70 leading-relaxed max-w-3xl">
                Thoughts and things I&apos;m exploring &mdash; developer notes, projects, and community contributions.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-2 font-ibm text-neon text-lg" aria-label="Breadcrumb">
              <span className="text-neon">user@stepweaver</span>
              <span className="text-text">~</span>
              <span className="text-text">/</span>
              <button
                type="button"
                onClick={() => setActiveHashtags([])}
                className="text-text hover:text-neon transition-colors cursor-pointer"
              >
                codex
              </button>
              <span className="text-neon motion-safe:animate-blink" aria-hidden>_</span>
            </nav>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-neon/40 via-neon/10 to-transparent" />
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-64">
              <div className='hud-panel p-8 sm:p-10 max-w-md w-full space-y-5 motion-safe:animate-[hudFadeIn_0.3s_ease-out]'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='text-[10px] tracking-[0.3em] text-neon/50 font-ocr uppercase'>MODULE</p>
                    <p className='text-sm tracking-[0.18em] text-neon/80 font-ocr uppercase mt-0.5'>CODEX // INDEX</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] tracking-[0.22em] text-neon/50 font-ocr uppercase'>CLEARANCE</p>
                    <p className='text-xs font-mono text-terminal-yellow mt-0.5'>LVL-3</p>
                  </div>
                </div>
                <div className='font-mono text-xs space-y-1.5 text-neon/60'>
                  <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.2s_both]'>
                    <span className='text-neon/40'>{'>'}</span> indexing archive manifest&hellip;
                  </p>
                  <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.6s_both]'>
                    <span className='text-neon/40'>{'>'}</span> cross-referencing tags
                  </p>
                  <p className='text-neon/30 motion-safe:animate-[hudLineIn_0.3s_ease-out_1.0s_both]'>
                    <span className='text-neon/40'>{'>'}</span> compiling entry list
                    <span className='terminal-caret ml-0.5 text-terminal-green'>&#9608;</span>
                  </p>
                </div>
                <div className='space-y-1.5 motion-safe:animate-[hudFadeIn_0.4s_ease-out_1.3s_both]'>
                  <div className='relative h-[2px] w-full bg-neon/10 overflow-hidden rounded-full'>
                    <div className='absolute inset-y-0 left-0 w-1/3 bg-terminal-green rounded-full motion-safe:animate-[hudSlide_1.2s_ease-in-out_infinite]' />
                  </div>
                  <p className='text-[10px] tracking-[0.18em] text-neon/40 font-ocr uppercase text-right'>ARCHIVE_SCAN ACTIVE</p>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="border border-neon/30 rounded-sm bg-panel/50 text-neon p-4 my-4">
              {error}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main content */}
              <div className="flex-1 max-w-4xl">
                {/* Mobile: TAGS + PROJECTS above post list */}
                <div className="mb-8 lg:hidden">
                  {filteredHashtags.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[10px] tracking-[0.25em] text-neon/50 font-ocr uppercase mb-3">
                        FILTER BY TAG
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                          const isActive = activeHashtags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleHashtagClick(tag)}
                              className={`
                                px-3 py-1 text-xs font-ocr tracking-wider uppercase
                                border rounded-sm transition-all duration-200 cursor-pointer
                                ${isActive
                                  ? 'border-neon/70 text-neon bg-neon/15 [text-shadow:var(--terminal-text-glow)]'
                                  : 'border-neon/25 text-text/60 hover:border-neon/50 hover:text-neon hover:bg-neon/5'
                                }
                              `}
                            >
                              #{tag} <span className="text-text/30 ml-1">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                      {activeHashtags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveHashtags([])}
                          className="mt-3 text-[10px] tracking-[0.15em] text-neon/50 hover:text-neon font-ocr cursor-pointer transition-colors uppercase"
                        >
                          [ CLEAR FILTERS ]
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-[10px] tracking-[0.25em] text-neon/50 font-ocr uppercase mb-3">
                    PROJECTS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/meshtastic" className="px-3 py-1 text-xs font-ocr tracking-wider uppercase border border-neon/25 text-text/60 rounded-sm hover:border-neon/50 hover:text-neon hover:bg-neon/5 transition-all duration-200">
                      Meshtastic
                    </Link>
                    <Link href="/terminal" className="px-3 py-1 text-xs font-ocr tracking-wider uppercase border border-neon/25 text-text/60 rounded-sm hover:border-neon/50 hover:text-neon hover:bg-neon/5 transition-all duration-200">
                      Terminal
                    </Link>
                    <Link href="/dice-roller" className="px-3 py-1 text-xs font-ocr tracking-wider uppercase border border-neon/25 text-text/60 rounded-sm hover:border-neon/50 hover:text-neon hover:bg-neon/5 transition-all duration-200">
                      Dice Roller
                    </Link>
                  </div>
                  <div className="h-px bg-neon/10 mt-6" />
                </div>

                {/* Post list */}
                <div>
                  {filteredPosts.map((post, index) => (
                    <PostItem
                      key={`${post.slug}-${index}`}
                      post={post}
                      index={index}
                      formatDate={formatDate}
                      onHashtagClick={handleHashtagClick}
                    />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-16 border border-neon/10 bg-panel/20">
                      <p className="font-ocr text-text/50 text-sm tracking-wide uppercase mb-3">
                        No entries match current filters
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveHashtags([])}
                        className="font-ocr text-xs tracking-[0.15em] text-neon/60 hover:text-neon transition-colors cursor-pointer uppercase"
                      >
                        [ CLEAR FILTERS ]
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop sidebar */}
              <div className="w-72 flex-shrink-0 hidden lg:block">
                <div className="sticky top-28 space-y-8">
                  {/* Tag filter */}
                  {filteredHashtags.length > 0 && (
                    <div>
                      <p className="text-[10px] tracking-[0.25em] text-neon/50 font-ocr uppercase mb-4">
                        FILTER BY TAG
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                          const isActive = activeHashtags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleHashtagClick(tag)}
                              className={`
                                px-3 py-1 text-xs font-ocr tracking-wider uppercase
                                border rounded-sm transition-all duration-200 cursor-pointer
                                ${isActive
                                  ? 'border-neon/70 text-neon bg-neon/15 [text-shadow:var(--terminal-text-glow)]'
                                  : 'border-neon/25 text-text/60 hover:border-neon/50 hover:text-neon hover:bg-neon/5'
                                }
                              `}
                            >
                              #{tag} <span className="text-text/30 ml-1">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                      {activeHashtags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveHashtags([])}
                          className="mt-4 text-[10px] tracking-[0.15em] text-neon/50 hover:text-neon font-ocr cursor-pointer transition-colors uppercase"
                        >
                          [ CLEAR FILTERS ]
                        </button>
                      )}
                    </div>
                  )}

                  {/* Projects quick-nav */}
                  <div>
                    <p className="text-[10px] tracking-[0.25em] text-neon/50 font-ocr uppercase mb-4">
                      PROJECTS
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/meshtastic"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-text/70 hover:text-neon transition-colors duration-200 font-ocr tracking-wide group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/30 group-hover:bg-neon transition-colors shrink-0" />
                        Meshtastic
                      </Link>
                      <Link
                        href="/terminal"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-text/70 hover:text-neon transition-colors duration-200 font-ocr tracking-wide group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/30 group-hover:bg-neon transition-colors shrink-0" />
                        Terminal
                      </Link>
                      <Link
                        href="/dice-roller"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-text/70 hover:text-neon transition-colors duration-200 font-ocr tracking-wide group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/30 group-hover:bg-neon transition-colors shrink-0" />
                        Dice Roller
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CodexPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen relative">
          <BackgroundCanvas />
          <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
            <div className='hud-panel p-8 sm:p-10 max-w-md w-full space-y-5 motion-safe:animate-[hudFadeIn_0.3s_ease-out]'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-[10px] tracking-[0.3em] text-neon/50 font-ocr uppercase'>MODULE</p>
                  <p className='text-sm tracking-[0.18em] text-neon/80 font-ocr uppercase mt-0.5'>CODEX // INDEX</p>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] tracking-[0.22em] text-neon/50 font-ocr uppercase'>CLEARANCE</p>
                  <p className='text-xs font-mono text-terminal-yellow mt-0.5'>LVL-3</p>
                </div>
              </div>
              <div className='font-mono text-xs space-y-1.5 text-neon/60'>
                <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.2s_both]'>
                  <span className='text-neon/40'>{'>'}</span> initializing codex module&hellip;
                </p>
                <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.6s_both]'>
                  <span className='text-neon/40'>{'>'}</span> loading search params
                </p>
                <p className='text-neon/30 motion-safe:animate-[hudLineIn_0.3s_ease-out_1.0s_both]'>
                  <span className='text-neon/40'>{'>'}</span> standby
                  <span className='terminal-caret ml-0.5 text-terminal-green'>&#9608;</span>
                </p>
              </div>
              <div className='space-y-1.5 motion-safe:animate-[hudFadeIn_0.4s_ease-out_1.3s_both]'>
                <div className='relative h-[2px] w-full bg-neon/10 overflow-hidden rounded-full'>
                  <div className='absolute inset-y-0 left-0 w-1/3 bg-terminal-green rounded-full motion-safe:animate-[hudSlide_1.2s_ease-in-out_infinite]' />
                </div>
                <p className='text-[10px] tracking-[0.18em] text-neon/40 font-ocr uppercase text-right'>MODULE_INIT</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <CodexContent />
    </Suspense>
  );
}
