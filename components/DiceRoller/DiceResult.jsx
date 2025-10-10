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

  return (
    <div className='animate-[fadeInUp_0.3s_ease-out] text-sm max-lg:w-full max-lg:max-w-full max-lg:overflow-hidden max-lg:box-border'>
      <div className='flex justify-between items-center mb-3 pb-2 border-b border-terminal-border max-lg:flex-col max-lg:items-start max-lg:gap-2'>
        <div className='flex flex-col gap-1'>
          <span className='text-xl font-bold text-terminal-green max-lg:text-xs max-lg:break-all max-lg:overflow-wrap-break-word max-lg:max-w-full'>
            {result.notation}
          </span>
          {result.comment && (
            <span className='text-sm text-terminal-cyan italic'>
              "{result.comment}"
            </span>
          )}
        </div>
        <span className='text-sm text-terminal-muted font-ocr'>
          {formatTimestamp(result.timestamp)}
        </span>
      </div>

      <div className='flex justify-between items-center p-4 bg-terminal-dark border-2 border-terminal-green rounded-md text-2xl font-bold text-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.2)] max-lg:text-xl'>
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
