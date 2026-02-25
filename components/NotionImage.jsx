'use client';

import { useState, useCallback } from 'react';

/**
 * Client component for Notion images that handles expired temporary URLs.
 * Notion `file`-type URLs are signed and expire after ~1 hour. When ISR
 * serves a stale page, the baked-in URL may already be dead. On load
 * failure we hit /api/notion-image to resolve a fresh URL from the API.
 */
export default function NotionImage({ src, blockId, alt, caption }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasRetried, setHasRetried] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = useCallback(async () => {
    if (hasRetried || !blockId) {
      setFailed(true);
      return;
    }
    setHasRetried(true);

    try {
      const res = await fetch(`/api/notion-image?blockId=${blockId}`);
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
  }, [blockId, hasRetried]);

  if (failed) return null;

  return (
    <figure className="my-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt || 'Notion image'}
        className="max-w-full lg:max-w-lg h-auto rounded-sm"
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
