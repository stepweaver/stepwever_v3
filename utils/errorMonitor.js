'use client';

// Error monitoring utility for production
class ErrorMonitor {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 10; // Prevent infinite error loops
    this.errorTypes = new Map();
  }

  logError(error, context = {}) {
    // Increment error count
    this.errorCount++;

    // Track error types
    const errorType = error.name || 'Unknown';
    this.errorTypes.set(errorType, (this.errorTypes.get(errorType) || 0) + 1);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Monitor:', {
        error: error.message,
        stack: error.stack,
        context,
        errorCount: this.errorCount,
        errorTypes: Object.fromEntries(this.errorTypes)
      });
    }

    // In production, you could send to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Add production error reporting here (e.g., Sentry, LogRocket, etc.)
      console.error('Production Error:', {
        message: error.message,
        name: error.name,
        context: {
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          timestamp: new Date().toISOString(),
          ...context
        }
      });
    }

    // Prevent infinite error loops
    if (this.errorCount > this.maxErrors) {
      console.warn('Too many errors detected, stopping error monitoring');
      return false;
    }

    return true;
  }

  // Specific handler for scroll-related errors
  logScrollError(error, scrollContext = {}) {
    const context = {
      type: 'scroll',
      scrollY: typeof window !== 'undefined' ? window.scrollY : 'unknown',
      documentHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 'unknown',
      viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 'unknown',
      ...scrollContext
    };

    return this.logError(error, context);
  }

  // Reset error count (useful for testing)
  reset() {
    this.errorCount = 0;
    this.errorTypes.clear();
  }

  // Get error statistics
  getStats() {
    return {
      totalErrors: this.errorCount,
      errorTypes: Object.fromEntries(this.errorTypes),
      maxErrorsReached: this.errorCount >= this.maxErrors
    };
  }
}

// Create singleton instance
const errorMonitor = new ErrorMonitor();

// Global error handler
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;

  window.onerror = function (message, source, lineno, colno, error) {
    // Call original handler if it exists
    if (originalOnError) {
      originalOnError.call(this, message, source, lineno, colno, error);
    }

    // Log to our monitor
    if (error) {
      errorMonitor.logError(error, {
        source,
        lineno,
        colno,
        message
      });
    }

    // Return false to allow default error handling
    return false;
  };

  // Handle unhandled promise rejections
  const originalOnUnhandledRejection = window.onunhandledrejection;

  window.onunhandledrejection = function (event) {
    // Call original handler if it exists
    if (originalOnUnhandledRejection) {
      originalOnUnhandledRejection.call(this, event);
    }

    // Log to our monitor
    if (event.reason) {
      errorMonitor.logError(event.reason, {
        type: 'unhandledRejection',
        promise: event.promise
      });
    }
  };
}

export default errorMonitor; 