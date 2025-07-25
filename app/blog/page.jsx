'use client';

import { useEffect, useState, useMemo } from 'react';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
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
    const relevantPosts =
      activeTab === 'all'
        ? allPosts
        : allPosts.filter((post) => post.type === activeTab);

    relevantPosts.forEach((post) => {
      if (post.hashtags) {
        post.hashtags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allPosts, activeTab]);

  // Filter content based on selected filters
  const filteredPosts = useMemo(() => {
    let result = allPosts;

    // First filter by type if not 'all'
    if (activeTab !== 'all') {
      result = result.filter((post) => post.type === activeTab);
    }

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
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
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
    { id: 'all', label: 'All' },
    { id: 'blog', label: 'Blog' },
    { id: 'project', label: 'Projects' },
    { id: 'article', label: 'Articles' },
    { id: 'tool', label: 'Tools' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4'>
        <div className='max-w-7xl mx-auto'>
          {/* Page Title */}
          <div className='text-center mt-16 mb-16'>
            <h1 className='text-5xl md:text-6xl font-bold text-terminal-green mb-8 md:mb-16 font-ibm'>
              λBlog
            </h1>
            <p className='text-terminal-text text-lg md:text-3xl leading-relaxed'>
              Hey, what's up? I'm Stephen, founder of λstepweaver and creator of
              growth systems for rebels who ship.
            </p>
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
              <div className='flex-1 max-w-3xl'>
                <div className='space-y-8'>
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
                          setActiveTab('all');
                          setActiveHashtags([]);
                        }}
                        className='text-terminal-green hover:text-terminal-white transition-colors mt-2 cursor-pointer'
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Categories and Tags moved to bottom on mobile only */}
                <div className='mt-16 pt-8 border-t border-terminal-dimmed/20 lg:hidden'>
                  {/* Categories */}
                  <div className='mb-8'>
                    <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                      Categories
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {tabs.map((tab) => {
                        const count =
                          tab.id === 'all'
                            ? allPosts.length
                            : allPosts.filter((post) => post.type === tab.id)
                                .length;
                        return (
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
                            <span className='text-sm font-bold ml-2'>
                              {count}
                            </span>
                          </button>
                        );
                      })}
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
              <div className='w-64 flex-shrink-0 hidden lg:block'>
                {/* Categories */}
                <div className='mb-8'>
                  <h3 className='text-terminal-text font-bold uppercase text-sm mb-4'>
                    Categories
                  </h3>
                  <div className='space-y-2'>
                    {tabs.map((tab) => {
                      const count =
                        tab.id === 'all'
                          ? allPosts.length
                          : allPosts.filter((post) => post.type === tab.id)
                              .length;
                      return (
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
                          <span className='text-sm font-bold'>{count}</span>
                        </button>
                      );
                    })}
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
