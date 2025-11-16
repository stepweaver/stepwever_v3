'use client';

export default function TerminalWindow({
  children,
  title = '~/terminal',
  className = '',
  showHeader = true,
  showStatusBar = false,
  statusText = 'Ready',
  lastUpdated = '',
  customTitleContent = null,
}) {
  return (
    <div
      className={`bg-transparent cyber-border cyber-border-green overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[rgba(0,255,0,0.02)] before:to-transparent before:bg-[length:100%_4px] before:pointer-events-none before:animate-[scanlines_20s_linear_infinite] before:z-[1] animate-pulse-glow ${className}`}
    >
      {showHeader && (
        <div className='bg-terminal-light border-b border-terminal-border px-4 py-3 relative z-[2]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <div className='w-3 h-3 rounded-full border border-terminal-border bg-[#ff5f56]'></div>
              <div className='w-3 h-3 rounded-full border border-terminal-border bg-[#ffbd2e]'></div>
              <div className='w-3 h-3 rounded-full border border-terminal-border bg-[#27ca3f]'></div>
            </div>
            <div className='text-terminal-text font-ibm text-sm text-shadow-[0_0_2px_rgba(0,255,65,0.5)] absolute left-1/2 transform -translate-x-1/2'>
              {customTitleContent || title}
            </div>
            <div className='w-12'></div>
          </div>
        </div>
      )}
      <div className='relative z-[2] bg-transparent terminal-glow'>
        {children}
      </div>

      {showStatusBar && (
        <div className='bg-terminal-light border-t border-terminal-border px-4 py-2 relative z-[2]'>
          <div className='flex items-center justify-between text-terminal-text text-xs'>
            <div className='flex items-center gap-4'>
              <span className='text-terminal-green'>Status:</span>
              <span
                className={
                  statusText === 'Message Sent!'
                    ? 'text-terminal-green'
                    : statusText.includes('Error')
                    ? 'text-terminal-red'
                    : 'text-terminal-text'
                }
              >
                {statusText}
              </span>
            </div>
            {lastUpdated && (
              <div className='text-terminal-muted'>
                Last updated: {lastUpdated}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
