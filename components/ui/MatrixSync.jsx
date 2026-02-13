'use client';

import { useEffect, useState } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

const MATRIX_GLYPHS = ['λ', 'ネ', 'ホ', 'ミ', 'ツ', '入'];

export function MatrixSync() {
  const createMatrixCells = () =>
    Array.from({ length: 6 }, () =>
      [
        MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)],
        MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)],
      ].join('')
    );

  const [attempt, setAttempt] = useState(1);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [matrixCells, setMatrixCells] = useState(['  ', '  ', '  ', '  ', '  ', '  ']);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setMatrixCells(createMatrixCells());
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    let step = 0;
    let timeoutId;
    let matrixIntervalId;
    let currentAttempt = 1;

    const getRandomDelay = (base, variance) => base + Math.random() * variance;

    const runSequence = () => {
      step++;
      if (step === 1) {
        setTerminalOutput('connect user');
        setAttempt(currentAttempt);
        timeoutId = setTimeout(runSequence, getRandomDelay(1200, 400));
      } else if (step === 2) {
        setTerminalOutput('handshake failed');
        let cycleCount = 0;
        matrixIntervalId = setInterval(() => {
          setMatrixCells(createMatrixCells());
          cycleCount++;
          if (cycleCount >= 10) {
            clearInterval(matrixIntervalId);
            timeoutId = setTimeout(runSequence, getRandomDelay(600, 200));
          }
        }, 180);
      } else if (step === 3) {
        setTerminalOutput('user unplugged');
        timeoutId = setTimeout(runSequence, getRandomDelay(1500, 500));
      } else if (step === 4) {
        setTerminalOutput('');
        setShowPrompt(true);
        timeoutId = setTimeout(runSequence, getRandomDelay(2000, 800));
      } else if (step === 5) {
        setTerminalOutput('');
        setShowPrompt(false);
        currentAttempt = currentAttempt >= 97 ? 1 : currentAttempt + 1;
        step = 0;
        timeoutId = setTimeout(runSequence, getRandomDelay(400, 200));
      }
    };

    runSequence();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(matrixIntervalId);
    };
  }, [isMounted]);

  return (
    <div className="border border-neon/30 bg-panel/70 p-2 sm:p-3 rounded-lg space-y-1.5" aria-live="polite">
      <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-wider text-neon/70 font-ocr">
        <span>MATRIX SYNC</span>
        <span className="text-neon font-mono">#{attempt.toString().padStart(2, '0')}</span>
      </div>
      <div className="font-mono text-neon text-xs h-5 flex items-center overflow-hidden gap-1">
        <GlitchLambda className="text-neon text-xs inline-block flex-shrink-0" />
        {terminalOutput && (
          <span className="font-ocr whitespace-nowrap truncate">{terminalOutput}</span>
        )}
        {showPrompt && <span className="animate-pulse">_</span>}
      </div>
      <div className="grid grid-cols-6 gap-0.5">
        {matrixCells.map((cell, index) => (
          <div
            key={`${cell}-${index}-${isMounted}`}
            className="h-5 border border-neon/30 bg-panel/50 flex items-center justify-center text-neon font-mono text-xs font-bold rounded"
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
