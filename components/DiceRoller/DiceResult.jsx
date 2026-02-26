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
}) {
  if (!result) return null;

  return (
    <div className='bg-panel/20 p-2.5'>
      <div className='flex justify-between items-baseline gap-2 mb-1.5'>
        <span className='font-mono text-base text-neon/80'>
          {result.breakdown?.length
            ? result.breakdown.map((group, index) => {
            const sides = parseInt(
              group.notation.match(/\d+d(\d+)/)?.[1] || 0
            );
            const color =
              DICE_COLORS[sides] || 'var(--color-terminal-green)';
            return (
              <span key={index} className='inline-flex items-baseline gap-0.5'>
                {index > 0 && <span className='text-neon/30 mx-1'>|</span>}
                <span style={{ color }} className='font-bold'>
                  {group.notation}
                </span>
                <span className='text-neon/50'>[ </span>
                {group.results.map((roll, rollIndex) => {
                  const key = `${index}-${rollIndex}`;
                  const isHeld = heldDice?.has(key);
                  const isMax = roll === sides;
                  return (
                    <span key={rollIndex} className='inline-flex items-center gap-0.5'>
                      {rollIndex > 0 && (
                        <span className='text-neon/40'>, </span>
                      )}
                      <span
                        style={{
                          color: isHeld
                            ? 'var(--color-terminal-yellow)'
                            : color,
                          backgroundColor: isMax && !isHeld
                            ? 'rgba(0,255,65,0.12)'
                            : 'transparent',
                        }}
                        className='font-bold text-sm'
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
            );
          })
            : result.notation}
        </span>
        {result.modifier !== 0 && (
          <span className='text-sm font-bold text-neon/70 shrink-0'>
            {result.modifier > 0 ? '+' : ''}
            {result.modifier}
          </span>
        )}
        {result.comment && (
          <span className='font-ocr text-xs text-neon/50 italic truncate max-w-[35%] shrink-0'>
            &quot;{result.comment}&quot;
          </span>
        )}
      </div>

      {onToggleDiceHold && (
        <p className='font-ocr text-[9px] text-neon/40 mb-1.5'>
          Lock dice to keep them, then RE-ROLL UNHELD
        </p>
      )}

      <div className='flex justify-between items-center py-1.5 px-2 bg-panel/30'>
        <span className='font-ocr text-xs text-neon/60'>TOTAL</span>
        <span className='font-ibm text-base font-bold text-neon'>
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
