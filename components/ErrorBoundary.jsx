'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });

    // Log additional context for scroll-related errors
    if (error.message && error.message.includes('scroll')) {
      console.error('Scroll-related error detected. Context:', {
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        windowSize:
          typeof window !== 'undefined'
            ? `${window.innerWidth}x${window.innerHeight}`
            : 'unknown',
        scrollY: typeof window !== 'undefined' ? window.scrollY : 'unknown',
        documentHeight:
          typeof document !== 'undefined'
            ? document.documentElement.scrollHeight
            : 'unknown',
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center p-8'>
          <div className='bg-terminal-light cyber-border cyber-border-red p-8 max-w-md text-center'>
          <div className='text-terminal-red text-4xl mb-4'>!</div>
            <h2 className='text-terminal-red font-ibm text-xl mb-4'>
              Something went wrong
            </h2>
            <p className='text-terminal-text font-ocr text-sm mb-6'>
              We encountered an unexpected error. Please refresh the page or try
              again later.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='text-left mb-4 p-2 bg-terminal-dark cyber-border-sm cyber-border-border text-xs'>
                <summary className='cursor-pointer text-terminal-red mb-2'>
                  Error Details (Dev)
                </summary>
                <pre className='text-terminal-text overflow-auto'>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className='bg-terminal-red text-terminal-dark font-ibm px-4 py-2 cyber-border-sm cyber-border-red hover:bg-terminal-red/80 transition-colors'
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
