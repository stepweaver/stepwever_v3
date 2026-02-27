'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import TerminalLoader from './TerminalLoader';

const CONTENT_PREFIXES = ['/codex', '/meshtastic'];
const CONTENT_DURATION_MS = 2800;
const STANDARD_DURATION_MS = 1400;
const FADEOUT_MS = 500;

function isContentRoute(path) {
  if (!path) return false;
  return CONTENT_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const prevPathRef = useRef(null);
  const [phase, setPhase] = useState('idle');
  const [targetPath, setTargetPath] = useState(null);
  const [duration, setDuration] = useState(STANDARD_DURATION_MS);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
      return;
    }

    if (prevPathRef.current === pathname) return;

    const fromPath = prevPathRef.current;
    prevPathRef.current = pathname;

    const dur = isContentRoute(pathname) ? CONTENT_DURATION_MS : STANDARD_DURATION_MS;
    setTargetPath(pathname);
    setDuration(dur);
    setPhase('in');

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('out');
      timerRef.current = setTimeout(() => {
        setPhase('idle');
        setTargetPath(null);
        timerRef.current = null;
      }, FADEOUT_MS);
    }, dur);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showOverlay = phase !== 'idle';
  const hideContent = phase === 'in';

  return (
    <>
      <div
        className={`transition-opacity duration-500 ease-out ${
          hideContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
      {showOverlay && (
        <TerminalLoader
          targetPath={targetPath}
          duration={duration}
          phase={phase}
        />
      )}
    </>
  );
}
