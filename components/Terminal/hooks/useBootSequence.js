import { useCallback, useEffect, useRef, useState } from 'react';

function flattenSequence(sequence) {
  return sequence
    .filter((step) => step.type === 'line')
    .map((step) => step.text);
}

export function useBootSequence({ setLines, sequence, onComplete }) {
  const [isBooting, setIsBooting] = useState(false);
  const timersRef = useRef([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  const finishBoot = useCallback(() => {
    clearTimers();
    setIsBooting(false);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [clearTimers]);

  const playBoot = useCallback(() => {
    clearTimers();
    setIsBooting(true);
    setLines([]);

    let elapsed = 0;

    sequence.forEach((step) => {
      const stepDelay = typeof step.delay === 'number' ? step.delay : 60;
      elapsed += stepDelay;

      if (step.type === 'pause') {
        return;
      }

      if (step.type === 'line') {
        const timerId = setTimeout(() => {
          setLines((prev) => [...prev, step.text]);
        }, elapsed);

        timersRef.current.push(timerId);
      }
    });

    const endTimer = setTimeout(() => {
      finishBoot();
    }, elapsed + 150);

    timersRef.current.push(endTimer);
  }, [clearTimers, finishBoot, sequence, setLines]);

  const skipBoot = useCallback(() => {
    clearTimers();
    setLines(flattenSequence(sequence));
    setIsBooting(false);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  }, [clearTimers, sequence, setLines]);

  return {
    isBooting,
    playBoot,
    skipBoot,
  };
}

