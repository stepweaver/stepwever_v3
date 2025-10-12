'use client';

export default function Update() {
  return (
    <div className='my-8 flex items-center gap-3'>
      <div className='flex-1 h-px bg-terminal-green/30'></div>
      <span className='text-terminal-green text-xs font-mono uppercase tracking-wider px-2'>
        Updated
      </span>
      <div className='flex-1 h-px bg-terminal-green/30'></div>
    </div>
  );
}
