'use client';

// Error monitoring utility for production-safe error handling
class ErrorMonitor {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 10;
    this.errorWindow = 60000; // 1 minute
    this.lastErrorTime = 0;
    this.isEnabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_ERROR_MONITORING === 'true';
  }

  logError(error, context = {}) {
    if (!this.isEnabled) return;

    const now = Date.now();

    // Reset error count if more than 1 minute has passed
    if (now - this.lastErrorTime > this.errorWindow) {
      this.errorCount = 0;
    }

    this.errorCount++;
    this.lastErrorTime = now;

    if (this.errorCount > this.maxErrors) {
      if (this.errorCount === this.maxErrors + 1) {
        console.warn('Too many errors detected, stopping error monitoring');
      }
      return;
    }

    const errorInfo = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      context,
      errorCount: this.errorCount
    };

    if (process.env.NODE_ENV === 'development') {
      console.error('Error Monitor:', errorInfo);
    } else {
      // In production, you might want to send to an error tracking service
      // console.error('Production Error:', errorInfo);
    }
  }

  logScrollError(error, context = {}) {
    this.logError(error, { ...context, type: 'scroll' });
  }

  logApiError(error, context = {}) {
    this.logError(error, { ...context, type: 'api' });
  }

  logComponentError(error, context = {}) {
    this.logError(error, { ...context, type: 'component' });
  }

  reset() {
    this.errorCount = 0;
    this.lastErrorTime = 0;
  }
}

const errorMonitor = new ErrorMonitor();

export default errorMonitor; 