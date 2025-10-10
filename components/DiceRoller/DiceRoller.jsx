'use client';

import { useState, useEffect, useCallback } from 'react';
import { roll, buildNotation, validateDicePool } from '@/lib/roller';
import DicePoolBuilder from './DicePoolBuilder';
import DiceResult from './DiceResult';
import RollHistory from './RollHistory';
import styles from '@/styles/dice-roller.module.css';

const MAX_HISTORY = 10;

/**
 * Main Dice Roller Component
 * Manages dice pool, rolling, history, and keyboard shortcuts
 */
export default function DiceRoller() {
  const [dicePool, setDicePool] = useState([]);
  const [modifier, setModifier] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

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

      setCurrentResult(result);
      setHistory((prev) => [result, ...prev].slice(0, MAX_HISTORY));
      setIsRolling(false);
    }, 500);
  }, [dicePool, modifier, isRolling]);

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
    setCurrentResult(null);
    setCopyStatus(false);
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
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            color: 'var(--color-terminal-green)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-ibm)',
            textShadow: 'var(--terminal-title-glow)',
          }}
        >
          🎲 RPG DICE ROLLER
        </h1>
        <p
          style={{
            color: 'var(--color-terminal-muted)',
            fontSize: '1rem',
          }}
        >
          Roll any combination of dice for your tabletop RPG sessions
        </p>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className={styles.shortcutsInfo}>
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

      {/* Main Content - Two Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Left Column - Dice Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DicePoolBuilder dicePool={dicePool} onUpdatePool={setDicePool} />

          {/* Modifier Section */}
          <div className={styles.modifierSection}>
            <label
              htmlFor='modifier-input'
              style={{
                color: 'var(--color-terminal-text)',
                fontWeight: 'bold',
              }}
            >
              Modifier:
            </label>
            <input
              id='modifier-input'
              type='number'
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
              className={styles.modifierInput}
              placeholder='0'
              aria-label='Roll modifier'
            />
          </div>

          {/* Roll Button */}
          <button
            onClick={handleRoll}
            disabled={!canRoll}
            className={`${styles.rollButton} ${
              isRolling ? styles.rolling : ''
            }`}
            aria-label='Roll dice'
          >
            {isRolling ? '🎲 ROLLING...' : '🎲 ROLL DICE'}
          </button>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={handleReset}
              className={styles.copyButton}
              style={{
                borderColor: 'var(--color-terminal-orange)',
                color: 'var(--color-terminal-orange)',
              }}
              aria-label='Reset dice pool'
            >
              RESET
            </button>
            {currentResult && (
              <button
                onClick={handleCopy}
                className={`${styles.copyButton} ${
                  copyStatus ? styles.copied : ''
                }`}
                aria-label='Copy notation to clipboard'
              >
                {copyStatus ? '✓ COPIED!' : '📋 COPY'}
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Results and History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Current Result */}
          {currentResult && (
            <div className={styles.resultsSection}>
              <h3
                style={{
                  color: 'var(--color-terminal-green)',
                  marginBottom: '0.75rem',
                  fontSize: '1.25rem',
                }}
              >
                Current Roll
              </h3>
              <DiceResult result={currentResult} />
            </div>
          )}

          {/* Roll History */}
          <RollHistory
            history={history}
            onSelectRoll={handleSelectHistoryRoll}
          />
        </div>
      </div>
    </div>
  );
}
