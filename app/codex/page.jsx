'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

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

  const codexGreen = '0, 255, 65';
  const getGlowStyle = () => ({
    textShadow: `0 0 2px rgba(${codexGreen}, 0.8), 0 0 7px rgba(${codexGreen}, 0.8), 0 0 11px rgba(${codexGreen}, 0.6)`,
  });

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mt-20 mb-36">
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neon mb-8 md:mb-20 font-ibm whitespace-nowrap">
              Stephen Weaver
            </h1>
            <p className="max-w-5xl text-text text-lg md:text-4xl leading-relaxed">
              I'm Stephen. Developer, veteran, and perpetual learner. This is my digital codex: thoughts and things I'm exploring.
            </p>
          </div>

          <div className="mb-8 text-2xl">
            <nav className="flex items-center font-ibm text-neon">
              <span className="text-neon">user@stepweaver</span>
              <span className="text-text ml-2">~</span>
              <span className="text-text">/</span>
              <button
                onClick={() => setActiveHashtags([])}
                className="text-text hover:text-neon transition-colors cursor-pointer"
              >
                codex
              </button>
              <span className="text-neon ml-2 animate-blink">_</span>
            </nav>
          </div>

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
                  <div className="mb-8 pb-6 border-b border-neon/20 lg:hidden">
                    <h3 className="text-text font-bold uppercase text-sm mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredHashtags.map((tag) => {
                        const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                        return (
                          <button
                            key={tag}
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
                  </div>
                )}

                <div className="space-y-20">
                  {filteredPosts.map((post, index) => (
                    <PostItem
                      key={`${post.slug}-${index}`}
                      post={post}
                      formatDate={formatDate}
                      getGlowStyle={getGlowStyle}
                      onHashtagClick={handleHashtagClick}
                    />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-terminal-dimmed">
                      <p>No posts found with the current filters.</p>
                      <button
                        onClick={() => setActiveHashtags([])}
                        className="text-terminal-green hover:text-terminal-white transition-colors mt-2 cursor-pointer"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {filteredHashtags.length > 0 && (
                <div className="w-72 flex-shrink-0 hidden lg:block">
                  <h3 className="text-terminal-text font-bold uppercase text-sm mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {filteredHashtags.map((tag) => {
                      const count = allPosts.filter((p) => p.hashtags?.includes(tag)).length;
                      return (
                        <button
                          key={tag}
                          onClick={() => handleHashtagClick(tag)}
                          className={`px-3 py-1 text-sm rounded transition-colors font-medium cursor-pointer ${
                            activeHashtags.includes(tag)
                              ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/50'
                              : 'bg-terminal-text/10 text-terminal-text hover:text-terminal-green hover:bg-terminal-green/10'
                          }`}
                        >
                          #{tag} {count}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostItem({ post, formatDate, getGlowStyle, onHashtagClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const typeColor = 'var(--neon)';

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    onHashtagClick?.(tag);
  };

  return (
    <article className="group">
      <a
        href={`/codex/${post.slug}`}
        className="block py-0.5 px-2 rounded-sm hover:bg-terminal-dimmed/5 transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2
          className="text-2xl font-bold mb-2 transition-all duration-200 text-neon"
          style={isHovered ? getGlowStyle() : {}}
        >
          {post.title}
        </h2>
        <div className="text-terminal-text text-sm mb-3 font-medium">
          Published: {formatDate(post.date)}
          {post.updated && post.updated !== post.date && (
            <span className="text-terminal-green ml-3">| Updated: {formatDate(post.updated)}</span>
          )}
        </div>
        <p className="text-terminal-text mb-3 leading-relaxed">{post.description}</p>
        {post.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
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
    </article>
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
