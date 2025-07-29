'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';

export default function ThemeDemo() {
  const { theme } = useTheme();

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-ibm font-bold text-terminal-green mb-4'>
          Theme Toggle Demo
        </h1>
        <p className='text-terminal-text text-lg'>
          Current theme:{' '}
          <span className='text-terminal-yellow font-bold'>{theme}</span>
        </p>
      </div>

      {/* Color Palette Demo */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='p-4 border border-terminal-border bg-terminal-dark rounded-lg'>
          <div className='text-terminal-green font-ibm font-bold mb-2'>
            Green
          </div>
          <div className='text-terminal-green'>Primary accent color</div>
        </div>
        <div className='p-4 border border-terminal-border bg-terminal-dark rounded-lg'>
          <div className='text-terminal-yellow font-ibm font-bold mb-2'>
            Yellow
          </div>
          <div className='text-terminal-yellow'>Secondary accent</div>
        </div>
        <div className='p-4 border border-terminal-border bg-terminal-dark rounded-lg'>
          <div className='text-terminal-magenta font-ibm font-bold mb-2'>
            Magenta
          </div>
          <div className='text-terminal-magenta'>Tertiary accent</div>
        </div>
        <div className='p-4 border border-terminal-border bg-terminal-dark rounded-lg'>
          <div className='text-terminal-blue font-ibm font-bold mb-2'>Blue</div>
          <div className='text-terminal-blue'>Info color</div>
        </div>
      </div>

      {/* Button Demo */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-ibm font-bold text-terminal-green'>
          Button Styles
        </h2>
        <div className='flex flex-wrap gap-4'>
          <button className='glitch-button'>Primary Button</button>
          <button className='px-4 py-2 border border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-terminal-dark transition-colors duration-200'>
            Secondary Button
          </button>
          <button className='px-4 py-2 border border-terminal-magenta text-terminal-magenta hover:bg-terminal-magenta hover:text-terminal-dark transition-colors duration-200'>
            Tertiary Button
          </button>
        </div>
      </div>

      {/* Text Demo */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-ibm font-bold text-terminal-green'>
          Typography
        </h2>
        <div className='space-y-2'>
          <h1 className='text-3xl font-ibm font-bold text-terminal-green'>
            Heading 1
          </h1>
          <h2 className='text-2xl font-ibm font-bold text-terminal-yellow'>
            Heading 2
          </h2>
          <h3 className='text-xl font-ibm font-bold text-terminal-magenta'>
            Heading 3
          </h3>
          <p className='text-terminal-text'>
            This is regular body text. It should be readable in both light and
            dark themes.
          </p>
          <p className='text-terminal-muted'>
            This is muted text for less important information.
          </p>
        </div>
      </div>

      {/* Card Demo */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-ibm font-bold text-terminal-green'>
          Card Components
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='p-6 border border-terminal-border bg-terminal-dark rounded-lg'>
            <h3 className='text-xl font-ibm font-bold text-terminal-green mb-3'>
              Card Title
            </h3>
            <p className='text-terminal-text mb-4'>
              This is a sample card component that demonstrates how content
              looks in the current theme.
            </p>
            <button className='glitch-button'>Card Action</button>
          </div>
          <div className='p-6 border border-terminal-border bg-terminal-dark rounded-lg'>
            <h3 className='text-xl font-ibm font-bold text-terminal-yellow mb-3'>
              Another Card
            </h3>
            <p className='text-terminal-text mb-4'>
              Cards maintain their styling across themes while adapting colors
              appropriately.
            </p>
            <div className='flex gap-2'>
              <span className='px-2 py-1 bg-terminal-green text-terminal-dark text-sm rounded'>
                Tag 1
              </span>
              <span className='px-2 py-1 bg-terminal-yellow text-terminal-dark text-sm rounded'>
                Tag 2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-ibm font-bold text-terminal-green'>
          Status Indicators
        </h2>
        <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-terminal-green rounded-full animate-pulse'></div>
            <span className='text-terminal-text'>Online</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-terminal-yellow rounded-full animate-pulse'></div>
            <span className='text-terminal-text'>Warning</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-terminal-red rounded-full animate-pulse'></div>
            <span className='text-terminal-text'>Error</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-terminal-blue rounded-full animate-pulse'></div>
            <span className='text-terminal-text'>Info</span>
          </div>
        </div>
      </div>
    </div>
  );
}
