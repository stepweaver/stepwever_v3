'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { HUDPanel } from '@/components/ui/HUDPanel';

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
          <HUDPanel title="Stephen Weaver" id="CODEX-00" className="p-6 md:p-8 mb-8">
            <p className="text-text text-lg md:text-xl leading-relaxed mb-6">
              I'm Stephen. Developer, veteran, and perpetual learner. This is my digital codex: thoughts and things I'm exploring.
            </p>
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
              <span className="text-neon animate-blink" aria-hidden>_</span>
              <span className="text-text/60">·</span>
              <Link
                href="/meshtastic"
                className="text-text hover:text-neon transition-colors underline underline-offset-2"
              >
                Meshtastic image.png
              </Link>
            </nav>
          </HUDPanel>

          {loading ? (
            <div className="flex justify-center items-center min-h-64">
              <div className="text-neon font-ibm text-lg animate-pulse">Loading...</div>
            </div>
          ) : error ? (
            <div className="border border-neon/30 rounded-lg bg-panel/50 backdrop-blur-xl text-neon p-4 my-4">
              {error}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 max-w-4xl">
                {/* Mobile: TAGS above post list */}
                {filteredHashtags.length > 0 && (
                  <div className="mb-8 lg:hidden">
                    <HUDPanel title="Tags" id="CODEX-TAGS" className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleHashtagClick(tag)}
                              className={`px-3 py-1 text-sm rounded-lg transition-colors font-medium cursor-pointer ${
                                activeHashtags.includes(tag)
                                  ? 'bg-neon/20 text-neon border border-neon/50'
                                  : 'bg-text/10 text-text hover:text-neon hover:bg-neon/10'
                              }`}
                            >
                              #{tag} {count}
                            </button>
                          );
                        })}
                      </div>
                    </HUDPanel>
                  </div>
                )}

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

              {filteredHashtags.length > 0 && (
                <div className="w-72 flex-shrink-0 hidden lg:block">
                  <HUDPanel title="Tags" id="CODEX-TAGS" className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {filteredHashtags.map((tag) => {
                        const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleHashtagClick(tag)}
                            className={`px-3 py-1 text-sm rounded-lg transition-colors font-medium cursor-pointer ${
                              activeHashtags.includes(tag)
                                ? 'bg-neon/20 text-neon border border-neon/50'
                                : 'bg-text/10 text-text hover:text-neon hover:bg-neon/10'
                            }`}
                          >
                            #{tag} {count}
                          </button>
                        );
                      })}
                    </div>
                  </HUDPanel>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostItem({ post, index, formatDate, onHashtagClick }) {
  const [hoveredTag, setHoveredTag] = useState(null);
  const typeColor = 'var(--neon)';

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    onHashtagClick?.(tag);
  };

  return (
    <HUDPanel
      title={post.title}
      id={`CODEX-${String(index + 1).padStart(2, '0')}`}
      className="p-5 transition-all duration-200 hover:border-neon/40"
    >
      <a href={`/codex/${post.slug}`} className="block group">
        <div className="text-text text-sm mb-3 font-ocr font-medium">
          Published: {formatDate(post.date)}
          {post.updated && post.updated !== post.date && (
            <span className="text-neon ml-3">| Updated: {formatDate(post.updated)}</span>
          )}
        </div>
        <p className="text-text mb-3 leading-relaxed text-sm font-ocr">{post.description}</p>
        {post.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                role="button"
                tabIndex={0}
                className="px-3 py-1 text-sm rounded-lg font-medium transition-colors cursor-pointer"
                style={{
                  backgroundColor: hoveredTag === tag ? `color-mix(in srgb, ${typeColor} 20%, transparent)` : `color-mix(in srgb, ${typeColor} 10%, transparent)`,
                  color: hoveredTag === tag ? typeColor : 'var(--text)',
                  border: `1px solid color-mix(in srgb, ${typeColor} 30%, transparent)`,
                }}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
                onClick={(e) => handleTagClick(e, tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </HUDPanel>
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
              <div className="text-neon text-xl font-mono">Loading...</div>
            </div>
          </div>
        </div>
      }
    >
      <CodexContent />
    </Suspense>
  );
}
