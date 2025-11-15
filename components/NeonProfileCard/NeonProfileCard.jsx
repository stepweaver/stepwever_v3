'use client';

import { useEffect, useState } from 'react';

const MATRIX_GLYPHS = ['λ', 'ネ', 'ホ', 'ミ', 'ツ', '0', '1'];
const FALLBACK_TERMINAL_LINES = ['λSYNC 01 // λλ00', 'λSYNC 02 // ネホ01'];
const FALLBACK_MATRIX_CELLS = ['λ0', 'ネ1', 'ホミ', 'ツλ', '01', '10'];

const defaultProfile = {
  name: 'Nyx Solaris',
  role: 'XR Protocol Engineer',
  tagline: 'Lambda Systems · R&D',
  status: 'ACTIVE',
  avatar:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=220&h=220&auto=format&fit=crop&crop=faces',
  badges: ['Security Engineer', 'XR Specialist', 'Quantum Ops'],
};

const NeonProfileCard = ({ profile }) => {
  const mergedProfile = profile ?? defaultProfile;
  const tagline = mergedProfile.tagline ?? mergedProfile.department;
  const createTerminalLines = (startAttempt) =>
    Array.from({ length: 2 }, (_, idx) => {
      const code = Array.from(
        { length: 5 },
        () => MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)]
      ).join('');
      return `λSYNC ${(startAttempt + idx)
        .toString()
        .padStart(2, '0')} // ${code}`;
    });

  const createMatrixCells = () =>
    Array.from({ length: 6 }, () =>
      [
        MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)],
        MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)],
      ].join('')
    );

  const [attempt, setAttempt] = useState(1);
  const [statusIndex, setStatusIndex] = useState(0);
  const [terminalLines, setTerminalLines] = useState(FALLBACK_TERMINAL_LINES);
  const [matrixCells, setMatrixCells] = useState(FALLBACK_MATRIX_CELLS);
  const statusMessages = ['ROUTING', 'HANDSHAKE', 'FAILED'];

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixCells(createMatrixCells());
      setAttempt((prev) => {
        const nextAttempt = prev >= 97 ? 1 : prev + 1;
        setTerminalLines(createTerminalLines(nextAttempt));
        return nextAttempt;
      });
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [statusMessages.length]);

  const badges = Array.isArray(mergedProfile.badges)
    ? mergedProfile.badges
    : [];

  return (
    <div className='relative w-full max-w-[340px] text-terminal-text font-ocr'>
      <div className='relative overflow-hidden rounded-[24px] border border-terminal-green/30 bg-terminal-dark/85 backdrop-blur-xl card-glow'>
        <div className='absolute inset-0 opacity-25' aria-hidden='true'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,255,65,0.18),transparent_55%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(255,0,255,0.15),transparent_45%)]' />
        </div>

        <div className='relative p-6 space-y-6'>
          <p className='font-ibm text-xl text-terminal-green tracking-[0.2em]'>
            λstepweaver
          </p>

          {mergedProfile.status && (
            <div className='inline-flex items-center gap-2 text-terminal-green uppercase text-[0.6rem] tracking-[0.4em] bg-terminal-dark/60 px-3 py-1 rounded-full border border-terminal-green/30 shadow-[0_0_12px_rgba(0,255,65,0.25)]'>
              <span className='relative flex h-3.5 w-3.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-50' />
                <span className='relative inline-flex h-3.5 w-3.5 rounded-full bg-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.45)]' />
              </span>
              {mergedProfile.status}
            </div>
          )}

          <div className='flex flex-col gap-4 items-start text-left'>
            {mergedProfile.avatar && (
              <div className='relative h-28 w-28 overflow-hidden rounded-3xl border border-terminal-magenta/40 shadow-[0_0_18px_rgba(255,0,255,0.2)]'>
                <img
                  src={mergedProfile.avatar}
                  alt={`${mergedProfile.name} avatar`}
                  loading='lazy'
                  className='h-full w-full object-cover'
                />
              </div>
            )}

            <div>
              <p className='font-ibm text-3xl text-terminal-green leading-tight'>
                {mergedProfile.name}
              </p>
              <p className='mt-1 text-sm uppercase tracking-[0.35em] text-terminal-magenta'>
                {mergedProfile.role}
              </p>
              {tagline && (
                <p className='mt-2 text-sm text-terminal-muted'>{tagline}</p>
              )}
            </div>
          </div>

          {badges.length > 0 && (
            <div className='rounded-2xl border border-terminal-border/50 bg-terminal-light/12 px-4 py-4 space-y-2 text-left'>
              {badges.map((badge, index) => {
                const badgeContent =
                  typeof badge === 'string' ? { text: badge } : badge;
                return (
                  <p
                    key={`${badgeContent.text}-${index}`}
                    className={`font-ibm text-base tracking-wide ${
                      badgeContent.accent
                        ? 'italic text-terminal-magenta'
                        : 'text-terminal-text'
                    }`}
                  >
                    {badgeContent.text}
                  </p>
                );
              })}
            </div>
          )}

          <div
            className='rounded-2xl border border-terminal-green/25 bg-terminal-dark/70 p-4 space-y-3 card-glow-tight'
            aria-live='polite'
          >
            <div className='flex items-center justify-between text-[0.65rem] uppercase tracking-[0.4em] text-terminal-muted whitespace-nowrap'>
              <span>Matrix sync</span>
              <span className='text-terminal-green'>
                Attempt #{attempt.toString().padStart(2, '0')}
              </span>
            </div>
            <div className='space-y-1 font-mono text-terminal-green text-[0.6rem] tracking-[0.25em]'>
              <div className='flex items-center gap-2 text-terminal-magenta tracking-[0.25em] text-[0.6rem]'>
                λSYNC//
                <span>{statusMessages[statusIndex]}</span>
                <span className='terminal-caret text-terminal-green'>_</span>
              </div>
            </div>
            <div className='grid grid-cols-6 gap-1'>
              {matrixCells.map((cell, index) => (
                <div
                  key={`${cell}-${index}`}
                  className='h-5 rounded bg-terminal-light/15 border border-terminal-green/20 flex items-center justify-center text-terminal-green font-mono text-[0.5rem]'
                >
                  {cell}
                </div>
              ))}
            </div>
            <p className='text-terminal-magenta text-[0.6rem] font-ocr tracking-[0.3em] uppercase whitespace-nowrap text-left'>
              STATUS: USER UNPLUGGED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonProfileCard;
