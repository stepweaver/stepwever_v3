'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathnameRef = useRef(pathname);
  const timeoutRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip transition on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathnameRef.current = pathname;
      setDisplayChildren(children);
      return;
    }

    // Route changed - start transition
    if (prevPathnameRef.current !== pathname) {
      setIsTransitioning(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Fade out current content, then update and fade in
      timeoutRef.current = setTimeout(() => {
        // Update children while hidden
        setDisplayChildren(children);
        prevPathnameRef.current = pathname;
        
        // Fade in new content on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(false);
          });
        });
      }, 150); // Half of total transition duration
    } else {
      // Pathname same but children might have updated (e.g., same route, different data)
      setDisplayChildren(children);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, children]);

  return (
    <div
      className={`min-h-full transition-opacity duration-300 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {displayChildren}
    </div>
  );
}

