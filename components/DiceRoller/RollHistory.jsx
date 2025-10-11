import { useState } from 'react';
import {
  GiTriangleTarget,
  GiPerspectiveDiceSixFacesRandom,
  GiDiceEightFacesEight,
  GiDiceTarget,
  GiCubes,
  GiDiceTwentyFacesTwenty,
  GiRollingDices,
} from 'react-icons/gi';

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

  // Icon mapping for dice types
  const DiceIcons = {
    4: GiTriangleTarget,
    6: GiPerspectiveDiceSixFacesRandom,
    8: GiDiceEightFacesEight,
    10: GiDiceTarget,
    12: GiCubes,
    20: GiDiceTwentyFacesTwenty,
    100: GiRollingDices,
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
          className='mb-0 flex items-center gap-2 text-xl font-bold text-terminal-green tracking-wide'
          style={{
            cursor: hasMore ? 'pointer' : 'default',
          }}
          onClick={hasMore ? onToggleExpanded : undefined}
        >
          {hasMore && (
            <span
              className='text-terminal-green text-xl transition-transform duration-200 inline-block'
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
            <div className='flex justify-between items-center mb-1'>
              <span className='font-bold text-terminal-cyan'>
                {roll.notation}
              </span>
              <span className='font-bold text-terminal-green'>
                = {roll.total}
              </span>
            </div>

            {/* Individual Dice Results */}
            {roll.breakdown && roll.breakdown.length > 0 && (
              <div className='flex flex-col gap-1 mb-2 mt-1.5'>
                {roll.breakdown.map((group, groupIndex) => {
                  const sides = parseInt(
                    group.notation.match(/\d+d(\d+)/)?.[1] || 0
                  );
                  const IconComponent = DiceIcons[sides];
                  return (
                    <div
                      key={groupIndex}
                      className='flex flex-wrap items-center gap-1 text-[0.7rem]'
                    >
                      <div className='flex items-center gap-1'>
                        {IconComponent && (
                          <IconComponent
                            size={12}
                            style={{ color: getDiceColor(sides) }}
                          />
                        )}
                        <span
                          className='font-bold'
                          style={{ color: getDiceColor(sides) }}
                        >
                          {group.notation}:
                        </span>
                      </div>
                      <div className='flex flex-wrap gap-0.5'>
                        {group.results.map((rollValue, rollIndex) => (
                          <span
                            key={rollIndex}
                            className='px-1 py-0.5 border rounded font-bold min-w-[20px] text-center'
                            style={{
                              borderColor: getDiceColor(sides),
                              color: getDiceColor(sides),
                              fontSize: '0.65rem',
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
