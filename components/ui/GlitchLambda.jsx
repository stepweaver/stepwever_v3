'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/terminal-ui.module.css';
import animationStyles from '@/styles/animations.module.css';

export default function GlitchLambda({
  className = '',
  autoGlitch = true,
  glitchInterval = 5000,
  initialDelay = 1000,
  children = 'λ',
  size = 'normal', // 'small', 'normal', 'large', 'xl'
}) {
  const [isGlitching, setIsGlitching] = useState(false);
  const randomizedValues = useRef(null);

  useEffect(() => {
    if (!autoGlitch) return;

    // Initialize randomized values only on client
    if (!randomizedValues.current) {
      const getRandomizedDelay = (baseDelay) => {
        const variation = baseDelay * 0.3;
        return baseDelay + (Math.random() * variation * 2 - variation);
      };

      randomizedValues.current = {
        initialDelay: getRandomizedDelay(initialDelay),
        getNextInterval: () => getRandomizedDelay(glitchInterval),
      };
    }

    const getGlitchDuration = () => {
      switch (size) {
        case 'large':
          return 400;
        case 'xl':
          return 500;
        default:
          return 300;
      }
    };

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), getGlitchDuration());
    };

    // Use pre-calculated randomized initial delay
    const initialTimeout = setTimeout(
      triggerGlitch,
      randomizedValues.current.initialDelay
    );

    // Set up interval with randomized timing
    const setupNextGlitch = () => {
      const randomizedInterval = randomizedValues.current.getNextInterval();
      setTimeout(() => {
        triggerGlitch();
        setupNextGlitch(); // Schedule the next glitch
      }, randomizedInterval);
    };

    // Start the staggered interval after initial delay
    const intervalTimeout = setTimeout(
      setupNextGlitch,
      randomizedValues.current.initialDelay
    );

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(intervalTimeout);
    };
  }, [autoGlitch, glitchInterval, initialDelay, size]);

  // Determine glitch animation class based on size
  const getGlitchClass = () => {
    if (!isGlitching) return '';

    switch (size) {
      case 'small':
        return animationStyles['animate-glitch'];
      case 'large':
        return animationStyles['animate-glitch-large'];
      case 'xl':
        return animationStyles['animate-glitch-xl'];
      default:
        return animationStyles['animate-glitch'];
    }
  };

  return (
    <span
      className={`${styles.lambdaSymbol} ${className} ${
        isGlitching
          ? styles.lambdaGlitching + ' ' + getGlitchClass()
          : styles.lambdaNormal
      }`}
    >
      {children}
    </span>
  );
}
