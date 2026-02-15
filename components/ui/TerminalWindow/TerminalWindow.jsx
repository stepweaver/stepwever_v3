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
      className={`hud-panel overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-[rgba(0,255,0,0.02)] before:to-transparent before:bg-[length:100%_4px] before:pointer-events-none before:motion-safe:animate-[scanlines_20s_linear_infinite] before:z-[1] ${className}`}
    >
      {showHeader && (
        <div className='bg-panel/80 border-b border-neon/30 px-4 py-3 relative z-[2]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <div className='w-3 h-3 rounded-full border border-neon/40 bg-[#ff5f56]'></div>
              <div className='w-3 h-3 rounded-full border border-neon/40 bg-[#ffbd2e]'></div>
              <div className='w-3 h-3 rounded-full border border-neon/40 bg-[#27ca3f]'></div>
            </div>
            <div className='text-neon font-ibm text-sm absolute left-1/2 transform -translate-x-1/2'>
              {customTitleContent || title}
            </div>
            <div className='w-12'></div>
          </div>
        </div>
      )}
      <div className='relative z-[2] bg-transparent'>
        {children}
      </div>

      {showStatusBar && (
        <div className='bg-panel/80 border-t border-neon/30 px-4 py-3 relative z-[2]'>
          <div className='flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm sm:text-base'>
            <div className='flex items-center gap-2 min-w-0'>
              <span className='text-neon font-ocr shrink-0'>Status:</span>
              <span
                className={
                  statusText === 'Message Sent!'
                    ? 'text-neon font-ibm'
                    : statusText.includes('Error')
                    ? 'text-danger font-ibm'
                    : 'text-text font-ibm'
                }
              >
                {statusText}
              </span>
            </div>
            {lastUpdated && (
              <div className='text-muted font-ocr text-sm shrink-0'>
                Last updated: {lastUpdated}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
