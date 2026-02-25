'use client';

import { useState } from 'react';

/**
 * Individual post entry for the Codex listing.
 * Clean separation with dividers, bordered hashtags only.
 */
export default function PostItem({ post, index, formatDate, onHashtagClick }) {
  const [hovered, setHovered] = useState(false);

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    onHashtagClick?.(tag);
  };

  return (
    <article
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={`/codex/${post.slug}`} className="block py-6 sm:py-8">
        {/* Index + date row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] tracking-[0.25em] text-neon/40 uppercase">
            CODEX-{String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-ocr text-xs text-text/40 tracking-wide">
            {formatDate(post.date)}
            {post.updated && post.updated !== post.date && (
              <span className="text-neon/50 ml-2">
                Updated: {formatDate(post.updated)}
              </span>
            )}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`
            font-ibm text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide
            text-text leading-tight mb-3
            transition-all duration-200
            ${hovered ? 'text-neon [text-shadow:var(--terminal-title-glow)]' : ''}
          `}
        >
          {post.title}
        </h3>

        {/* Description */}
        {post.description && (
          <p className="font-ocr text-sm text-text/60 leading-relaxed mb-4 max-w-2xl">
            {post.description}
          </p>
        )}

        {/* Hashtags — the only bordered elements */}
        {post.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                role="button"
                tabIndex={0}
                className="px-3 py-1 text-xs font-ocr tracking-wider uppercase border border-neon/30 text-text/70 rounded-sm transition-all duration-200 cursor-pointer hover:border-neon/70 hover:text-neon hover:bg-neon/10"
                onClick={(e) => handleTagClick(e, tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </a>

      {/* Divider between posts */}
      <div className="h-px bg-neon/10" />
    </article>
  );
}
