'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { roll, buildNotation, validateDicePool, rerollWithHeldDice } from '@/lib/roller';
import { DICE_ICONS, UI_CONSTANTS } from '@/lib/diceConstants';
import errorMonitor from '@/utils/errorMonitor';
import DicePoolBuilder from './DicePoolBuilder';
import DiceResult, { formatResultForDisplay } from './DiceResult';
import RollHistory from './RollHistory';
import GlitchButton from '@/components/ui/GlitchButton';

/**
 * Simplified dice roller - hex-centric, one screen, cyberpunk terminal vibe.
 */
export default function DiceRoller() {
  const [dicePool, setDicePool] = useState([]);
  const [modifier, setModifier] = useState(0);
  const [comment, setComment] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [heldDice, setHeldDice] = useState(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem('diceRollerHistory');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      errorMonitor.logError(e, { context: 'Dice roller history load' });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('diceRollerHistory', JSON.stringify(history));
    } catch (e) {
      errorMonitor.logError(e, { context: 'Dice roller history save' });
    }
  }, [history]);

  const handleRoll = useCallback(() => {
    if (!validateDicePool(dicePool) || isRolling) return;
    setIsRolling(true);
    setCopyStatus(false);
    setTimeout(() => {
      const notation = buildNotation(dicePool, modifier);
      const result = roll(notation);
      result.comment = comment.trim();
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev].slice(0, UI_CONSTANTS.MAX_HISTORY));
      setIsRolling(false);
      setComment('');
      setHeldDice(new Set());
    }, 800);
  }, [dicePool, modifier, comment, isRolling]);

  const handleReroll = useCallback(() => {
    if (!currentResult || isRolling) return;
    setIsRolling(true);
    setCopyStatus(false);
    setTimeout(() => {
      const newResult = rerollWithHeldDice(currentResult, heldDice);
      newResult.comment = currentResult.comment || comment.trim();
      setCurrentResult(newResult);
      setHistory((prev) => [newResult, ...prev].slice(0, UI_CONSTANTS.MAX_HISTORY));
      setIsRolling(false);
    }, 800);
  }, [currentResult, heldDice, isRolling, comment]);

  const handleToggleDiceHold = useCallback((groupIndex, resultIndex) => {
    setHeldDice((prev) => {
      const next = new Set(prev);
      const key = `${groupIndex}-${resultIndex}`;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleCopy = useCallback(() => {
    if (!currentResult) return;
    const notation = currentResult.notation;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), UI_CONSTANTS.COPY_STATUS_DURATION);
        },
        () => fallbackCopy(text)
      );
    } else fallbackCopy(text);
  }, [currentResult]);

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), UI_CONSTANTS.COPY_STATUS_DURATION);
    } catch (e) {
      errorMonitor.logError(e, { context: 'Copy fallback' });
    }
    document.body.removeChild(ta);
  };

  const handleReset = useCallback(() => {
    setDicePool([]);
    setModifier(0);
    setComment('');
    setCurrentResult(null);
    setCopyStatus(false);
    setHeldDice(new Set());
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Clear all roll history?')) {
      setHistory([]);
      localStorage.removeItem('diceRollerHistory');
    }
  }, []);

  const handleEditComment = useCallback((index, newComment) => {
    setHistory((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], comment: newComment };
      return next;
    });
  }, []);

  const handleClearResults = useCallback(() => {
    setCurrentResult(null);
    setCopyStatus(false);
    setHeldDice(new Set());
  }, []);

  const handleSelectHistoryRoll = useCallback((roll) => {
    setCurrentResult(roll);
    setCopyStatus(false);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return;
      switch (e.key.toLowerCase()) {
        case 'enter':
          e.preventDefault();
          handleRoll();
          break;
        case 'c':
          e.preventDefault();
          handleCopy();
          break;
        case 'r':
          e.preventDefault();
          handleReset();
          break;
        case 'escape':
          e.preventDefault();
          handleClearResults();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRoll, handleCopy, handleReset, handleClearResults]);

  const canRoll = useMemo(
    () => validateDicePool(dicePool) && !isRolling,
    [dicePool, isRolling]
  );

  return (
    <div className='flex flex-col gap-3 max-w-xl mx-auto'>
      {/* Hex - center of attention */}
      <DicePoolBuilder dicePool={dicePool} onUpdatePool={setDicePool} />

      {/* POOL and MOD - balanced layout */}
      <div className='flex flex-col sm:flex-row sm:items-start gap-4'>
        <div className='flex-1 min-w-0'>
          <span className='font-ocr text-[11px] tracking-widest text-neon/50 uppercase block mb-1.5'>
            POOL
          </span>
          {dicePool.length === 0 ? null : (
            <div className='flex flex-wrap gap-1.5'>
              {dicePool.map((die) => (
                <div
                  key={die.sides}
                  className='inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-neon/15 bg-panel/20'
                  style={{ color: die.color }}
                >
                  <span className='font-mono text-sm font-bold'>
                    [{die.count}d{die.sides}]
                  </span>
                  <button
                    onClick={() => setDicePool(dicePool.filter((d) => d.sides !== die.sides))}
                    className='text-danger/50 hover:text-danger text-[9px] leading-none w-3.5 h-3.5 flex items-center justify-center rounded-sm hover:bg-danger/10 transition-colors cursor-pointer'
                    aria-label={`Remove all d${die.sides}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='sm:shrink-0'>
          <span className='font-ocr text-[11px] tracking-widest text-neon/50 uppercase block mb-1.5'>
            MOD
          </span>
          <div className='inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-neon/15 bg-panel/20'>
            <button
              onClick={() => setModifier(modifier - 1)}
              className='w-3.5 h-3.5 flex items-center justify-center text-neon/70 hover:text-neon text-[9px] leading-none font-ibm transition-colors cursor-pointer'
              aria-label='Decrease modifier'
            >
              −
            </button>
            <input
              type='number'
              min={UI_CONSTANTS.MIN_MODIFIER}
              max={UI_CONSTANTS.MAX_MODIFIER}
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
              className='w-7 py-0 bg-transparent text-neon font-mono text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-neon/50'
              aria-label='Modifier'
            />
            <button
              onClick={() => setModifier(modifier + 1)}
              className='w-3.5 h-3.5 flex items-center justify-center text-neon/70 hover:text-neon text-[9px] leading-none font-ibm transition-colors cursor-pointer'
              aria-label='Increase modifier'
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Note */}
      <input
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='w-full py-1.5 px-2 mt-2 bg-panel/30 border border-neon/25 text-text font-ocr text-sm focus:outline-none focus:ring-1 focus:ring-neon/40 placeholder:text-text/30'
        placeholder='Note: Attack roll, Initiative...'
        maxLength={UI_CONSTANTS.MAX_COMMENT_LENGTH}
        aria-label='Roll note'
      />

      {/* Buttons */}
      <div className='flex gap-2'>
        <GlitchButton
          onClick={handleRoll}
          disabled={!canRoll}
          className='flex-1 py-2 text-sm'
        >
          {isRolling ? 'ROLLING' : 'ROLL'}
        </GlitchButton>
        <GlitchButton onClick={handleReset} className='py-2 px-4 text-xs'>
          RESET
        </GlitchButton>
        {currentResult && (
          <GlitchButton onClick={handleCopy} className='py-2 px-4 text-xs'>
            {copyStatus ? '✓' : 'COPY'}
          </GlitchButton>
        )}
      </div>

      {/* Result - rolling graphic + compact output */}
      <div className='min-h-[60px]'>
        {isRolling ? (
          <div className='flex flex-col items-center justify-center py-4 px-3'>
            {/* Abstract terminal-style rolling display */}
            <div className='relative w-full max-w-[200px] mx-auto'>
              <div className='absolute inset-0 border border-neon/30 rounded-sm opacity-50' />
              <div className='absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-neon/5 rounded-sm motion-safe:animate-pulse' />
              <div className='relative flex flex-wrap gap-2 justify-center items-center py-4 px-3'>
                {dicePool.flatMap((die, di) =>
                  Array.from({ length: Math.min(die.count, 6) }).map((_, ci) => {
                    const Icon = DICE_ICONS[die.sides];
                    return (
                      <div
                        key={`${die.sides}-${di}-${ci}`}
                        className='motion-safe:animate-[diceRoll_0.8s_ease-in-out_infinite]'
                        style={{
                          color: die.color,
                          animationDelay: `${(di * die.count + ci) * 0.08}s`,
                        }}
                      >
                        <Icon size={28} />
                      </div>
                    );
                  })
                )}
              </div>
              <div className='flex items-center justify-center gap-1.5 pb-2'>
                <span className='text-neon/50 font-sans text-[10px]' aria-hidden='true'>»</span>
                <span className='font-ocr text-xs text-neon/70 tracking-widest'>
                  ROLL IN PROGRESS
                </span>
                <span className='flex gap-0.5'>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className='inline-block w-1 h-1 rounded-full bg-neon/60 motion-safe:animate-pulse'
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        ) : currentResult ? (
          <DiceResult
            result={currentResult}
            heldDice={heldDice}
            onToggleDiceHold={handleToggleDiceHold}
            onReroll={handleReroll}
          />
        ) : (
          <p className='font-ocr text-xs text-text/30 py-2 text-center'>
            » Ready
          </p>
        )}
      </div>

      {/* History */}
      <RollHistory
        history={history}
        onSelectRoll={handleSelectHistoryRoll}
        onEditComment={handleEditComment}
        onClearHistory={handleClearHistory}
        isExpanded={historyExpanded}
        onToggleExpanded={() => setHistoryExpanded((v) => !v)}
      />
    </div>
  );
}
