'use client';

import { useState } from 'react';

/**
 * Individual post entry for the Codex listing.
 *
 * @param {Object} post - Post data (slug, title, date, updated, description, hashtags)
 * @param {number} index - Index in the list (for CODEX-## label)
 * @param {Function} formatDate - Date formatter function
 * @param {Function} onHashtagClick - Called when a hashtag is clicked
 */
export default function PostItem({ post, index, formatDate, onHashtagClick }) {
  const [hoveredTag, setHoveredTag] = useState(null);
  const typeColor = 'var(--neon)';

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    onHashtagClick?.(tag);
  };

  return (
    <article className='border-l-2 border-neon/20 pl-5 py-4 hover:border-neon/70 hover:bg-neon/[0.03] hover:shadow-[inset_2px_0_8px_-4px_rgb(var(--neon)/0.3)] transition-all duration-200'>
      <a href={`/codex/${post.slug}`} className='block group'>
        <div className='flex items-start justify-between gap-4 mb-1'>
          <h3 className='text-lg font-semibold text-text font-ibm group-hover:text-neon transition-all duration-200 group-hover:[text-shadow:var(--terminal-title-glow)]'>
            {post.title}
          </h3>
          <span className='font-mono text-[10px] text-neon/50 shrink-0'>
            CODEX-{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className='text-text/60 text-sm mb-2 font-ocr'>
          {formatDate(post.date)}
          {post.updated && post.updated !== post.date && (
            <span className='text-neon/70 ml-3'>
              Updated: {formatDate(post.updated)}
            </span>
          )}
        </div>
        <p className='text-text/80 mb-3 leading-relaxed text-sm font-ocr'>
          {post.description}
        </p>
        {post.hashtags?.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                role='button'
                tabIndex={0}
                className='px-3 py-1 text-sm rounded-sm font-medium transition-colors cursor-pointer'
                style={{
                  backgroundColor:
                    hoveredTag === tag
                      ? `color-mix(in srgb, ${typeColor} 20%, transparent)`
                      : `color-mix(in srgb, ${typeColor} 10%, transparent)`,
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
