'use client';

import { useEffect } from 'react';

function isRasterMediaTarget(target) {
  if (!target || typeof Element === 'undefined') return false;
  if (!(target instanceof Element)) return false;
  const tag = target.tagName;
  if (tag === 'IMG' || tag === 'CANVAS' || tag === 'PICTURE') return true;
  return Boolean(target.closest('picture'));
}

/**
 * Best-effort UX deterrents against right-click save and drag-to-desktop for
 * raster content. Not a security boundary: screenshots, devtools, and direct
 * URLs still work.
 */
export default function ImageProtection() {
  useEffect(() => {
    const onContextMenu = (e) => {
      if (isRasterMediaTarget(e.target)) e.preventDefault();
    };
    const onDragStart = (e) => {
      if (isRasterMediaTarget(e.target)) e.preventDefault();
    };

    document.addEventListener('contextmenu', onContextMenu, true);
    document.addEventListener('dragstart', onDragStart, true);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu, true);
      document.removeEventListener('dragstart', onDragStart, true);
    };
  }, []);

  return null;
}
