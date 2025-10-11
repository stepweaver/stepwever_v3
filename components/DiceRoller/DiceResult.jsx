import { DICE_ICONS, DICE_COLORS } from '@/lib/diceConstants';
import { formatTimestamp } from '@/utils/dateFormatter';

/**
 * Display a single dice roll result with breakdown
 */
export default function DiceResult({ result, onCopy }) {
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
                {group.results.map((roll, rollIndex) => (
                  <span
                    key={rollIndex}
                    className='px-2 py-1 border-2 rounded font-bold min-w-[36px] text-center text-sm max-lg:px-1.5 max-lg:py-0.5 max-lg:min-w-[32px] max-lg:text-sm max-lg:border'
                    style={{
                      borderColor: diceColor,
                      color: diceColor,
                      backgroundColor:
                        roll === sides
                          ? 'rgba(0, 255, 65, 0.1)'
                          : 'transparent',
                    }}
                  >
                    {roll}
                  </span>
                ))}
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

      <div className='flex justify-between items-center p-4 bg-terminal-dark border-2 border-terminal-green rounded-md text-2xl font-bold text-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.2)] max-lg:text-lg max-lg:p-2.5 max-lg:border'>
        <span>TOTAL:</span>
        <span>{result.total}</span>
      </div>

      {onCopy && (
        <div className='mt-4 text-center'>
          <button
            onClick={onCopy}
            className='py-2 px-4 bg-terminal-dark border-2 border-terminal-cyan rounded-md text-terminal-cyan font-ibm text-sm cursor-pointer transition-all hover:bg-terminal-cyan hover:text-terminal-dark hover:shadow-[0_0_10px_var(--color-terminal-cyan)]'
            aria-label='Copy roll notation'
          >
            📋 COPY NOTATION
          </button>
        </div>
      )}
    </div>
  );
}
