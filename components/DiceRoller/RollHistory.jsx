import styles from '@/styles/dice-roller.module.css';

/**
 * Display roll history with the last N rolls
 */
export default function RollHistory({ history, onSelectRoll }) {
  if (!history || history.length === 0) {
    return (
      <div className={styles.historySection}>
        <div className={styles.historyTitle}>Roll History</div>
        <div className={styles.historyEmpty}>
          No rolls yet. Start rolling some dice!
        </div>
      </div>
    );
  }

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className={styles.historySection}>
      <div className={styles.historyTitle}>Roll History</div>
      {history.map((roll, index) => (
        <div
          key={index}
          className={styles.historyItem}
          onClick={() => onSelectRoll && onSelectRoll(roll)}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectRoll && onSelectRoll(roll);
            }
          }}
        >
          <div className={styles.historyItemHeader}>
            <span className={styles.historyItemNotation}>{roll.notation}</span>
            <span className={styles.historyItemTotal}>= {roll.total}</span>
          </div>
          <div className={styles.historyItemTimestamp}>
            {formatTimestamp(roll.timestamp)}
          </div>
        </div>
      ))}
    </div>
  );
}
