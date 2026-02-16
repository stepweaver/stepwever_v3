import { useEffect, useState, useCallback } from 'react';

const DEFAULT_GLYPHS = ['λ', 'ネ', 'ホ', 'ミ', 'ツ', '入'];

/**
 * Shared hook for the Matrix Sync terminal animation sequence.
 * Used by MatrixSync component and NeonProfileCard.
 *
 * @param {Object} options
 * @param {string[]} [options.glyphs] - Character set for matrix cells
 * @param {number} [options.cellCount] - Number of matrix cells (default: 6)
 * @returns {{ attempt, terminalOutput, matrixCells, showPrompt, isMounted }}
 */
export function useMatrixSync({ glyphs = DEFAULT_GLYPHS, cellCount = 6 } = {}) {
  const createMatrixCells = useCallback(
    () =>
      Array.from({ length: cellCount }, () =>
        [
          glyphs[Math.floor(Math.random() * glyphs.length)],
          glyphs[Math.floor(Math.random() * glyphs.length)],
        ].join('')
      ),
    [glyphs, cellCount]
  );

  const [attempt, setAttempt] = useState(1);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [matrixCells, setMatrixCells] = useState(
    () => Array.from({ length: cellCount }, () => '  ')
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration-safe: initialise cells only on client
  useEffect(() => {
    setIsMounted(true);
    setMatrixCells(createMatrixCells());
  }, [createMatrixCells]);

  // Run the looping terminal sequence
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
  }, [isMounted, createMatrixCells]);

  return { attempt, terminalOutput, matrixCells, showPrompt, isMounted };
}
