'use client';

export default function CalendlyModal({
  isOpen,
  onClose,
  calendlyUrl = 'https://calendly.com/stepweaver/discovery-call',
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative w-full h-full md:w-11/12 md:h-5/6 lg:w-4/5 lg:h-4/5 bg-terminal-dark cyber-border cyber-border-green overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-terminal-border/30'>
          <h2 className='text-terminal-green font-ibm text-lg'>
            Schedule a Discovery Call
          </h2>
          <button
            onClick={onClose}
            className='text-terminal-text hover:text-terminal-red transition-colors p-2'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Calendly iframe */}
        <div className='flex-1 w-full h-full'>
          <iframe
            src={calendlyUrl}
            width='100%'
            height='100%'
            frameBorder='0'
            title='Schedule a call'
            className='w-full h-full'
          />
        </div>
      </div>
    </div>
  );
}
