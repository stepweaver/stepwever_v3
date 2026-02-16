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
        const res = await fetch('/api/codex');
        if (!res.ok) throw new Error('Failed to fetch content');
        const data = await res.json();
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
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16">
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
              <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
                <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>INDEXING CODEX...</div>
                <div className='mt-4 space-y-3'>
                  <div className='h-4 bg-neon/10 w-3/4' />
                  <div className='h-4 bg-neon/10 w-1/2' />
                  <div className='h-4 bg-neon/10 w-2/3' />
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="border border-neon/30 rounded-sm bg-panel/50 backdrop-blur-xl text-neon p-4 my-4">
              {error}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 max-w-4xl">
                {/* Mobile: TAGS + PROJECTS above post list */}
                <div className="mb-8 lg:hidden bg-panel/40 backdrop-blur-sm p-4 rounded-sm">
                  {filteredHashtags.length > 0 && (
                    <>
                      <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3">FILTER BY TAG</p>
                      <div className="flex flex-wrap gap-2">
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleHashtagClick(tag)}
                              className={`px-3 py-1 text-sm rounded-sm transition-colors font-medium cursor-pointer border ${
                                activeHashtags.includes(tag)
                                  ? 'bg-neon/20 text-neon border-neon/50'
                                  : 'border-neon/20 bg-panel/50 text-text hover:text-neon hover:bg-neon/10 hover:border-neon/40'
                              }`}
                            >
                              #{tag} <span className="text-text/40 text-xs">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                      {activeHashtags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveHashtags([])}
                          className="mt-3 text-xs text-neon/60 hover:text-neon font-ocr cursor-pointer transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                      <div className="border-t border-neon/10 my-3" />
                    </>
                  )}
                  <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3">PROJECTS</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/meshtastic" className="px-3 py-1 text-sm rounded-sm border border-neon/20 bg-panel/50 text-text hover:text-neon hover:bg-neon/10 hover:border-neon/40 transition-colors font-medium">
                      Meshtastic
                    </Link>
                    <Link href="/terminal" className="px-3 py-1 text-sm rounded-sm border border-neon/20 bg-panel/50 text-text hover:text-neon hover:bg-neon/10 hover:border-neon/40 transition-colors font-medium">
                      Terminal
                    </Link>
                    <Link href="/dice-roller" className="px-3 py-1 text-sm rounded-sm border border-neon/20 bg-panel/50 text-text hover:text-neon hover:bg-neon/10 hover:border-neon/40 transition-colors font-medium">
                      Dice Roller
                    </Link>
                  </div>
                </div>

                <div className="space-y-8">
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
                    <div className="text-center py-12 text-text/70">
                      <p>No posts found with the current filters.</p>
                      <button
                        type="button"
                        onClick={() => setActiveHashtags([])}
                        className="text-neon hover:text-accent transition-colors mt-2 cursor-pointer"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop sidebar — always visible */}
              <div className="w-72 flex-shrink-0 hidden lg:block">
                <div className="sticky top-28 space-y-4">
                  {/* Tag filter */}
                  {filteredHashtags.length > 0 && (
                    <div className="bg-panel/40 backdrop-blur-sm p-4 rounded-sm">
                      <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3">FILTER BY TAG</p>
                      <div className="flex flex-wrap gap-2">
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleHashtagClick(tag)}
                              className={`px-3 py-1 text-sm rounded-sm transition-colors font-medium cursor-pointer border ${
                                activeHashtags.includes(tag)
                                  ? 'bg-neon/20 text-neon border-neon/50'
                                  : 'border-neon/20 bg-panel/50 text-text hover:text-neon hover:bg-neon/10 hover:border-neon/40'
                              }`}
                            >
                              #{tag} <span className="text-text/40 text-xs">{count}</span>
                            </button>
                          );
                        })}
                      </div>
                      {activeHashtags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveHashtags([])}
                          className="mt-3 text-xs text-neon/60 hover:text-neon font-ocr cursor-pointer transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  )}

                  {/* Projects quick-nav */}
                  <div className="bg-panel/40 backdrop-blur-sm p-4 rounded-sm">
                    <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-3">PROJECTS</p>
                    <div className="space-y-1">
                      <Link href="/meshtastic" className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-text hover:text-neon hover:bg-neon/10 transition-colors font-medium group">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/40 group-hover:bg-neon transition-colors shrink-0" />
                        Meshtastic
                      </Link>
                      <Link href="/terminal" className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-text hover:text-neon hover:bg-neon/10 transition-colors font-medium group">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/40 group-hover:bg-neon transition-colors shrink-0" />
                        Terminal
                      </Link>
                      <Link href="/dice-roller" className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-text hover:text-neon hover:bg-neon/10 transition-colors font-medium group">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon/40 group-hover:bg-neon transition-colors shrink-0" />
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
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16">
            <div className="max-w-4xl mx-auto mt-16">
              <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
                <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>INDEXING CODEX...</div>
                <div className='mt-4 space-y-3'>
                  <div className='h-4 bg-neon/10 w-3/4' />
                  <div className='h-4 bg-neon/10 w-1/2' />
                  <div className='h-4 bg-neon/10 w-2/3' />
                </div>
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
