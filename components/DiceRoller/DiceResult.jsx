import styles from '@/styles/dice-roller.module.css';

/**
 * Display a single dice roll result with breakdown
 */
export default function DiceResult({ result, onCopy }) {
  if (!result) return null;

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Color mapping for dice types
  const getDiceColor = (sides) => {
    const colorMap = {
      4: 'var(--color-terminal-cyan)',
      6: 'var(--color-terminal-green)',
      8: 'var(--color-terminal-yellow)',
      10: 'var(--color-terminal-blue)',
      12: 'var(--color-terminal-magenta)',
      20: 'var(--color-terminal-pink)',
      100: 'var(--color-terminal-purple)',
    };
    return colorMap[sides] || 'var(--color-terminal-green)';
  };

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultHeader}>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
        >
          <span className={styles.resultNotation}>{result.notation}</span>
          {result.comment && (
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-terminal-cyan)',
                fontStyle: 'italic',
              }}
            >
              "{result.comment}"
            </span>
          )}
        </div>
        <span className={styles.resultTimestamp}>
          {formatTimestamp(result.timestamp)}
        </span>
      </div>

      <div className={styles.resultTotal}>
        <span>TOTAL:</span>
        <span>{result.total}</span>
      </div>

      {onCopy && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            onClick={onCopy}
            className={styles.copyButton}
            aria-label='Copy roll notation'
          >
            📋 COPY NOTATION
          </button>
        </div>
      )}
    </div>
  );
}
