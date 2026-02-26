'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { UI_CONSTANTS } from '@/lib/diceConstants';
import { formatTimestamp } from '@/utils/dateFormatter';

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
      <div className='bg-panel/10 px-3 py-2'>
        <p className='font-ocr text-[11px] tracking-[0.2em] text-neon/40 uppercase'>
          Roll history
        </p>
        <p className='font-ocr text-xs text-text/30 mt-1'>No rolls yet.</p>
      </div>
    );
  }

  const displayedHistory = isExpanded ? history : history.slice(0, 2);
  const hasMore = history.length > 2;

  return (
    <div className='flex flex-col rounded-sm border border-neon/15 bg-panel/10 overflow-hidden'>
      <div className='w-full flex items-center justify-between px-3 py-2 hover:bg-panel/20 transition-colors'>
        <button
          onClick={() => hasMore && onToggleExpanded?.()}
          className='flex items-center gap-2 text-left flex-1 min-w-0 bg-transparent border-none outline-none p-0 cursor-pointer'
        >
          <ChevronRight
            className={`w-3 h-3 text-neon/50 transition-transform duration-200 shrink-0 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
          <span className='font-ocr text-[11px] tracking-[0.2em] text-neon/50 uppercase'>
            Roll history
          </span>
          <span className='font-ocr text-xs text-text/40'>
            ({history.length})
          </span>
        </button>
        <button
          onClick={() => onClearHistory?.()}
          className='font-ocr text-[10px] text-danger/70 hover:text-danger transition-colors px-2 py-0.5 shrink-0 cursor-pointer border-none bg-transparent'
        >
          CLEAR
        </button>
      </div>

      <div
        className={`overflow-y-auto max-h-[160px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neon/20 [&::-webkit-scrollbar-thumb]:rounded ${
          !isExpanded ? 'border-t border-neon/10' : ''
        }`}
      >
        {displayedHistory.map((roll, index) => {
            let compactNotation =
            roll.breakdown?.length > 0
              ? roll.breakdown
                  .map((g) => `${g.notation}[ ${g.results.join(', ')} ]`)
                  .join(' | ')
              : roll.notation;
          if (roll.modifier !== 0) {
            compactNotation += roll.modifier > 0 ? ` +${roll.modifier}` : ` ${roll.modifier}`;
          }
          return (
          <div
            key={index}
            onClick={() => !editingIndex && onSelectRoll?.(roll)}
            className='px-2 py-1.5 border-b border-neon/5 last:border-b-0 hover:bg-panel/20 cursor-pointer transition-colors'
          >
            <div className='flex justify-between items-baseline gap-2'>
              <span className='font-mono text-xs text-neon/70 break-words min-w-0'>
                {compactNotation}
              </span>
              <span className='font-ibm text-sm font-bold text-neon shrink-0'>
                = {roll.total}
              </span>
            </div>

            {editingIndex === index ? (
              <div className='mt-2 flex gap-1.5 items-center'>
                <input
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className='flex-1 py-1 px-2 rounded bg-panel/50 border border-neon/20 text-text font-ibm text-xs focus:outline-none focus:border-neon/50'
                  placeholder='Comment...'
                  maxLength={UI_CONSTANTS.MAX_HISTORY_COMMENT_LENGTH}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(index);
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit(index);
                  }}
                  className='py-0.5 px-1.5 rounded border border-neon/40 text-neon text-xs cursor-pointer'
                >
                  ✓
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                  className='py-0.5 px-1.5 rounded border border-danger/40 text-danger text-xs cursor-pointer'
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-1.5 mt-0.5'>
                {roll.comment ? (
                  <>
                    <span className='text-[9px] text-neon/45 italic truncate flex-1 min-w-0'>
                      &quot;{roll.comment}&quot;
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(index, roll.comment);
                      }}
                      className='text-[11px] text-text/30 hover:text-neon/60 shrink-0 cursor-pointer'
                    >
                      ✎
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(index, '');
                    }}
                    className='text-[11px] text-text/25 italic hover:text-neon/50 cursor-pointer'
                  >
                    + comment
                  </button>
                )}
                <span className='text-[10px] text-text/20 shrink-0'>
                  {formatTimestamp(roll.timestamp)}
                </span>
              </div>
            )}
          </div>
        );
        })}
      </div>
    </div>
  );
}
