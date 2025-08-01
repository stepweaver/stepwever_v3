'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import GlitchLambda from '@/components/ui/GlitchLambda';

function CodexContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [activeHashtags, setActiveHashtags] = useState([]);

  // Handle URL hashtag parameter
  useEffect(() => {
    const hashtagParam = searchParams.get('hashtag');
    if (hashtagParam) {
      setActiveHashtags([hashtagParam]);
      setActiveTab('all'); // Ensure we're on the 'all' tab to see all posts
    }
  }, [searchParams]);

  // Fetch all posts from API
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/codex');
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Fetch podcast episodes when podcasts tab is active
  useEffect(() => {
    if (activeTab === 'podcasts') {
      // Set default sub-tab if none is selected
      if (!activeSubTab) {
        setActiveSubTab('syntaxfm');
        return; // Don't fetch until sub-tab is set
      }

      async function fetchPodcasts() {
        try {
          const res = await fetch(`/api/rss?source=${activeSubTab}`);
          if (!res.ok) {
            throw new Error('Failed to fetch podcast episodes');
          }
          const data = await res.json();
          setPodcastEpisodes(data.items || []);
        } catch (error) {
          console.error('Error fetching podcast episodes:', error);
          setPodcastEpisodes([]);
        }
      }
      fetchPodcasts();
    }
  }, [activeTab, activeSubTab]);

  // Fetch articles when article tab is active
  useEffect(() => {
    if (activeTab === 'articles') {
      // Set default sub-tab if none is selected
      if (!activeSubTab) {
        setActiveSubTab('itjungle');
        return; // Don't fetch until sub-tab is set
      }

      async function fetchArticles() {
        try {
          const res = await fetch(`/api/rss?source=${activeSubTab}`);
          if (!res.ok) {
            throw new Error('Failed to fetch articles');
          }
          const data = await res.json();
          setPodcastEpisodes(data.items || []); // Reuse the same state
        } catch (error) {
          console.error('Error fetching articles:', error);
          setPodcastEpisodes([]);
        }
      }
      fetchArticles();
    }
  }, [activeTab, activeSubTab]);

  // Sort all posts by date descending
  const allPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = a.updated ? new Date(a.updated) : new Date(a.date);
      const dateB = b.updated ? new Date(b.updated) : new Date(b.date);
      return dateB - dateA;
    });
  }, [posts]);

  // Get all unique hashtags for filter buttons - always show ALL hashtags from ALL posts
  const filteredHashtags = useMemo(() => {
    const tags = new Set();

    // Always use allPosts to get ALL hashtags from ALL posts
    allPosts.forEach((post) => {
      if (post.hashtags) {
        post.hashtags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allPosts]);

  // Filter content based on selected filters
  const filteredPosts = useMemo(() => {
    let result = allPosts;

    // If hashtags are selected, show ALL posts with those hashtags across ALL categories
    if (activeHashtags.length > 0) {
      result = result.filter((post) => {
        const postTags = post.hashtags || [];
        return activeHashtags.some((tag) => postTags.includes(tag));
      });
    } else {
      // If no hashtags selected, filter by active tab (except 'all' which shows everything)
      if (activeTab !== 'all') {
        result = result.filter((post) => post.type === activeTab);
      }
      // If activeTab is 'all', don't filter by type - show all posts
    }

    return result;
  }, [allPosts, activeTab, activeHashtags]);

  // Handle hashtag click
  const handleHashtagClick = (tag) => {
    // Clear active tab when hashtags are selected to show all posts
    if (activeTab !== 'all') {
      setActiveTab('all');
    }

    setActiveHashtags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `[${year}-${month}-${day}]`;
    } catch (e) {
      return dateStr;
    }
  };

  // Get type color helper
  const getTypeColor = (type) => {
    const colors = {
      blog: 'text-terminal-green',
      projects: 'text-terminal-magenta',
      articles: 'text-terminal-yellow',
      tools: 'text-terminal-cyan',
      community: 'text-terminal-blue',
      podcasts: 'text-terminal-purple',
    };
    return colors[type] || 'text-terminal-text';
  };

  // Get glow style helper (from stepweaver)
  const getGlowStyle = (type) => {
    const glowColors = {
      blog: '0, 255, 65', // terminal-green
      projects: '255, 85, 255', // terminal-magenta
      articles: '255, 255, 0', // terminal-yellow
      tools: '86, 182, 194', // terminal-cyan
      community: '56, 190, 255', // terminal-blue
      podcasts: '168, 85, 247', // terminal-purple
    };

    const color = glowColors[type] || '0, 255, 65';
    return {
      textShadow: `0 0 2px rgba(${color}, 0.8), 
                   0 0 7px rgba(${color}, 0.8), 
                   0 0 11px rgba(${color}, 0.6)`,
    };
  };

  // Get type color value helper (from stepweaver)
  const getTypeColorValue = (type) => {
    const colorMap = {
      blog: 'var(--color-terminal-green)', // terminal-green
      projects: 'var(--color-terminal-magenta)', // terminal-magenta
      articles: 'var(--color-terminal-yellow)', // terminal-yellow
      tools: 'var(--color-terminal-cyan)', // terminal-cyan
      community: 'var(--color-terminal-blue)', // terminal-blue
      podcasts: 'var(--color-terminal-purple)', // terminal-purple
      all: 'var(--color-terminal-green)', // Default to green
    };

    return colorMap[type] || colorMap.all;
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'blog', label: 'Blog' },
    { id: 'projects', label: 'Projects' },
    { id: 'articles', label: 'Articles' },
    { id: 'tools', label: 'Tools' },
    { id: 'community', label: 'Community' },
    { id: 'podcasts', label: 'Podcasts' },
  ];

  const podcastSubTabs = [
    {
      id: 'syntaxfm',
      label: 'Syntax.fm',
      color: 'text-terminal-purple',
      glowColor: '168, 85, 247',
    },
    {
      id: 'coming-soon',
      label: 'Coming Soon',
      color: 'text-terminal-purple',
      glowColor: '168, 85, 247',
    },
  ];

  const articleSubTabs = [
    {
      id: 'itjungle',
      label: 'IT Jungle',
      color: 'text-terminal-yellow',
      glowColor: '255, 255, 0',
    },
    {
      id: 'coming-soon',
      label: 'Coming Soon',
      color: 'text-terminal-yellow',
      glowColor: '255, 255, 0',
    },
  ];

  return (
    <div className='min-h-screen relative'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4'>
        <div className='max-w-7xl mx-auto'>
          {/* Page Title */}
          <div className='text-center mt-20 mb-36'>
            <h1 className='text-5xl md:text-6xl font-bold text-terminal-green mb-8 md:mb-20 font-ibm'>
              Stephen Weaver
            </h1>
            <p className='max-w-5xl mx-auto text-terminal-text text-lg md:text-4xl leading-relaxed'>
              I'm Stephen, founder of{' '}
              <GlitchLambda className='text-terminal-text' />
              stepweaver. I don't follow the script-I build my own and help
              others do the same.
            </p>
          </div>

          {/* Breadcrumbs */}
          <div className='mb-8 text-2xl'>
            <nav className='flex items-center font-ibm text-terminal-green'>
              <span className='text-terminal-green'>user@stepweaver</span>
              <span className='text-terminal-text ml-2'>~</span>
              <span className='text-terminal-dimmed'>/</span>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setActiveSubTab(null);
                  setActiveHashtags([]);
                }}
                className='text-terminal-text hover:text-terminal-green transition-colors cursor-pointer'
              >
                codex
              </button>
              {activeTab !== 'all' && (
                <>
                  <span className='text-terminal-dimmed'>/</span>
                  <span className='text-terminal-text'>{activeTab}</span>
                </>
              )}
              {activeTab === 'podcasts' && activeSubTab && (
                <>
                  <span className='text-terminal-dimmed'>/</span>
                  <span className='text-terminal-text'>
                    {podcastSubTabs
                      .find((tab) => tab.id === activeSubTab)
                      ?.label.toLowerCase()}
                  </span>
                </>
              )}
              {activeTab === 'articles' && activeSubTab && (
                <>
                  <span className='text-terminal-dimmed'>/</span>
                  <span className='text-terminal-text'>
                    {articleSubTabs
                      .find((tab) => tab.id === activeSubTab)
                      ?.label.toLowerCase()}
                  </span>
                </>
              )}
              <span className='text-terminal-green ml-2 animate-blink'>_</span>
            </nav>
          </div>

          {/* Display loading or error state */}
          {loading ? (
            <div className='flex justify-center items-center min-h-64'>
              <div className='text-terminal-green font-ibm text-lg animate-pulse'>
                Loading...
              </div>
            </div>
          ) : error ? (
            <div className='border border-terminal-red/50 bg-terminal-red/10 text-terminal-red p-4 my-4 rounded'>
              {error}
            </div>
          ) : (
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Main Content */}
              <div className='flex-1 max-w-4xl'>
                {activeTab === 'podcasts' ? (
                  <div className='space-y-8'>
                    {/* Podcast Sub-tabs */}
                    <div className='mb-8'>
                      <div className='flex flex-wrap gap-2'>
                        {podcastSubTabs.map((subTab) => (
                          <button
                            key={subTab.id}
                            onClick={() => setActiveSubTab(subTab.id)}
                            className={`
                              px-4 py-2 rounded transition-all duration-200 cursor-pointer font-ibm
                              ${
                                activeSubTab === subTab.id
                                  ? `${subTab.color} bg-terminal-cyan/10 border border-terminal-cyan/20 shadow-lg shadow-terminal-cyan/20`
                                  : 'text-terminal-text hover:text-terminal-cyan hover:bg-terminal-dimmed/10 border border-transparent'
                              }
                            `}
                          >
                            <span className='font-medium'>{subTab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Podcast Episodes */}
                    <div className='space-y-12'>
                      {activeSubTab === 'coming-soon' ? (
                        <div className='text-center py-12'>
                          <div className='text-terminal-yellow text-2xl font-bold mb-4'>
                            🎧 More Podcasts Coming Soon!
                          </div>
                          <p className='text-terminal-text text-lg mb-6'>
                            I'm curating more amazing podcasts to share with
                            you.
                          </p>
                          <div className='bg-terminal-yellow/10 border border-terminal-yellow/20 rounded-lg p-6 max-w-2xl mx-auto'>
                            <p className='text-terminal-text'>
                              Stay tuned for more developer podcasts, tech
                              discussions, and industry insights. Each podcast
                              will be carefully selected to provide value and
                              keep you up-to-date with the latest in web
                              development and technology.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {podcastEpisodes
                            .slice(0, 10)
                            .map((episode, index) => (
                              <PodcastEpisodeItem
                                key={`${episode.guid || index}`}
                                episode={episode}
                                formatDate={formatDate}
                                getGlowStyle={getGlowStyle}
                                podcastColor={
                                  podcastSubTabs.find(
                                    (p) => p.id === activeSubTab
                                  )?.glowColor || '0, 255, 255'
                                }
                              />
                            ))}

                          {podcastEpisodes.length === 0 && (
                            <div className='text-center py-12 text-terminal-dimmed'>
                              <p>No episodes available at the moment.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : activeTab === 'articles' ? (
                  <div className='space-y-8'>
                    {/* Article Sub-tabs */}
                    <div className='mb-8'>
                      <div className='flex flex-wrap gap-2'>
                        {articleSubTabs.map((subTab) => (
                          <button
                            key={subTab.id}
                            onClick={() => setActiveSubTab(subTab.id)}
                            className={`
                              px-4 py-2 rounded transition-all duration-200 cursor-pointer font-ibm
                              ${
                                activeSubTab === subTab.id
                                  ? `${subTab.color} bg-terminal-magenta/10 border border-terminal-magenta/20 shadow-lg shadow-terminal-magenta/20`
                                  : 'text-terminal-text hover:text-terminal-magenta hover:bg-terminal-dimmed/10 border border-transparent'
                              }
                            `}
                          >
                            <span className='font-medium'>{subTab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Articles */}
                    <div className='space-y-12'>
                      {activeSubTab === 'coming-soon' ? (
                        <div className='text-center py-12'>
                          <div className='text-terminal-yellow text-2xl font-bold mb-4'>
                            📰 More Articles Coming Soon!
                          </div>
                          <p className='text-terminal-text text-lg mb-6'>
                            I'm curating more amazing articles to share with
                            you.
                          </p>
                          <div className='bg-terminal-yellow/10 border border-terminal-yellow/20 rounded-lg p-6 max-w-2xl mx-auto'>
                            <p className='text-terminal-text'>
                              Stay tuned for more developer articles, tech
                              discussions, and industry insights. Each article
                              will be carefully selected to provide value and
                              keep you up-to-date with the latest in web
                              development and technology.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {podcastEpisodes
                            .slice(0, 10)
                            .map((article, index) => (
                              <ArticleItem
                                key={`${article.guid || index}`}
                                article={article}
                                formatDate={formatDate}
                                getGlowStyle={getGlowStyle}
                                articleColor={
                                  articleSubTabs.find(
                                    (a) => a.id === activeSubTab
                                  )?.glowColor || '255, 85, 255'
                                }
                              />
                            ))}

                          {podcastEpisodes.length === 0 && (
                            <div className='text-center py-12 text-terminal-dimmed'>
                              <p>No articles available at the moment.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='space-y-20'>
                    {filteredPosts.map((post, index) => (
                      <PostItem
                        key={`${post.slug}-${index}`}
                        post={post}
                        formatDate={formatDate}
                        getTypeColor={getTypeColor}
                        getGlowStyle={getGlowStyle}
                        getTypeColorValue={getTypeColorValue}
                        onHashtagClick={handleHashtagClick}
                      />
                    ))}

                    {filteredPosts.length === 0 && (
                      <div className='text-center py-12 text-terminal-dimmed'>
                        <p>No posts found with the current filters.</p>
                        <button
                          onClick={() => {
                            setActiveHashtags([]);
                          }}
                          className='text-terminal-green hover:text-terminal-white transition-colors mt-2 cursor-pointer'
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories and Tags moved to bottom on mobile only */}
                <div className='mt-16 pt-8 border-t border-terminal-dimmed/20 lg:hidden'>
                  {/* Categories */}
                  <div className='mb-8'>
                    <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                      Categories
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setActiveHashtags([]);
                          }}
                          className={`
                           px-3 py-2 rounded transition-colors cursor-pointer
                           ${
                             activeTab === tab.id
                               ? 'text-terminal-green bg-terminal-green/10 border border-terminal-green/20'
                               : 'text-terminal-text hover:text-terminal-green hover:bg-terminal-dimmed/10'
                           }
                         `}
                        >
                          <span className='capitalize font-medium'>
                            {tab.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {filteredHashtags.length > 0 && (
                    <div>
                      <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                        Tags
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {filteredHashtags.map((tag) => {
                          const count = allPosts.filter(
                            (post) =>
                              post.hashtags && post.hashtags.includes(tag)
                          ).length;
                          return (
                            <button
                              key={tag}
                              onClick={() => handleHashtagClick(tag)}
                              className={`
                                px-3 py-1 text-sm rounded transition-colors font-medium cursor-pointer
                                ${
                                  activeHashtags.includes(tag)
                                    ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/50'
                                    : 'bg-terminal-text/10 text-terminal-text hover:text-terminal-green hover:bg-terminal-green/10'
                                }
                              `}
                            >
                              #{tag} {count}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - Categories and Tags on desktop only */}
              <div className='w-72 flex-shrink-0 hidden lg:block'>
                {/* Categories */}
                <div className='mb-8'>
                  <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                    Categories
                  </h3>
                  <div className='space-y-2'>
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setActiveHashtags([]);
                        }}
                        className={`
                         flex items-center justify-between w-full text-left px-3 py-2 rounded transition-colors cursor-pointer
                         ${
                           activeTab === tab.id
                             ? 'text-terminal-green bg-terminal-green/10 border border-terminal-green/20'
                             : 'text-terminal-text hover:text-terminal-green hover:bg-terminal-dimmed/10'
                         }
                       `}
                      >
                        <span className='capitalize font-medium'>
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {filteredHashtags.length > 0 && (
                  <div>
                    <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                      Tags
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {filteredHashtags.map((tag) => {
                        const count = allPosts.filter(
                          (post) => post.hashtags && post.hashtags.includes(tag)
                        ).length;
                        return (
                          <button
                            key={tag}
                            onClick={() => handleHashtagClick(tag)}
                            className={`
                              px-3 py-1 text-sm rounded transition-colors font-medium cursor-pointer
                              ${
                                activeHashtags.includes(tag)
                                  ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/50'
                                  : 'bg-terminal-text/10 text-terminal-text hover:text-terminal-green hover:bg-terminal-green/10'
                              }
                            `}
                          >
                            #{tag} {count}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// PostItem component with glow effects (from stepweaver)
function PostItem({
  post,
  formatDate,
  getTypeColor,
  getGlowStyle,
  getTypeColorValue,
  onHashtagClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const typeColor = getTypeColor(post.type);
  const typeColorValue = getTypeColorValue(post.type);

  // Handle hashtag click to prevent post navigation
  const handleHashtagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    if (onHashtagClick) {
      onHashtagClick(tag);
    }
  };

  return (
    <article className='group'>
      <a
        href={`/codex/${post.type}/${post.slug}`}
        className='block py-0.5 px-2 rounded-sm hover:bg-terminal-dimmed/5 transition-all duration-200'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title */}
        <h2
          className={`text-2xl font-bold mb-2 transition-all duration-200 ${typeColor}`}
          style={isHovered ? getGlowStyle(post.type) : {}}
        >
          {post.title}
        </h2>

        {/* Date */}
        <div
          className='text-terminal-text text-sm mb-3 font-medium transition-all duration-200'
          style={
            isHovered
              ? { color: typeColorValue, fontSize: '16px' }
              : { fontSize: '16px' }
          }
        >
          {post.updated
            ? `Updated: ${formatDate(post.updated)}`
            : formatDate(post.date)}
        </div>

        {/* Description */}
        <p className='text-terminal-text mb-3 leading-relaxed transition-all duration-200'>
          {post.description}
        </p>

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {post.hashtags.map((tag, i) => {
              const typeColor = getTypeColorValue(post.type);
              return (
                <span
                  key={tag}
                  className='px-3 py-1 text-sm rounded font-medium transition-colors duration-200 cursor-pointer'
                  style={{
                    backgroundColor:
                      hoveredTag === tag
                        ? `color-mix(in srgb, ${typeColor} 20%, transparent)`
                        : `color-mix(in srgb, ${typeColor} 10%, transparent)`,
                    color:
                      hoveredTag === tag
                        ? typeColor
                        : 'var(--color-terminal-text)', // Use CSS variable for theme adaptation
                    border: `1px solid color-mix(in srgb, ${typeColor} 30%, transparent)`,
                  }}
                  onMouseEnter={() => setHoveredTag(tag)}
                  onMouseLeave={() => setHoveredTag(null)}
                  onClick={(e) => handleHashtagClick(e, tag)}
                >
                  #{tag}
                </span>
              );
            })}
          </div>
        )}
      </a>
    </article>
  );
}

// PodcastEpisodeItem component
function PodcastEpisodeItem({
  episode,
  formatDate,
  getGlowStyle,
  podcastColor,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className='group'>
      <a
        href={episode.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block py-0.5 px-2 rounded-sm hover:bg-terminal-dimmed/5 transition-all duration-200'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title */}
        <h2
          className='text-2xl font-bold mb-2 transition-all duration-200 text-terminal-purple'
          style={
            isHovered
              ? {
                  textShadow: `0 0 2px rgba(${podcastColor}, 0.8), 
                          0 0 7px rgba(${podcastColor}, 0.8), 
                          0 0 11px rgba(${podcastColor}, 0.6)`,
                }
              : {}
          }
        >
          {episode.title}
        </h2>

        {/* Date */}
        <div
          className='text-terminal-text text-sm mb-3 font-medium transition-all duration-200'
          style={
            isHovered
              ? { color: `rgb(${podcastColor})`, fontSize: '16px' }
              : { fontSize: '16px' }
          }
        >
          {formatDate(episode.pubDate)}
        </div>

        {/* Description */}
        {episode.description && (
          <div
            className='text-terminal-text mb-3 leading-relaxed transition-all duration-200'
            dangerouslySetInnerHTML={{
              __html:
                episode.description.length > 300
                  ? episode.description.substring(0, 300) + '...'
                  : episode.description,
            }}
          />
        )}

        {/* Duration */}
        {episode.duration && (
          <div className='text-terminal-dimmed text-sm font-medium'>
            Duration: {episode.duration}
          </div>
        )}

        {/* External link indicator */}
        <div className='mt-3 text-terminal-purple text-sm font-medium'>
          Listen on Syntax.fm →
        </div>
      </a>
    </article>
  );
}

// ArticleItem component for IT Jungle articles
function ArticleItem({ article, formatDate, getGlowStyle, articleColor }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article className='group'>
      <a
        href={article.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block py-0.5 px-2 rounded-sm hover:bg-terminal-dimmed/5 transition-all duration-200'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title */}
        <h2
          className='text-2xl font-bold mb-2 transition-all duration-200 text-terminal-yellow'
          style={
            isHovered
              ? {
                  textShadow: `0 0 2px rgba(${articleColor}, 0.8), 
                          0 0 7px rgba(${articleColor}, 0.8), 
                          0 0 11px rgba(${articleColor}, 0.6)`,
                }
              : {}
          }
        >
          {article.title}
        </h2>

        {/* Date */}
        <div
          className='text-terminal-text text-sm mb-3 font-medium transition-all duration-200'
          style={
            isHovered
              ? { color: `rgb(${articleColor})`, fontSize: '16px' }
              : { fontSize: '16px' }
          }
        >
          {formatDate(article.pubDate)}
        </div>

        {/* Description */}
        {article.description && (
          <div
            className='text-terminal-text mb-3 leading-relaxed transition-all duration-200'
            dangerouslySetInnerHTML={{
              __html:
                article.description.length > 300
                  ? article.description.substring(0, 300) + '...'
                  : article.description,
            }}
          />
        )}

        {/* External link indicator */}
        <div className='mt-3 text-terminal-yellow text-sm font-medium'>
          Read on IT Jungle →
        </div>
      </a>
    </article>
  );
}

// Main component with Suspense wrapper
export default function CodexPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen relative'>
          <BackgroundCanvas />
          <div className='relative z-10 p-4'>
            <div className='max-w-4xl mx-auto mt-16'>
              <div className='text-terminal-green text-xl font-mono'>
                Loading...
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
