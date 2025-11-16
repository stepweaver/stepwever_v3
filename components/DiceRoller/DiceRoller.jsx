'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { roll, buildNotation, validateDicePool, rerollWithHeldDice } from '@/lib/roller';
import { DICE_ICONS, UI_CONSTANTS, getRandomColor } from '@/lib/diceConstants';
import errorMonitor from '@/utils/errorMonitor';
import DicePoolBuilder from './DicePoolBuilder';
import DiceResult from './DiceResult';
import RollHistory from './RollHistory';
import GlitchButton from '@/components/ui/GlitchButton';

/**
 * Main Dice Roller Component
 * Manages dice pool, rolling, history, and keyboard shortcuts
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
  const currentPoolRef = useRef(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('diceRollerHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      errorMonitor.logError(error, { context: 'Failed to load dice roller history' });
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('diceRollerHistory', JSON.stringify(history));
    } catch (error) {
      errorMonitor.logError(error, { context: 'Failed to save dice roller history' });
    }
  }, [history]);

  // Handle roll
  const handleRoll = useCallback(() => {
    if (!validateDicePool(dicePool) || isRolling) return;

    setIsRolling(true);
    setCopyStatus(false);

    // Rolling animation delay
    setTimeout(() => {
      const notation = buildNotation(dicePool, modifier);
      const result = roll(notation);

      // Add comment to the result
      result.comment = comment.trim();

      setCurrentResult(result);
      setHistory((prev) =>
        [result, ...prev].slice(0, UI_CONSTANTS.MAX_HISTORY)
      );
      setIsRolling(false);
      setComment(''); // Clear comment after roll
      setHeldDice(new Set()); // Clear held dice on new roll
    }, UI_CONSTANTS.ROLL_ANIMATION_DURATION);
  }, [dicePool, modifier, comment, isRolling]);

  // Handle re-roll with held dice
  const handleReroll = useCallback(() => {
    if (!currentResult || isRolling) return;

    setIsRolling(true);
    setCopyStatus(false);

    setTimeout(() => {
      const newResult = rerollWithHeldDice(currentResult, heldDice);
      newResult.comment = currentResult.comment || comment.trim();
      
      setCurrentResult(newResult);
      setHistory((prev) =>
        [newResult, ...prev].slice(0, UI_CONSTANTS.MAX_HISTORY)
      );
      setIsRolling(false);
    }, UI_CONSTANTS.ROLL_ANIMATION_DURATION);
  }, [currentResult, heldDice, isRolling, comment]);

  // Handle toggle dice hold
  const handleToggleDiceHold = useCallback((groupIndex, resultIndex) => {
    setHeldDice((prev) => {
      const newSet = new Set(prev);
      const key = `${groupIndex}-${resultIndex}`;
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // Handle copy notation
  const handleCopy = useCallback(() => {
    if (!currentResult) return;

    const notation = currentResult.notation;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(notation).then(
        () => {
          setCopyStatus(true);
          setTimeout(
            () => setCopyStatus(false),
            UI_CONSTANTS.COPY_STATUS_DURATION
          );
        },
        (err) => {
          errorMonitor.logError(err, { context: 'Failed to copy notation' });
          // Fallback for older browsers
          fallbackCopy(notation);
        }
      );
    } else {
      // Fallback for older browsers
      fallbackCopy(notation);
    }
  }, [currentResult]);

  // Fallback copy method
  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), UI_CONSTANTS.COPY_STATUS_DURATION);
    } catch (err) {
      errorMonitor.logError(err, { context: 'Fallback copy failed' });
    }
    document.body.removeChild(textArea);
  };

  // Handle reset
  const handleReset = useCallback(() => {
    setDicePool([]);
    setModifier(0);
    setComment('');
    setCurrentResult(null);
    setCopyStatus(false);
    setHeldDice(new Set());
  }, []);

  // Handle clear history
  const handleClearHistory = useCallback(() => {
    if (window.confirm('Clear all roll history?')) {
      setHistory([]);
      localStorage.removeItem('diceRollerHistory');
    }
  }, []);

  // Handle edit comment in history
  const handleEditComment = useCallback((index, newComment) => {
    setHistory((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], comment: newComment };
      return updated;
    });
  }, []);

  // Handle clear results
  const handleClearResults = useCallback(() => {
    setCurrentResult(null);
    setCopyStatus(false);
    setHeldDice(new Set());
  }, []);

  // Handle history item click
  const handleSelectHistoryRoll = useCallback((roll) => {
    setCurrentResult(roll);
    setCopyStatus(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in an input
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

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleRoll, handleCopy, handleReset, handleClearResults]);

  // Memoize canRoll to avoid recalculating on every render
  const canRoll = useMemo(
    () => validateDicePool(dicePool) && !isRolling,
    [dicePool, isRolling]
  );

  return (
    <div className='flex flex-col gap-2 p-2 font-ibm w-full max-w-full max-lg:gap-1.5 max-lg:p-1.5'>
      {/* Header Section */}
      <div className='flex flex-col items-center justify-center mb-4 pb-3 border-b border-terminal-border gap-3 max-lg:mb-1.5 max-lg:pb-1.5 max-lg:gap-1.5'>
        {/* Title */}
        <h1
          className='text-2xl text-terminal-green m-0 font-ibm tracking-wide max-lg:text-base'
          style={{ textShadow: 'var(--terminal-title-glow)' }}
        >
          RPG DICE ROLLER
        </h1>

        {/* Keyboard Shortcuts */}
        <div className='flex gap-3 items-center flex-wrap justify-center max-lg:hidden'>
          <div className='flex items-center gap-1'>
            <span className='px-1.5 py-0.5 bg-terminal-dark cyber-border-sm cyber-border-border font-ocr text-[0.65rem] text-terminal-green'>
              ENTER
            </span>
            <span className='text-sm'>Roll</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='px-1.5 py-0.5 bg-terminal-dark cyber-border-sm cyber-border-border font-ocr text-[0.65rem] text-terminal-green'>
              C
            </span>
            <span className='text-sm'>Copy</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='px-1.5 py-0.5 bg-terminal-dark cyber-border-sm cyber-border-border font-ocr text-[0.65rem] text-terminal-green'>
              R
            </span>
            <span className='text-sm'>Reset</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='px-1.5 py-0.5 bg-terminal-dark cyber-border-sm cyber-border-border font-ocr text-[0.65rem] text-terminal-green'>
              ESC
            </span>
            <span className='text-sm'>Clear</span>
          </div>
        </div>
      </div>

      {/* Main Content - 2-Column Grid */}
      <div className='flex flex-col gap-6 max-lg:gap-1.5'>
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_minmax(0,600px)] gap-6 lg:gap-16 items-start justify-center max-lg:gap-1.5'>
          {/* Left Column - Dice Selection & Controls */}
          <div className='flex flex-col gap-2 max-lg:gap-1.5'>
            <DicePoolBuilder
              dicePool={dicePool}
              onUpdatePool={setDicePool}
              modifier={modifier}
              setModifier={setModifier}
            />

            <div className='flex flex-col gap-1.5 max-lg:gap-1'>
              {/* Comment */}
              <input
                id='comment-input'
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='w-full p-2.5 bg-terminal-dark cyber-border-sm cyber-border-border text-terminal-text font-ibm text-sm text-left focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] [-webkit-font-smoothing:antialiased] [text-rendering:geometricPrecision] max-lg:p-1.5 max-lg:text-xs'
                placeholder='NOTE: e.g., Attack roll, initiative, saving throw...'
                aria-label='Roll comment'
                maxLength={UI_CONSTANTS.MAX_COMMENT_LENGTH}
              />

              {/* Action Buttons */}
              <div className='flex gap-2 max-lg:gap-1.5'>
                <GlitchButton
                  onClick={handleRoll}
                  disabled={!canRoll}
                  className='max-lg:text-xs max-lg:py-1.5'
                  style={{
                    flex: 2,
                    padding: '0.5rem',
                    fontSize: '0.85rem',
                  }}
                >
                  {isRolling ? 'ROLLING' : 'ROLL'}
                </GlitchButton>

                <GlitchButton
                  onClick={handleReset}
                  variant='secondary'
                  className='max-lg:text-[0.65rem] max-lg:py-1.5'
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                  }}
                >
                  RESET
                </GlitchButton>

                {currentResult && (
                  <GlitchButton
                    onClick={handleCopy}
                    variant='secondary'
                    className='max-lg:text-[0.65rem] max-lg:py-1.5'
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    {copyStatus ? '✓' : 'COPY'}
                  </GlitchButton>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Current Pool & Result */}
          <div className='flex flex-col gap-4 max-lg:gap-1.5'>
            {/* Current Pool Display */}
            <div ref={currentPoolRef}>
              <h3 className='text-terminal-green mb-3 text-xl max-lg:mb-1 max-lg:text-sm'>
                Current Pool
              </h3>
              <div className='flex flex-col gap-1 min-h-[30px] max-h-[200px] overflow-y-auto max-lg:max-h-[100px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-terminal-dark [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-terminal-border [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:bg-terminal-green'>
                {dicePool.length === 0 ? (
                  <div className='flex items-center justify-center text-terminal-muted italic min-h-[100px] max-lg:min-h-[40px] max-lg:text-[0.65rem]'>
                    Click dice above to add to pool
                  </div>
                ) : (
                  dicePool.map((die) => {
                    const IconComponent = DICE_ICONS[die.sides];

                    return (
                      <div
                        key={die.sides}
                        className='flex items-center justify-between py-1 px-1.5 bg-[rgba(13,18,17,0.4)] cyber-border-sm cyber-border-border gap-1 text-[0.7rem] max-w-[400px] max-lg:max-w-full'
                        style={{ borderColor: die.color }}
                      >
                        <div className='flex items-center gap-1.5 flex-1'>
                          <IconComponent
                            size={16}
                            className='max-lg:w-[24px] max-lg:h-[24px]'
                            style={{ color: die.color }}
                          />
                          <span
                            className='font-bold text-sm min-w-[50px] mr-auto'
                            style={{ color: die.color }}
                          >
                            d{die.sides}
                          </span>
                          <div className='flex items-center gap-1.5'>
                            <button
                              onClick={() => {
                                const updatedPool = dicePool
                                  .map((d) =>
                                    d.sides === die.sides
                                      ? {
                                          ...d,
                                          count: Math.max(0, d.count - 1),
                                        }
                                      : d
                                  )
                                  .filter((d) => d.count > 0);
                                setDicePool(updatedPool);
                              }}
                              className='w-[26px] h-[26px] border border-terminal-border bg-terminal-light cyber-border-sm text-sm font-bold cursor-pointer transition-all text-terminal-text flex items-center justify-center hover:bg-terminal-dark hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] disabled:opacity-30 disabled:cursor-not-allowed'
                              disabled={die.count <= 1}
                              aria-label={`Decrease ${die.sides}-sided dice count`}
                            >
                              −
                            </button>
                            <span className='min-w-8 text-center text-sm font-bold'>
                              {die.count}
                            </span>
                            <button
                              onClick={() => {
                                const updatedPool = dicePool.map((d) =>
                                  d.sides === die.sides
                                    ? { ...d, count: d.count + 1 }
                                    : d
                                );
                                setDicePool(updatedPool);
                              }}
                              className='w-[26px] h-[26px] border border-terminal-border bg-terminal-light cyber-border-sm text-sm font-bold cursor-pointer transition-all text-terminal-text flex items-center justify-center hover:bg-terminal-dark hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] disabled:opacity-30 disabled:cursor-not-allowed'
                              disabled={
                                die.count >= UI_CONSTANTS.MAX_DICE_COUNT
                              }
                              aria-label={`Increase ${die.sides}-sided dice count`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const updatedPool = dicePool.filter(
                              (d) => d.sides !== die.sides
                            );
                            setDicePool(updatedPool);
                          }}
                          className='p-1 bg-transparent border border-terminal-red text-terminal-red cyber-border-sm cursor-pointer transition-all font-bold text-xs hover:bg-terminal-red hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-red)]'
                          aria-label={`Remove ${die.sides}-sided dice from pool`}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Current Result */}
            {(currentResult || isRolling) && (
              <div className='flex flex-col gap-4 max-lg:gap-1.5'>
                <h3 className='text-terminal-green mb-3 text-xl max-lg:mb-1 max-lg:text-sm'>
                  Current Roll
                </h3>
                {isRolling ? (
                  <div className='flex flex-col items-center justify-center p-8 bg-terminal-dark border-2 border-terminal-green cyber-border animate-pulse max-lg:p-2 max-lg:border'>
                    <div className='flex flex-wrap gap-3 mb-4 justify-center max-w-[400px] max-lg:gap-1.5 max-lg:mb-1.5'>
                      {dicePool.flatMap((die, dieIndex) => {
                        const IconComponent = DICE_ICONS[die.sides];

                        // Create an array for each die based on count
                        return Array.from({
                          length: Math.min(die.count, 8),
                        }).map((_, countIndex) => (
                          <div
                            key={`${die.sides}-${dieIndex}-${countIndex}`}
                            className='animate-[diceRoll_0.8s_ease-in-out_infinite]'
                            style={{
                              color: die.color,
                              animationDelay: `${
                                (dieIndex * die.count + countIndex) * 0.08
                              }s`,
                            }}
                          >
                            <IconComponent
                              size={40}
                              className='max-lg:w-[36px] max-lg:h-[36px]'
                            />
                          </div>
                        ));
                      })}
                    </div>
                    <div className='text-terminal-green text-xl font-bold animate-[diceShake_0.5s_ease-in-out_infinite] max-lg:text-sm'>
                      ROLLING...
                    </div>
                  </div>
                ) : (
                  <DiceResult 
                    result={currentResult} 
                    heldDice={heldDice}
                    onToggleDiceHold={handleToggleDiceHold}
                    onReroll={handleReroll}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* History - Compact List Below */}
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_minmax(0,600px)] gap-6 lg:gap-16 justify-center'>
          <div className='max-w-[600px] w-full'>
            <RollHistory
              history={history}
              onSelectRoll={handleSelectHistoryRoll}
              onEditComment={handleEditComment}
              onClearHistory={handleClearHistory}
              isExpanded={historyExpanded}
              onToggleExpanded={() => setHistoryExpanded(!historyExpanded)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
