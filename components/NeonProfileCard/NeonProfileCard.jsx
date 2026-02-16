'use client';

import GlitchLambda from '@/components/ui/GlitchLambda';
import { useMatrixSync } from '@/hooks/useMatrixSync';

const MATRIX_GLYPHS = ['λ', 'ネ', 'ホ', 'ミ', 'ツ'];

const defaultProfile = {
  name: 'Nyx Solaris',
  role: 'XR Protocol Engineer',
  tagline: 'Lambda Systems · R&D',
  status: 'ACTIVE',
  avatar:
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=240&q=80',
  badges: ['Security Engineer', 'XR Specialist', 'Quantum Ops'],
};

const NeonProfileCard = ({ profile }) => {
  const mergedProfile = profile ?? defaultProfile;
  const tagline = mergedProfile.tagline ?? mergedProfile.department;

  const { attempt, terminalOutput, matrixCells, showPrompt, isMounted } =
    useMatrixSync({ glyphs: MATRIX_GLYPHS });

  const badges = Array.isArray(mergedProfile.badges)
    ? mergedProfile.badges
    : [];

  return (
    <div className='relative w-full max-w-[420px] text-terminal-text font-ocr'>
      <div className='relative overflow-hidden cyber-border-lg cyber-border-green bg-terminal-dark/30 backdrop-blur-xl card-glow'>
        <div className='absolute inset-0 opacity-25' aria-hidden='true'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,255,65,0.18),transparent_55%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(255,0,255,0.15),transparent_45%)]' />
        </div>

        <div className='relative p-6 space-y-6'>
          <p className='font-ibm text-2xl sm:text-3xl text-terminal-green tracking-[0.15em] sm:tracking-[0.2em]'>
            λstepweaver
          </p>

          {mergedProfile.status && (
            <div className='inline-flex items-center gap-2 text-terminal-green uppercase text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] bg-terminal-dark/60 px-3 py-1.5 cyber-border-sm cyber-border-green'>
              <span className='relative flex h-3.5 w-3.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-50' />
                <span className='relative inline-flex h-3.5 w-3.5 rounded-full bg-terminal-green' />
              </span>
              {mergedProfile.status}
            </div>
          )}

          <div className='flex flex-col gap-4 items-start text-left'>
            {mergedProfile.avatar && (
              <div className='relative w-full h-full overflow-hidden cyber-border cyber-border-magenta shadow-[0_0_18px_rgba(255,0,255,0.2)]'>
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
              <p className='mt-1 text-base sm:text-lg uppercase tracking-[0.3em] sm:tracking-[0.35em] text-terminal-magenta font-ocr'>
                {mergedProfile.role}
              </p>
              {tagline && (
                <p className='mt-2 text-base text-terminal-muted font-ocr'>
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {badges.length > 0 && (
            <div className='cyber-border cyber-border-border bg-terminal-light/12 px-4 py-4 space-y-2 text-left'>
              {badges.map((badge, index) => {
                const badgeContent =
                  typeof badge === 'string' ? { text: badge } : badge;
                const isAccent = badgeContent.accent;
                return (
                  <div
                    key={`${badgeContent.text}-${index}`}
                    className='group flex items-center gap-2'
                  >
                    <span
                      className={`font-mono text-xs opacity-20 group-hover:opacity-40 transition-opacity ${
                        isAccent ? 'text-terminal-magenta' : 'text-terminal-green'
                      }`}
                    >
                      {'•'}
                    </span>
                    <p
                      className={`font-ibm text-base sm:text-lg tracking-wide ${
                        isAccent
                          ? 'italic text-terminal-magenta'
                          : 'text-terminal-text'
                      }`}
                    >
                      {badgeContent.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div
            className='cyber-border cyber-border-green bg-terminal-dark/70 p-4 space-y-1'
            aria-live='polite'
          >
            <div className='flex items-center justify-between text-sm sm:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] text-terminal-muted whitespace-nowrap font-bold font-ocr'>
              <span className='truncate'>Matrix sync</span>
              <span className='text-terminal-green ml-2 flex-shrink-0'>
                #{attempt.toString().padStart(2, '0')}
              </span>
            </div>
            <div className='font-mono text-terminal-green text-base sm:text-lg tracking-[0.1em] sm:tracking-[0.15em] font-bold h-7 sm:h-8 flex items-center overflow-hidden'>
              <div className='w-full min-w-0 flex items-center gap-1'>
                <GlitchLambda className='text-terminal-green text-base sm:text-lg inline-block flex-shrink-0' />
                {terminalOutput && (
                  <div className='text-terminal-green font-ocr whitespace-nowrap overflow-hidden text-sm sm:text-base'>
                    <span className='truncate'>{terminalOutput}</span>
                  </div>
                )}
                {showPrompt && (
                  <span className='terminal-caret motion-safe:animate-pulse text-terminal-green text-base sm:text-lg'>
                    _
                  </span>
                )}
              </div>
            </div>
            <div className='grid grid-cols-6 gap-1'>
              {matrixCells.map((cell, index) => (
                <div
                  key={`${cell}-${index}-${isMounted}`}
                  className='h-8 sm:h-9 matrix-border-sm cyber-border-green bg-terminal-light/15 flex items-center justify-center text-terminal-green font-mono text-lg sm:text-xl font-bold'
                >
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonProfileCard;
