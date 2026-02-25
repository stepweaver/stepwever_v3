'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const TRANSITION_PREFIXES = ['/codex'];
const MIN_DISPLAY_MS = 1200;
const FADE_OUT_MS = 350;

function shouldShowTransition(fromPath, toPath) {
  if (fromPath === toPath) return false;
  return TRANSITION_PREFIXES.some(
    (prefix) => fromPath.startsWith(prefix) && toPath.startsWith(prefix)
  );
}

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (pathname !== prevPath) {
      if (shouldShowTransition(prevPath, pathname)) {
        setPhase('in');
      }
      setPrevPath(pathname);
    }
  }, [pathname, prevPath]);

  useEffect(() => {
    if (phase === 'in') {
      const t = setTimeout(() => setPhase('out'), MIN_DISPLAY_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'out') {
      const t = setTimeout(() => setPhase('idle'), FADE_OUT_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <>
      {children}
      {phase !== 'idle' && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm transition-none ${
            phase === 'out'
              ? 'motion-safe:animate-[hudFadeOut_0.35s_ease-in_forwards]'
              : 'motion-safe:animate-[hudFadeIn_0.2s_ease-out]'
          }`}
        >
          <div className='hud-panel p-8 sm:p-10 max-w-md w-full space-y-5 motion-safe:animate-[hudFadeIn_0.3s_ease-out]'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-[10px] tracking-[0.3em] text-neon/50 font-ocr uppercase'>
                  MODULE
                </p>
                <p className='text-sm tracking-[0.18em] text-neon/80 font-ocr uppercase mt-0.5'>
                  CODEX // TRANSIT
                </p>
              </div>
              <div className='text-right'>
                <p className='text-[10px] tracking-[0.22em] text-neon/50 font-ocr uppercase'>
                  STATUS
                </p>
                <p className='text-xs font-mono text-terminal-yellow mt-0.5'>
                  LOADING
                </p>
              </div>
            </div>

            <div className='font-mono text-xs space-y-1.5 text-neon/60'>
              <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.15s_both]'>
                <span className='text-neon/40'>{'>'}</span> routing to new
                entry&hellip;
              </p>
              <p className='motion-safe:animate-[hudLineIn_0.3s_ease-out_0.4s_both]'>
                <span className='text-neon/40'>{'>'}</span> decrypting content
                blocks
              </p>
              <p className='text-neon/30 motion-safe:animate-[hudLineIn_0.3s_ease-out_0.65s_both]'>
                <span className='text-neon/40'>{'>'}</span> assembling view
                <span className='terminal-caret ml-0.5 text-terminal-green'>
                  &#9608;
                </span>
              </p>
            </div>

            <div className='space-y-1.5 motion-safe:animate-[hudFadeIn_0.4s_ease-out_0.8s_both]'>
              <div className='relative h-[2px] w-full bg-neon/10 overflow-hidden rounded-full'>
                <div className='absolute inset-y-0 left-0 w-1/3 bg-terminal-green rounded-full motion-safe:animate-[hudSlide_1.2s_ease-in-out_infinite]' />
              </div>
              <p className='text-[10px] tracking-[0.18em] text-neon/40 font-ocr uppercase text-right'>
                ROUTE_TRANSIT ACTIVE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

