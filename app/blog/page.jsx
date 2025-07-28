'use client';

import { useEffect, useState, useMemo } from 'react';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import GlitchLambda from '@/components/ui/GlitchLambda';

export default function CodexPage() {
  const [posts, setPosts] = useState([]);
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('blog');
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [activeHashtags, setActiveHashtags] = useState([]);

  // Fetch all posts from API
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/blog');
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
    if (activeTab === 'article') {
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

  // Get all unique hashtags for filter buttons
  const filteredHashtags = useMemo(() => {
    const tags = new Set();
    const relevantPosts = allPosts.filter((post) => post.type === activeTab);

    relevantPosts.forEach((post) => {
      if (post.hashtags) {
        post.hashtags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allPosts, activeTab]);

  // Filter content based on selected filters
  const filteredPosts = useMemo(() => {
    let result = allPosts.filter((post) => post.type === activeTab);

    // Then filter by hashtags if any are selected
    if (activeHashtags.length > 0) {
      result = result.filter((post) => {
        const postTags = post.hashtags || [];
        return activeHashtags.some((tag) => postTags.includes(tag));
      });
    }

    return result;
  }, [allPosts, activeTab, activeHashtags]);

  // Handle hashtag click
  const handleHashtagClick = (tag) => {
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
      // Parse the date string manually to avoid timezone issues
      const [year, month, day] = dateStr.split('-').map(Number);
      if (!year || !month || !day) return dateStr;
      return `[${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0'
      )}]`;
    } catch (e) {
      return dateStr;
    }
  };

  // Get type color helper
  const getTypeColor = (type) => {
    const colors = {
      blog: 'text-terminal-green',
      project: 'text-terminal-magenta',
      article: 'text-terminal-yellow',
      tool: 'text-terminal-cyan',
      community: 'text-terminal-blue',
    };
    return colors[type] || 'text-terminal-text';
  };

  // Get glow style helper (from stepweaver)
  const getGlowStyle = (type) => {
    const glowColors = {
      blog: '0, 255, 65', // terminal-green
      project: '255, 85, 255', // terminal-magenta
      article: '255, 255, 0', // terminal-yellow
      tool: '0, 255, 255', // terminal-cyan
      community: '0, 150, 255', // terminal-blue
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
      blog: 'rgb(0, 255, 65)', // terminal-green
      project: 'rgb(255, 85, 255)', // terminal-magenta
      article: 'rgb(255, 255, 0)', // terminal-yellow
      tool: 'rgb(0, 255, 255)', // terminal-cyan
      community: 'rgb(0, 150, 255)', // terminal-blue
      all: 'rgb(0, 255, 65)', // Default to green
    };

    return colorMap[type] || colorMap.all;
  };

  const tabs = [
    { id: 'blog', label: 'Blog' },
    { id: 'project', label: 'Projects' },
    { id: 'article', label: 'Articles' },
    { id: 'tool', label: 'Tools' },
    { id: 'community', label: 'Community' },
    { id: 'podcasts', label: 'Podcasts' },
  ];

  const podcastSubTabs = [
    {
      id: 'syntaxfm',
      label: 'Syntax.fm',
      color: 'text-terminal-cyan',
      glowColor: '0, 255, 255',
    },
    {
      id: 'coming-soon',
      label: 'Coming Soon',
      color: 'text-terminal-yellow',
      glowColor: '255, 255, 0',
    },
  ];

  const articleSubTabs = [
    {
      id: 'itjungle',
      label: 'IT Jungle',
      color: 'text-terminal-magenta',
      glowColor: '255, 85, 255',
    },
    {
      id: 'coming-soon',
      label: 'Coming Soon',
      color: 'text-terminal-yellow',
      glowColor: '255, 255, 0',
    },
  ];

  return (
    <div className='min-h-screen relative bg-terminal-dark'>
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
              <span className='text-terminal-green'>user@stepweaver:~$</span>
              <span className='text-terminal-text ml-2'>cd</span>
              <button
                onClick={() => {
                  setActiveTab('blog');
                  setActiveSubTab(null);
                  setActiveHashtags([]);
                }}
                className='text-terminal-text hover:text-terminal-green transition-colors cursor-pointer ml-1'
              >
                /codex
              </button>
              <span className='text-terminal-dimmed'>/</span>
              <span className='text-terminal-text capitalize'>{activeTab}</span>
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
              {activeTab === 'article' && activeSubTab && (
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
                ) : activeTab === 'article' ? (
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
                              post.type === activeTab &&
                              post.hashtags &&
                              post.hashtags.includes(tag)
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
                          (post) =>
                            post.type === activeTab &&
                            post.hashtags &&
                            post.hashtags.includes(tag)
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
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const typeColor = getTypeColor(post.type);
  const typeColorValue = getTypeColorValue(post.type);

  return (
    <article className='group'>
      <a
        href={`/blog/${post.type}/${post.slug}`}
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
            {post.hashtags.map((tag, i) => (
              <span
                key={tag}
                className='px-3 py-1 text-sm bg-terminal-text/10 text-white border border-terminal-text/20 rounded font-medium transition-colors duration-200 cursor-pointer hover:bg-terminal-text/20'
                style={{
                  color:
                    hoveredTag === tag ? getTypeColorValue(post.type) : 'white',
                }}
                onMouseEnter={() => setHoveredTag(tag)}
                onMouseLeave={() => setHoveredTag(null)}
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
          className='text-2xl font-bold mb-2 transition-all duration-200 text-terminal-cyan'
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
        <div className='mt-3 text-terminal-cyan text-sm font-medium'>
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
          className='text-2xl font-bold mb-2 transition-all duration-200 text-terminal-magenta'
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
        <div className='mt-3 text-terminal-magenta text-sm font-medium'>
          Read on IT Jungle →
        </div>
      </a>
    </article>
  );
}
