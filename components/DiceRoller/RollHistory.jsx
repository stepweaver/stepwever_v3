import { useState } from 'react';
import styles from '@/styles/dice-roller.module.css';

/**
 * Display roll history with the last N rolls
 */
export default function RollHistory({
  history,
  onSelectRoll,
  onEditComment,
  onClearHistory,
  isExpanded = false,
  onToggleExpanded,
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleStartEdit = (index, currentComment) => {
    setEditingIndex(index);
    setEditValue(currentComment || '');
  };

  const handleSaveEdit = (index) => {
    onEditComment(index, editValue);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

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

  const displayedHistory = isExpanded ? history : history.slice(0, 3);
  const hasMore = history.length > 3;

  return (
    <div className={styles.historySection}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: '2px solid var(--color-terminal-border)',
        }}
      >
        <div
          className={styles.historyTitle}
          style={{
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: hasMore ? 'pointer' : 'default',
          }}
          onClick={hasMore ? onToggleExpanded : undefined}
        >
          {hasMore && (
            <span
              style={{
                color: 'var(--color-terminal-green)',
                fontSize: '0.9rem',
                transition: 'transform 0.2s ease',
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}
            >
              ▸
            </span>
          )}
          Roll History
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className={styles.copyButton}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              borderColor: 'var(--color-terminal-red)',
              color: 'var(--color-terminal-red)',
            }}
            aria-label='Clear history'
          >
            CLEAR
          </button>
        )}
      </div>
      {displayedHistory.map((roll, index) => (
        <div key={index} className={styles.historyItem}>
          <div
            onClick={() => !editingIndex && onSelectRoll && onSelectRoll(roll)}
            style={{ cursor: editingIndex === index ? 'default' : 'pointer' }}
          >
            <div className={styles.historyItemHeader}>
              <span className={styles.historyItemNotation}>
                {roll.notation}
              </span>
              <span className={styles.historyItemTotal}>= {roll.total}</span>
            </div>

            {editingIndex === index ? (
              <div
                style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <input
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={styles.modifierInput}
                  placeholder='Add comment...'
                  maxLength={100}
                  style={{
                    flex: 1,
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(index);
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className={styles.copyButton}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className={styles.copyButton}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    borderColor: 'var(--color-terminal-red)',
                    color: 'var(--color-terminal-red)',
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                {roll.comment ? (
                  <div
                    style={{
                      marginTop: '0.25rem',
                      fontSize: '0.75rem',
                      color: 'var(--color-terminal-cyan)',
                      fontStyle: 'italic',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>"{roll.comment}"</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(index, roll.comment);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-terminal-muted)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        padding: '0.125rem 0.25rem',
                      }}
                      aria-label='Edit comment'
                    >
                      ✎
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(index, '');
                    }}
                    style={{
                      marginTop: '0.25rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-terminal-dimmed)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontStyle: 'italic',
                      padding: 0,
                      textAlign: 'left',
                    }}
                  >
                    + add comment
                  </button>
                )}
                <div className={styles.historyItemTimestamp}>
                  {formatTimestamp(roll.timestamp)}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
