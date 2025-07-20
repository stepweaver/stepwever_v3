'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-terminal-dark flex items-center justify-center p-8'>
          <div className='bg-terminal-light border border-terminal-red/30 rounded-lg p-8 max-w-md text-center'>
            <div className='text-terminal-red text-4xl mb-4'>⚠️</div>
            <h2 className='text-terminal-red font-ibm text-xl mb-4'>
              Something went wrong
            </h2>
            <p className='text-terminal-text font-ocr text-sm mb-6'>
              We encountered an unexpected error. Please refresh the page or try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-terminal-red text-terminal-dark font-ibm px-4 py-2 rounded border border-terminal-red hover:bg-terminal-red/80 transition-colors'
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
