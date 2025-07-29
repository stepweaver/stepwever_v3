export default function LoadingSpinner() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='text-terminal-green font-ibm text-2xl mb-4 animate-pulse'>
          {message}
        </div>
        <div className='flex justify-center space-x-1'>
          <div className='w-2 h-2 bg-terminal-green rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-terminal-cyan rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-2 h-2 bg-terminal-magenta rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
