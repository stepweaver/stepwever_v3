'use client';

import { useState } from 'react';
import { DICE_ICONS, DICE_COLORS, UI_CONSTANTS } from '@/lib/diceConstants';
import { formatTimestamp } from '@/utils/dateFormatter';

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
        <div className='text-xl font-bold text-terminal-green tracking-wide'>
          Roll History
        </div>
        <div className='text-terminal-muted italic text-center py-8'>
          No rolls yet. Start rolling some dice!
        </div>
      </div>
    );
  }

  const displayedHistory = isExpanded ? history : history.slice(0, 3);
  const hasMore = history.length > 3;

  return (
    <div>
      <div className='flex justify-between items-center mb-4 pb-2 border-b-2 border-terminal-border max-lg:mb-1'>
        <div
          className='mb-0 flex items-center gap-2 text-xl font-bold text-terminal-green tracking-wide max-lg:text-sm'
          style={{
            cursor: hasMore ? 'pointer' : 'default',
          }}
          onClick={hasMore ? onToggleExpanded : undefined}
        >
          {hasMore && (
            <span
              className='text-terminal-green text-xl transition-transform duration-200 inline-block max-lg:text-sm'
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
          className='p-1.5 mb-1 bg-[rgba(13,18,17,0.4)] border border-terminal-border rounded cursor-pointer transition-all text-xs hover:bg-[rgba(13,18,17,0.6)] hover:border-terminal-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]'
        >
          <div
            onClick={() => !editingIndex && onSelectRoll && onSelectRoll(roll)}
            style={{ cursor: editingIndex === index ? 'default' : 'pointer' }}
          >
            <div className='flex justify-between items-center mb-0.5'>
              <span className='font-bold text-terminal-cyan text-xs'>
                {roll.notation}
              </span>
              <span className='font-bold text-terminal-green text-xs'>
                = {roll.total}
              </span>
            </div>

            {/* Individual Dice Results */}
            {roll.breakdown && roll.breakdown.length > 0 && (
              <div className='flex flex-col gap-0.5 mb-1 mt-0.5'>
                {roll.breakdown.map((group, groupIndex) => {
                  const sides = parseInt(
                    group.notation.match(/\d+d(\d+)/)?.[1] || 0
                  );
                  const IconComponent = DICE_ICONS[sides];
                  const diceColor =
                    DICE_COLORS[sides] || 'var(--color-terminal-green)';
                  return (
                    <div
                      key={groupIndex}
                      className='flex flex-wrap items-center gap-1'
                    >
                      <div className='flex items-center gap-1 min-w-[50px]'>
                        {IconComponent && (
                          <IconComponent
                            size={16}
                            style={{ color: diceColor }}
                          />
                        )}
                        <span
                          className='font-bold text-xs'
                          style={{ color: diceColor }}
                        >
                          {group.notation}:
                        </span>
                      </div>
                      <div className='flex flex-wrap gap-0.5'>
                        {group.results.map((rollValue, rollIndex) => (
                          <span
                            key={rollIndex}
                            className='px-1 py-0.5 border rounded font-bold min-w-[22px] text-center text-xs'
                            style={{
                              borderColor: diceColor,
                              color: diceColor,
                            }}
                          >
                            {rollValue}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {editingIndex === index ? (
              <div className='mt-2 flex gap-2 items-center'>
                <input
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className='flex-1 p-1 px-2 bg-terminal-dark border border-terminal-border rounded text-terminal-text font-ibm text-xs focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                  placeholder='Add comment...'
                  maxLength={UI_CONSTANTS.MAX_HISTORY_COMMENT_LENGTH}
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
