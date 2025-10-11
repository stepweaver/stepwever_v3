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
 * Display a single dice roll result with breakdown
 */
export default function DiceResult({ result, onCopy }) {
  if (!result) return null;

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `[${year}-${month}-${day} ${hours}:${minutes}]`;
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
          const IconComponent = DiceIcons[sides];
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
                    style={{ color: getDiceColor(sides) }}
                  />
                )}
                <span
                  className='font-bold text-sm max-lg:text-sm'
                  style={{ color: getDiceColor(sides) }}
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
                      borderColor: getDiceColor(sides),
                      color: getDiceColor(sides),
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
