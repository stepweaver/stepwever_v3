import { useState } from 'react';

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
      <div>
        <div className='text-sm font-bold text-terminal-green uppercase tracking-wide'>
          Roll History
        </div>
        <div className='text-terminal-muted italic text-center py-8'>
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
    return `[${year}-${month}-${day} ${hours}:${minutes}]`;
  };

  const displayedHistory = isExpanded ? history : history.slice(0, 3);
  const hasMore = history.length > 3;

  return (
    <div>
      <div className='flex justify-between items-center mb-4 pb-2 border-b-2 border-terminal-border'>
        <div
          className='mb-0 flex items-center gap-2 text-sm font-bold text-terminal-green uppercase tracking-wide'
          style={{
            cursor: hasMore ? 'pointer' : 'default',
          }}
          onClick={hasMore ? onToggleExpanded : undefined}
        >
          {hasMore && (
            <span
              className='text-terminal-green text-sm transition-transform duration-200 inline-block'
              style={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
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
            className='py-1 px-2 bg-terminal-dark border-2 border-terminal-red rounded-md text-terminal-red font-ibm text-xs cursor-pointer transition-all hover:bg-terminal-red hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-red)]'
            aria-label='Clear history'
          >
            CLEAR
          </button>
        )}
      </div>
      {displayedHistory.map((roll, index) => (
        <div
          key={index}
          className='p-2 mb-1.5 bg-[rgba(13,18,17,0.4)] border border-terminal-border rounded cursor-pointer transition-all text-xs hover:bg-[rgba(13,18,17,0.6)] hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]'
        >
          <div
            onClick={() => !editingIndex && onSelectRoll && onSelectRoll(roll)}
            style={{ cursor: editingIndex === index ? 'default' : 'pointer' }}
          >
            <div className='flex justify-between items-center mb-2'>
              <span className='font-bold text-terminal-cyan'>
                {roll.notation}
              </span>
              <span className='font-bold text-terminal-green'>
                = {roll.total}
              </span>
            </div>

            {editingIndex === index ? (
              <div className='mt-2 flex gap-2 items-center'>
                <input
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className='flex-1 p-1 px-2 bg-terminal-dark border border-terminal-border rounded text-terminal-text font-ibm text-xs focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                  placeholder='Add comment...'
                  maxLength={100}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(index);
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className='py-1 px-2 bg-terminal-dark border-2 border-terminal-cyan rounded text-terminal-cyan font-ibm text-xs cursor-pointer transition-all hover:bg-terminal-cyan hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-cyan)]'
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className='py-1 px-2 bg-terminal-dark border-2 border-terminal-red rounded text-terminal-red font-ibm text-xs cursor-pointer transition-all hover:bg-terminal-red hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-red)]'
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                {roll.comment ? (
                  <div className='mt-1 text-xs text-terminal-cyan italic flex justify-between items-center'>
                    <span>"{roll.comment}"</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(index, roll.comment);
                      }}
                      className='bg-transparent border-none text-terminal-muted cursor-pointer text-xs p-0.5 px-1'
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
                    className='mt-1 bg-transparent border-none text-terminal-dimmed cursor-pointer text-xs italic p-0 text-left'
                  >
                    + add comment
                  </button>
                )}
                <div className='text-[0.7rem] text-terminal-dimmed'>
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
