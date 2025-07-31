'use client';

// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.isInitialized = true;
    this.setupObservers();
    this.trackCoreWebVitals();
    this.trackCustomMetrics();
  }

  setupObservers() {
    // Observe layout shifts
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.cls = (this.metrics.cls || 0) + entry.value;
          }
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(layoutShiftObserver);
      } catch (e) {
        console.warn('Layout Shift Observer not supported');
      }

      // Observe largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP Observer not supported');
      }

      // Observe first input delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.fid = entry.processingStart - entry.startTime;
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID Observer not supported');
      }
    }
  }

  trackCoreWebVitals() {
    // Track navigation timing
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            this.metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.totalLoadTime = navigation.loadEventEnd - navigation.fetchStart;
          }
        }, 0);
      });
    }
  }

  trackCustomMetrics() {
    // Track image load performance
    const trackImagePerformance = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.complete) {
          this.recordImageLoad(img);
        } else {
          img.addEventListener('load', () => this.recordImageLoad(img));
          img.addEventListener('error', () => this.recordImageError(img));
        }
      });
    };

    // Track font load performance
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        this.metrics.fontsLoaded = performance.now();
      });
    }

    // Track resource timing
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.initiatorType === 'img') {
              this.metrics.imageLoadTimes = this.metrics.imageLoadTimes || [];
              this.metrics.imageLoadTimes.push({
                name: entry.name,
                duration: entry.duration,
                size: entry.transferSize
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (e) {
        console.warn('Resource Observer not supported');
      }
    }

    // Track DOM size
    const trackDOMSize = () => {
      this.metrics.domNodes = document.querySelectorAll('*').length;
      this.metrics.domDepth = this.getMaxDepth(document.body);
    };

    // Track memory usage (if available)
    if ('memory' in performance) {
      this.metrics.memoryUsage = performance.memory;
    }

    // Run tracking after page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        trackImagePerformance();
        trackDOMSize();
      });
    } else {
      trackImagePerformance();
      trackDOMSize();
    }
  }

  recordImageLoad(img) {
    this.metrics.imagesLoaded = (this.metrics.imagesLoaded || 0) + 1;
  }

  recordImageError(img) {
    this.metrics.imagesFailed = (this.metrics.imagesFailed || 0) + 1;
  }

  getMaxDepth(element, depth = 0) {
    if (!element || !element.children) return depth;

    let maxDepth = depth;
    for (const child of element.children) {
      maxDepth = Math.max(maxDepth, this.getMaxDepth(child, depth + 1));
    }
    return maxDepth;
  }

  getMetrics() {
    return {
      ...this.metrics,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
  }

  logMetrics() {
    const metrics = this.getMetrics();
    console.group('🚀 Performance Metrics');
    console.log('LCP:', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Not available');
    console.log('FID:', metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'Not available');
    console.log('CLS:', metrics.cls ? metrics.cls.toFixed(4) : 'Not available');
    console.log('DOM Nodes:', metrics.domNodes || 'Not available');
    console.log('Images Loaded:', metrics.imagesLoaded || 0);
    console.log('Images Failed:', metrics.imagesFailed || 0);
    console.log('Total Load Time:', metrics.totalLoadTime ? `${metrics.totalLoadTime.toFixed(2)}ms` : 'Not available');
    console.groupEnd();

    return metrics;
  }

  cleanup() {
    this.observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    this.observers = [];
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Initialize in development
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.init();

  // Log metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 2000); // Wait for all resources to load
  });
}

export default performanceMonitor; 