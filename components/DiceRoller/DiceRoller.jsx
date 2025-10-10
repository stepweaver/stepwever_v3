'use client';

import { useState, useEffect, useCallback } from 'react';
import { roll, buildNotation, validateDicePool } from '@/lib/roller';
import DicePoolBuilder from './DicePoolBuilder';
import DiceResult from './DiceResult';
import RollHistory from './RollHistory';
import GlitchButton from '@/components/ui/GlitchButton';
import styles from '@/styles/dice-roller.module.css';

const MAX_HISTORY = 10;

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

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('diceRollerHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('diceRollerHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, [history]);

  // Handle roll
  const handleRoll = useCallback(() => {
    if (!validateDicePool(dicePool) || isRolling) return;

    setIsRolling(true);
    setCopyStatus(false);

    // Brief animation delay
    setTimeout(() => {
      const notation = buildNotation(dicePool, modifier);
      const result = roll(notation);

      // Add comment to the result
      result.comment = comment.trim();

      setCurrentResult(result);
      setHistory((prev) => [result, ...prev].slice(0, MAX_HISTORY));
      setIsRolling(false);
      setComment(''); // Clear comment after roll
    }, 500);
  }, [dicePool, modifier, comment, isRolling]);

  // Handle copy notation
  const handleCopy = useCallback(() => {
    if (!currentResult) return;

    const notation = currentResult.notation;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(notation).then(
        () => {
          setCopyStatus(true);
          setTimeout(() => setCopyStatus(false), 2000);
        },
        (err) => {
          console.error('Failed to copy:', err);
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
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
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

  const canRoll = validateDicePool(dicePool) && !isRolling;

  return (
    <div className={styles.diceRollerContainer}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--color-terminal-border)',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '1.5rem',
            color: 'var(--color-terminal-green)',
            margin: '0',
            fontFamily: 'var(--font-ibm)',
            textShadow: 'var(--terminal-title-glow)',
            letterSpacing: '0.05em',
          }}
        >
          🎲 RPG DICE ROLLER
        </h1>

        {/* Keyboard Shortcuts */}
        <div className={styles.keyboardShortcuts}>
          <div className={styles.shortcut}>
            <span className={styles.shortcutKey}>ENTER</span>
            <span>Roll</span>
          </div>
          <div className={styles.shortcut}>
            <span className={styles.shortcutKey}>C</span>
            <span>Copy</span>
          </div>
          <div className={styles.shortcut}>
            <span className={styles.shortcutKey}>R</span>
            <span>Reset</span>
          </div>
          <div className={styles.shortcut}>
            <span className={styles.shortcutKey}>ESC</span>
            <span>Clear</span>
          </div>
        </div>
      </div>

      {/* Main Content - Compact 2-Column */}
      <div className={styles.mainGrid}>
        {/* Left Column - Builder, Controls & Current Roll */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <DicePoolBuilder dicePool={dicePool} onUpdatePool={setDicePool} />

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
          >
            {/* Modifier */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <label
                htmlFor='modifier-input'
                style={{
                  color: 'var(--color-terminal-green)',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  minWidth: '50px',
                }}
              >
                MOD:
              </label>
              <button
                onClick={() => setModifier(modifier - 1)}
                className={styles.quantityButton}
                style={{
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.85rem',
                  minWidth: '32px',
                }}
                aria-label='Decrease modifier'
              >
                −
              </button>
              <input
                id='modifier-input'
                type='number'
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                className={styles.modifierInput}
                placeholder='0'
                aria-label='Roll modifier'
                style={{
                  width: '60px',
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                }}
              />
              <button
                onClick={() => setModifier(modifier + 1)}
                className={styles.quantityButton}
                style={{
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.85rem',
                  minWidth: '32px',
                }}
                aria-label='Increase modifier'
              >
                +
              </button>
            </div>

            {/* Comment */}
            <input
              id='comment-input'
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.modifierInput}
              placeholder='NOTE: e.g., Attack roll, initiative, saving throw...'
              aria-label='Roll comment'
              maxLength={150}
              style={{
                width: '100%',
                maxWidth: 'none',
                padding: '0.6rem',
                fontSize: '0.9rem',
                textAlign: 'left',
              }}
            />

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <GlitchButton
                onClick={handleRoll}
                disabled={!canRoll}
                style={{
                  flex: 2,
                  padding: '0.5rem',
                  fontSize: '0.85rem',
                }}
              >
                {isRolling ? '⚡ ROLLING' : '🎲 ROLL'}
              </GlitchButton>

              <GlitchButton
                onClick={handleReset}
                variant='secondary'
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
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                  }}
                >
                  {copyStatus ? '✓' : '📋'}
                </GlitchButton>
              )}
            </div>
          </div>

          {/* Current Result */}
          {currentResult && (
            <div className={styles.resultsSection}>
              <h3
                style={{
                  color: 'var(--color-terminal-green)',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                ▸ Current Roll
              </h3>
              <DiceResult result={currentResult} />
            </div>
          )}
        </div>

        {/* Right Column - History Only */}
        <div>
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
  );
}
