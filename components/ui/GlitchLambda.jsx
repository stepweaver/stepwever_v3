'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/terminal-ui.module.css';

export default function GlitchLambda({
  className = '',
  autoGlitch = true,
  glitchInterval = 5000,
  initialDelay = 1000,
  children = 'λ',
  size = 'normal', // 'small', 'normal', 'large', 'xl'
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!autoGlitch) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    };

    const initialTimeout = setTimeout(triggerGlitch, initialDelay);
    const glitchIntervalTimer = setInterval(triggerGlitch, glitchInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(glitchIntervalTimer);
    };
  }, [autoGlitch, glitchInterval, initialDelay]);

  // Determine glitch animation class based on size
  const getGlitchClass = () => {
    if (!isGlitching) return '';

    switch (size) {
      case 'small':
        return 'animate-glitch';
      case 'large':
        return 'animate-glitch-large';
      case 'xl':
        return 'animate-glitch-xl';
      default:
        return 'animate-glitch';
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
