import { DICE_ICONS, DICE_COLORS } from '@/lib/diceConstants';
import { formatTimestamp } from '@/utils/dateFormatter';
import { Lock } from 'lucide-react';

/**
 * Display a single dice roll result with breakdown
 */
export default function DiceResult({ result, onCopy, heldDice, onToggleDiceHold, onReroll }) {
  if (!result) return null;

  return (
    <div className='animate-[fadeInUp_0.3s_ease-out] text-sm max-lg:w-full max-lg:max-w-full max-lg:overflow-hidden max-lg:box-border'>
      <div className='flex justify-between items-center mb-3 pb-2 border-b border-terminal-border max-lg:flex-col max-lg:items-start max-lg:gap-1 max-lg:mb-2 max-lg:pb-1.5'>
        <div className='flex flex-col gap-1 max-lg:gap-0.5'>
          <span className='text-xl font-bold text-terminal-green max-lg:text-base max-lg:break-all max-lg:overflow-wrap-break-word max-lg:max-w-full'>
            {result.notation}
          </span>
          {result.comment && (
            <span className='text-sm text-terminal-cyan italic max-lg:text-sm'>
              "{result.comment}"
            </span>
          )}
        </div>
        <span className='text-sm text-terminal-muted font-ocr max-lg:text-sm'>
          {formatTimestamp(result.timestamp)}
        </span>
      </div>

      {/* Instructions for Dice Tray */}
      {onToggleDiceHold && (
        <div className='mb-3 p-2 bg-terminal-light/10 cyber-border-sm cyber-border-yellow text-xs text-terminal-yellow font-ocr max-lg:text-[0.65rem] max-lg:p-1.5'>
          <strong>Tip:</strong> Click on dice to hold them, then click "RE-ROLL UNHELD" to re-roll the rest
        </div>
      )}

      {/* Individual Dice Results */}
      <div className='flex flex-col gap-2 mb-3 max-lg:gap-1 max-lg:mb-2'>
        {result.breakdown.map((group, index) => {
          const sides = parseInt(group.notation.match(/\d+d(\d+)/)?.[1] || 0);
          const IconComponent = DICE_ICONS[sides];
          const diceColor = DICE_COLORS[sides] || 'var(--color-terminal-green)';
          return (
            <div
              key={index}
              className='flex flex-wrap items-center gap-2 max-lg:gap-1.5'
            >
              <div className='flex items-center gap-1.5 min-w-[70px] max-lg:min-w-[60px] max-lg:gap-1'>
                {IconComponent && (
                  <IconComponent
                    size={20}
                    className='max-lg:w-4 max-lg:h-4'
                    style={{ color: diceColor }}
                  />
                )}
                <span
                  className='font-bold text-sm max-lg:text-sm'
                  style={{ color: diceColor }}
                >
                  {group.notation}:
                </span>
              </div>
              <div className='flex flex-wrap gap-1.5 max-lg:gap-1'>
                {group.results.map((roll, rollIndex) => {
                  const diceKey = `${index}-${rollIndex}`;
                  const isHeld = heldDice && heldDice.has(diceKey);
                  return (
                    <button
                      key={rollIndex}
                      onClick={() => onToggleDiceHold && onToggleDiceHold(index, rollIndex)}
                      className={`px-2 py-1 border-2 cyber-border-sm font-bold min-w-[36px] text-center text-sm max-lg:px-1.5 max-lg:py-0.5 max-lg:min-w-[32px] max-lg:text-sm max-lg:border transition-all relative ${
                        onToggleDiceHold ? 'cursor-pointer hover:scale-110' : ''
                      }`}
                      style={{
                        borderColor: isHeld ? 'var(--color-terminal-yellow)' : diceColor,
                        color: isHeld ? 'var(--color-terminal-yellow)' : diceColor,
                        backgroundColor: isHeld
                          ? 'rgba(255, 255, 0, 0.2)'
                          : roll === sides
                          ? 'rgba(0, 255, 65, 0.1)'
                          : 'transparent',
                        boxShadow: isHeld ? '0 0 8px rgba(255, 255, 0, 0.5)' : 'none',
                      }}
                      title={isHeld ? 'Held - Click to release' : 'Click to hold'}
                      aria-label={isHeld ? `Held die showing ${roll} - Click to release` : `Die showing ${roll} - Click to hold`}
                    >
                      {isHeld && (
                        <Lock 
                          size={12} 
                          className='absolute -top-1 -right-1 text-terminal-yellow' 
                          style={{ filter: 'drop-shadow(0 0 2px rgba(255, 255, 0, 0.8))' }}
                        />
                      )}
                      {roll}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {result.modifier !== 0 && (
          <div className='flex items-center gap-2 max-lg:gap-1'>
            <span className='font-bold min-w-[60px] text-sm text-terminal-yellow max-lg:min-w-[50px] max-lg:text-sm'>
              Modifier:
            </span>
            <span className='text-terminal-yellow font-bold max-lg:text-sm'>
              {result.modifier > 0 ? '+' : ''}
              {result.modifier}
            </span>
          </div>
        )}
      </div>

      <div className='flex justify-between items-center p-4 bg-terminal-dark border-2 border-terminal-green cyber-border text-2xl font-bold text-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.2)] max-lg:text-lg max-lg:p-2.5 max-lg:border'>
        <span>TOTAL:</span>
        <span>{result.total}</span>
      </div>

      <div className='mt-4 flex gap-2 justify-center flex-wrap'>
        {onCopy && (
          <button
            onClick={onCopy}
            className='py-2 px-4 bg-terminal-dark border-2 border-terminal-cyan cyber-border-sm text-terminal-cyan font-ibm text-sm cursor-pointer transition-all hover:bg-terminal-cyan hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-cyan)]'
            aria-label='Copy roll notation'
          >
            COPY NOTATION
          </button>
        )}
        {onReroll && heldDice && heldDice.size > 0 && (
          <button
            onClick={onReroll}
            className='py-2 px-4 bg-terminal-dark border-2 border-terminal-yellow cyber-border-sm text-terminal-yellow font-ibm text-sm cursor-pointer transition-all hover:bg-terminal-yellow hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-yellow)]'
            aria-label='Re-roll unheld dice'
          >
            RE-ROLL UNHELD
          </button>
        )}
      </div>
    </div>
  );
}
