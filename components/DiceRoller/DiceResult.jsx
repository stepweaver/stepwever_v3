import { DICE_COLORS } from '@/lib/diceConstants';
import { Lock, LockOpen } from 'lucide-react';

/** Format result as history style: 1d20 [ 14 ] 3d6 [ 3, 3, 1 ] */
export function formatResultForDisplay(result) {
  if (!result?.breakdown?.length) return result?.notation || '';
  let out = result.breakdown
    .map((g) => `${g.notation}[ ${g.results.join(', ')} ]`)
    .join(' | ');
  if (result.modifier !== 0) {
    out += result.modifier > 0 ? ` +${result.modifier}` : ` ${result.modifier}`;
  }
  return out;
}

/**
 * Compact result display - terminal style, history format: 1d20 [14] 3d6 [3,3,1]
 */
export default function DiceResult({
  result,
  heldDice,
  onToggleDiceHold,
  onReroll,
  className = '',
}) {
  if (!result) return null;

  return (
    <div className={`bg-panel/20 p-3 sm:p-3.5 ${className}`}>
      <div className='space-y-2 mb-2'>
        {result.breakdown?.length ? (
          result.breakdown.map((group, index) => {
            const sides = parseInt(group.notation.match(/\d+d(\d+)/)?.[1] || 0);
            const color = DICE_COLORS[sides] || 'var(--color-terminal-green)';
            const groupTotal = group.results.reduce((sum, value) => sum + value, 0);
            return (
              <div
                key={index}
                className='flex items-start gap-2 py-1'
              >
                <span style={{ color }} className='font-mono font-bold text-sm shrink-0'>
                  {group.notation}
                </span>
                <span className='font-mono text-base text-neon/80 break-words'>
                  <span className='text-neon/50'>[ </span>
                  {group.results.map((roll, rollIndex) => {
                    const key = `${index}-${rollIndex}`;
                    const isHeld = heldDice?.has(key);
                    const isMax = roll === sides;
                    return (
                      <span key={rollIndex} className='inline-flex items-center gap-0.5 mr-1.5'>
                        {rollIndex > 0 && <span className='text-neon/40'>, </span>}
                        <span
                          style={{
                            color: isHeld ? 'var(--color-terminal-yellow)' : color,
                            backgroundColor: isMax && !isHeld
                              ? 'rgba(0,255,65,0.12)'
                              : 'transparent',
                          }}
                          className='font-bold text-lg leading-none'
                        >
                          {roll}
                        </span>
                        {onToggleDiceHold && (
                          <button
                            type='button'
                            onClick={() => onToggleDiceHold(index, rollIndex)}
                            className={`p-0.5 rounded transition-colors cursor-pointer ${
                              isHeld
                                ? 'text-terminal-yellow hover:text-terminal-yellow/80'
                                : 'text-neon/40 hover:text-neon/70'
                            }`}
                            aria-label={isHeld ? `Unhold die ${roll}` : `Hold die ${roll}`}
                          >
                            {isHeld ? (
                              <Lock size={10} className='shrink-0' />
                            ) : (
                              <LockOpen size={10} className='shrink-0' />
                            )}
                          </button>
                        )}
                      </span>
                    );
                  })}
                  <span className='text-neon/50'> ]</span>
                </span>
                <span className='ml-auto font-ibm text-sm text-neon/75 shrink-0'>
                  = {groupTotal}
                </span>
              </div>
            );
          })
        ) : (
          <p className='font-mono text-base text-neon/80'>{result.notation}</p>
        )}

        {(result.modifier !== 0 || result.comment) && (
          <div className='flex items-center justify-between gap-2'>
            {result.modifier !== 0 ? (
              <span className='text-sm font-bold text-neon/70 shrink-0'>
                {result.modifier > 0 ? '+' : ''}
                {result.modifier}
              </span>
            ) : (
              <span />
            )}
            {result.comment && (
              <span className='font-ocr text-xs text-neon/50 italic truncate max-w-[70%]'>
                &quot;{result.comment}&quot;
              </span>
            )}
          </div>
        )}
      </div>

      {onToggleDiceHold && (
        <p className='font-ocr text-[9px] text-neon/40 mb-1.5'>
          Lock dice to keep them, then RE-ROLL UNHELD
        </p>
      )}

      <div className='flex justify-between items-center py-2 px-2.5 bg-panel/30'>
        <span className='font-ocr text-sm text-neon/60'>TOTAL</span>
        <span className='font-ibm text-xl sm:text-2xl leading-none font-bold text-neon'>
          = {result.total}
        </span>
      </div>

      {onReroll && heldDice?.size > 0 && (
        <button
          onClick={onReroll}
          className='mt-2 w-full py-1.5 px-2 bg-panel/30 text-neon/80 hover:bg-neon/20 hover:text-neon font-ocr text-sm transition-colors cursor-pointer'
        >
          RE-ROLL UNHELD
        </button>
      )}
    </div>
  );
}
