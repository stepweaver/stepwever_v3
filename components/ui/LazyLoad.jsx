'use client';

import { useState, useEffect, useRef } from 'react';

const LazyLoad = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true);
          setHasIntersected(true);
          // Disconnect observer after first intersection
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasIntersected]);

  return (
    <div ref={ref} className={className} {...props}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazyLoad;
