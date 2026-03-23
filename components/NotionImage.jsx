'use client';

import { useState, useCallback } from 'react';

/**
 * Client component for Notion images that handles expired temporary URLs.
 * Notion `file`-type URLs are signed and expire after ~1 hour. On load
 * failure we call /api/notion-image with a server-minted signed token (never raw block IDs).
 */
export default function NotionImage({ src, imageRefreshToken, alt, caption }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasRetried, setHasRetried] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = useCallback(async () => {
    if (hasRetried || !imageRefreshToken) {
      setFailed(true);
      return;
    }
    setHasRetried(true);

    try {
      const params = new URLSearchParams({ token: imageRefreshToken });
      const res = await fetch(`/api/notion-image?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setImageSrc(data.url);
          return;
        }
      }
    } catch {
      // fall through
    }

    setFailed(true);
  }, [imageRefreshToken, hasRetried]);

  if (failed) return null;

  return (
    <figure className="my-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt || 'Notion image'}
        className="max-w-full lg:max-w-lg h-auto rounded-sm select-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onError={handleError}
      />
      {caption ? (
        <figcaption className="mt-2 text-sm text-text/60 font-ocr">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
