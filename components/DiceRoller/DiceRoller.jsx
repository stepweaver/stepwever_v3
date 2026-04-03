'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { roll, buildNotation, validateDicePool, rerollWithHeldDice } from '@/lib/roller';
import { DICE_ICONS, UI_CONSTANTS } from '@/lib/diceConstants';
import errorMonitor from '@/utils/errorMonitor';
import DicePoolBuilder from './DicePoolBuilder';
import DiceResult, { formatResultForDisplay } from './DiceResult';
import RollHistory from './RollHistory';
import RollSessionModal from './RollSessionModal';
import GlitchButton from '@/components/ui/GlitchButton';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';

function formatSessionTime(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return null;
  }
}

const modalCmdBase =
  'font-ibm text-[10px] sm:text-[11px] tracking-[0.12em] uppercase px-3 sm:px-3.5 py-2 rounded-none transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none';

/**
 * Simplified dice roller - hex-centric, one screen, cyberpunk terminal vibe.
 */
export default function DiceRoller() {
  const { theme } = useTheme();
  const [dicePool, setDicePool] = useState([]);
  const [modifier, setModifier] = useState(0);
  const [comment, setComment] = useState('');
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [heldDice, setHeldDice] = useState(new Set());
  const [isRollModalOpen, setIsRollModalOpen] = useState(false);

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
    setIsRollModalOpen(true);
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
    }, UI_CONSTANTS.ROLL_ANIMATION_DURATION);
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
    }, UI_CONSTANTS.ROLL_ANIMATION_DURATION);
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

  const handleCopy = useCallback(() => {
    if (!currentResult) return;

    const text = formatResultForDisplay(currentResult);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), UI_CONSTANTS.COPY_STATUS_DURATION);
        },
        () => fallbackCopy(text)
      );
    } else {
      fallbackCopy(text);
    }
  }, [currentResult]);

  const handleReset = useCallback(() => {
    setDicePool([]);
    setModifier(0);
    setComment('');
    setCurrentResult(null);
    setCopyStatus(false);
    setHeldDice(new Set());
    setIsRollModalOpen(false);
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Clear all roll history?')) {
      setHistory([]);
      try {
        localStorage.removeItem('diceRollerHistory');
      } catch (e) {
        errorMonitor.logError(e, { context: 'Dice roller history clear' });
      }
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
    setIsRollModalOpen(true);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }
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
          if (isRollModalOpen) {
            setIsRollModalOpen(false);
          } else {
            handleClearResults();
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    handleRoll,
    handleCopy,
    handleReset,
    handleClearResults,
    isRollModalOpen,
  ]);

  const canRoll = useMemo(
    () => validateDicePool(dicePool) && !isRolling,
    [dicePool, isRolling]
  );
  const pendingNotation = useMemo(() => {
    if (!validateDicePool(dicePool)) return '';
    return buildNotation(dicePool, modifier);
  }, [dicePool, modifier]);
  const pageActionGridClass = currentResult ? 'grid-cols-2' : 'grid-cols-1';

  const rollLineDisplay = currentResult?.notation || pendingNotation || '-';
  const sessionTime = formatSessionTime(currentResult?.timestamp);
  const totalLabel = theme === 'skynet' ? 'THREAT SCORE' : 'TOTAL';
  const modalTitle =
    theme === 'skynet'
      ? 'ROLL OUTPUT // HOSTILE BUFFER'
      : 'ROLL OUTPUT // ACTIVE SESSION';

  const noteField = (
    <input
      type='text'
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className='flex-1 min-w-[10rem] min-h-[1.25rem] bg-transparent border-0 border-b border-neon/25 text-text/90 font-mono text-[10px] sm:text-[11px] py-0.5 focus:outline-none focus:border-accent/70 placeholder:text-text/25'
      placeholder='next pool note…'
      maxLength={UI_CONSTANTS.MAX_COMMENT_LENGTH}
      aria-label='Roll note'
    />
  );

  return (
    <>
      <div className='flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5 w-full px-2 md:px-4 pb-2 min-h-0'>
        <div className='flex-1 min-h-0 flex flex-col'>
          <DicePoolBuilder dicePool={dicePool} onUpdatePool={setDicePool} />

          <div className='mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 items-start'>
            <div className='min-w-0'>
              <span className='font-ocr text-[11px] tracking-widest text-neon/50 uppercase block mb-1.5'>
                POOL
              </span>
              {dicePool.length === 0 ? (
                <p className='font-ocr text-xs text-text/30'>No dice selected.</p>
              ) : (
                <div className='flex flex-wrap gap-1.5'>
                  {dicePool.map((die) => (
                    <div
                      key={die.sides}
                      className='inline-flex items-center gap-1 px-2 py-1 rounded border border-neon/15 bg-panel/20'
                      style={{ color: die.color }}
                    >
                      <span className='font-mono text-sm font-bold'>
                        [{die.count}d{die.sides}]
                      </span>
                      <button
                        onClick={() =>
                          setDicePool(dicePool.filter((d) => d.sides !== die.sides))
                        }
                        className='text-danger/50 hover:text-danger text-[10px] leading-none w-4 h-4 flex items-center justify-center rounded-sm hover:bg-danger/10 transition-colors cursor-pointer'
                        aria-label={`Remove all d${die.sides}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='shrink-0'>
              <span className='font-ocr text-[11px] tracking-widest text-neon/50 uppercase block mb-1.5'>
                MOD
              </span>
              <div className='inline-flex items-center gap-1 px-2 py-1 rounded border border-neon/15 bg-panel/20'>
                <button
                  onClick={() => setModifier(modifier - 1)}
                  className='w-4 h-4 flex items-center justify-center text-neon/70 hover:text-neon text-[10px] leading-none font-ibm transition-colors cursor-pointer'
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
                  className='w-9 py-0 bg-transparent text-neon font-mono text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-neon/50'
                  aria-label='Modifier'
                />
                <button
                  onClick={() => setModifier(modifier + 1)}
                  className='w-4 h-4 flex items-center justify-center text-neon/70 hover:text-neon text-[10px] leading-none font-ibm transition-colors cursor-pointer'
                  aria-label='Increase modifier'
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className={`mt-4 grid gap-2 ${pageActionGridClass}`}>
            <GlitchButton
              onClick={handleRoll}
              disabled={!canRoll}
              className='h-10 py-0 text-sm'
            >
              {isRolling ? 'ROLLING' : 'ROLL'}
            </GlitchButton>
            {currentResult && (
              <GlitchButton
                onClick={() => setIsRollModalOpen(true)}
                className='h-10 py-0 px-4 text-sm'
              >
                OPEN SESSION
              </GlitchButton>
            )}
          </div>
        </div>

        <div className='xl:w-96 xl:max-w-[34vw] min-w-0 xl:self-stretch xl:max-h-[68vh] overflow-hidden'>
          <RollHistory
            history={history}
            onSelectRoll={handleSelectHistoryRoll}
            onEditComment={handleEditComment}
            onClearHistory={handleClearHistory}
            isExpanded={historyExpanded}
            onToggleExpanded={() => setHistoryExpanded((v) => !v)}
          />
        </div>
      </div>
      <RollSessionModal
        isOpen={isRollModalOpen}
        onClose={() => setIsRollModalOpen(false)}
        title={modalTitle}
        closeLabel='ABORT'
        closeVariant='danger'
      >
        <div className='flex flex-col min-h-[200px] px-2.5 py-2 sm:px-3 sm:py-2.5 pb-0'>
          <div className='font-mono text-[10px] sm:text-[11px] space-y-1 text-neon/75 border-b border-neon/15 pb-2 mb-2 shrink-0'>
            <div className='flex flex-wrap gap-x-2 gap-y-0.5 items-baseline'>
              <span className='text-meta shrink-0'>ROLL //</span>
              <span className='text-neon/90 break-all'>{rollLineDisplay}</span>
            </div>
            <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
              <span className='text-meta shrink-0'>NOTE //</span>
              {currentResult && !isRolling ? (
                <span className='text-text/85 break-words'>{currentResult.comment || '-'}</span>
              ) : (
                noteField
              )}
            </div>
            {sessionTime && (
              <div className='flex flex-wrap gap-x-2 items-baseline text-meta'>
                <span>TIME //</span>
                <span className='tabular-nums text-neon/65'>{sessionTime}</span>
              </div>
            )}
          </div>

          <div className='min-h-[150px] w-full flex-1'>
            {isRolling ? (
              <div className='flex flex-col justify-center py-4 px-1 w-full'>
                <div className='relative w-full'>
                  <div className='absolute inset-0 rounded-none bg-neon/[0.04]' />
                  <div className='absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-neon/5 rounded-none motion-safe:animate-pulse' />
                  <div className='relative flex flex-wrap gap-2.5 justify-start items-center py-4 px-3'>
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
                            <Icon size={34} />
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className='flex items-center justify-start gap-1.5 pb-2 px-3'>
                    <span className='text-neon/50 font-sans text-[10px]' aria-hidden='true'>
                      »
                    </span>
                    <span className='font-ocr text-[10px] text-neon/70 tracking-[0.2em]'>
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
                variant='readout'
                totalLabel={totalLabel}
                hideResultComment
                showInlineReroll={false}
                className='w-full'
              />
            ) : (
              <div className='w-full border-l-2 border-l-accent/50 bg-surface/30 pl-3 pr-2 py-2.5'>
                {pendingNotation ? (
                  <>
                    <p className='font-ocr text-[10px] tracking-[0.16em] text-neon/45 uppercase'>
                      OUTPUT BUFFER // READY
                    </p>
                    <p className='mt-1 font-mono text-sm text-neon/80 break-words'>
                      {pendingNotation}
                    </p>
                  </>
                ) : (
                  <p className='font-ocr text-xs text-text/30'>» AWAITING POOL</p>
                )}
              </div>
            )}
          </div>

          <div
            className={`sticky bottom-0 z-[1] -mx-2.5 sm:-mx-3 mt-auto px-2.5 sm:px-3 py-2 border-t border-neon/20 bg-panel/95 flex flex-wrap gap-2 items-center ${
              theme === 'skynet' ? 'border-t-danger/30' : ''
            }`}
          >
            <button
              type='button'
              onClick={handleRoll}
              disabled={!canRoll}
              className={`${modalCmdBase} text-neon hover:bg-neon/10`}
            >
              ROLL
            </button>
            {currentResult && heldDice.size > 0 && (
              <button
                type='button'
                onClick={handleReroll}
                disabled={isRolling}
                className={`${modalCmdBase} text-accent hover:bg-accent/15`}
              >
                RE-ROLL UNHELD
              </button>
            )}
            {currentResult && (
              <button
                type='button'
                onClick={handleCopy}
                className={`${modalCmdBase} text-neon hover:bg-neon/10`}
              >
                {copyStatus ? 'COPIED' : 'COPY OUTPUT'}
              </button>
            )}
            <button
              type='button'
              onClick={handleClearResults}
              className={`${modalCmdBase} text-danger hover:bg-danger/10`}
            >
              PURGE
            </button>
          </div>
        </div>
      </RollSessionModal>
    </>
  );
}
