'use client';

// Performance monitoring utility for tracking Core Web Vitals and other metrics
class PerformanceMonitor {
  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_PERFORMANCE_MONITORING === 'true';
    this.metrics = {};
    this.init();
  }

  init() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Track Core Web Vitals
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
    this.trackFCP();
    this.trackTTFB();

    // Track custom metrics
    this.trackCustomMetrics();
  }

  // Track Largest Contentful Paint
  trackLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;

        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', this.metrics.lcp);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Track First Input Delay
  trackFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;

          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', this.metrics.fid);
          }
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  // Track Cumulative Layout Shift
  trackCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;

        if (process.env.NODE_ENV === 'development') {
          console.log('CLS:', this.metrics.cls);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Track First Contentful Paint
  trackFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        this.metrics.fcp = firstEntry.startTime;

        if (process.env.NODE_ENV === 'development') {
          console.log('FCP:', this.metrics.fcp);
        }
      });
      observer.observe({ entryTypes: ['first-contentful-paint'] });
    }
  }

  // Track Time to First Byte
  trackTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navigationEntry = entries.find(entry => entry.entryType === 'navigation');
        if (navigationEntry) {
          this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;

          if (process.env.NODE_ENV === 'development') {
            console.log('TTFB:', this.metrics.ttfb);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Track custom metrics
  trackCustomMetrics() {
    // Track component render times
    this.trackComponentPerformance();

    // Track API response times
    this.trackAPIPerformance();
  }

  // Track component performance
  trackComponentPerformance() {
    const originalCreateElement = React.createElement;
    if (typeof React !== 'undefined') {
      React.createElement = function (...args) {
        const startTime = performance.now();
        const element = originalCreateElement.apply(this, args);

        // Track render time for key components
        if (args[0] && typeof args[0] === 'function') {
          const componentName = args[0].displayName || args[0].name;
          if (componentName && ['Terminal', 'Hero', 'ContactForm'].includes(componentName)) {
            setTimeout(() => {
              const renderTime = performance.now() - startTime;
              if (process.env.NODE_ENV === 'development') {
                console.log(`${componentName} render time:`, renderTime);
              }
            }, 0);
          }
        }

        return element;
      };
    }
  }

  // Track API performance
  trackAPIPerformance() {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      const startTime = performance.now();
      return originalFetch.apply(this, args).then(response => {
        const responseTime = performance.now() - startTime;
        if (process.env.NODE_ENV === 'development') {
          console.log('API Response Time:', responseTime, 'URL:', args[0]);
        }
        return response;
      });
    };
  }

  // Get all metrics
  getMetrics() {
    return this.metrics;
  }

  // Log metrics summary
  logMetricsSummary() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics Summary:', this.metrics);
    }
  }

  // Reset metrics
  reset() {
    this.metrics = {};
  }
}

const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor; 