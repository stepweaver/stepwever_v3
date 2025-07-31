# Performance Optimization Guide

This document outlines the performance optimizations implemented to address Core Web Vitals and improve overall site performance.

## 🚀 Implemented Optimizations

### 1. Image Optimization

#### Next.js Image Component Implementation

- **Replaced regular `<img>` tags with Next.js `<Image>` components**
- **Added priority loading for above-the-fold images**
- **Implemented proper lazy loading for off-screen images**
- **Added blur placeholders for better perceived performance**

```jsx
// Before
<img src={imageUrl} alt={title} className="w-full h-full object-cover" />

// After
<Image
  src={imageUrl}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
  priority={priority}
  loading={priority ? 'eager' : 'lazy'}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### Image Configuration

- **WebP and AVIF format support**
- **Responsive image sizes**
- **1-year cache TTL for images**
- **Proper content security policy for SVGs**

### 2. Resource Hints and Preloading

#### Critical Resource Preloading

```html
<!-- DNS prefetching for external domains -->
<link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
<link rel="dns-prefetch" href="https://assets.calendly.com" />

<!-- Preload critical images -->
<link
  rel="preload"
  href="/images/lambda_preview.png"
  as="image"
  type="image/png"
/>
<link
  rel="preload"
  href="/images/lambda_stepweaver.png"
  as="image"
  type="image/png"
/>

<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/OCRA.woff"
  as="font"
  type="font/woff"
  crossorigin="anonymous"
/>
<link
  rel="preload"
  href="/fonts/IBM_3270.woff"
  as="font"
  type="font/woff"
  crossorigin="anonymous"
/>
```

### 3. Next.js Configuration Optimizations

#### Enhanced Configuration

```javascript
// Image optimization
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year cache
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
},

// Performance optimizations
experimental: {
  optimizePackageImports: ['lucide-react', 'react-icons'],
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
},

// Compression and optimization
compress: true,
poweredByHeader: false,
generateEtags: false,
```

#### Webpack Optimizations

```javascript
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
  }
  return config;
},
```

### 4. Performance Monitoring

#### Core Web Vitals Tracking

- **Largest Contentful Paint (LCP)**
- **First Input Delay (FID)**
- **Cumulative Layout Shift (CLS)**
- **DOM size and depth tracking**
- **Image load performance**
- **Memory usage monitoring**

#### Development Metrics

```javascript
// Automatic logging in development
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.init();

  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 2000);
  });
}
```

### 5. Lazy Loading Components

#### Intersection Observer Implementation

```jsx
const LazyLoad = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true);
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasIntersected]);

  return (
    <div ref={ref} className={className} {...props}>
      {isVisible ? children : fallback}
    </div>
  );
};
```

### 6. HTTP Headers Optimization

#### Security and Performance Headers

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: '...'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()'
        }
      ]
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/fonts/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ];
}
```

## 📊 Performance Metrics

### Target Metrics

- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1
- **TTFB**: < 600 milliseconds

### Monitoring

- **Development**: Automatic console logging
- **Production**: Vercel Analytics integration
- **Custom metrics**: DOM size, image load times, memory usage

## 🔧 Additional Recommendations

### 1. Code Splitting

```javascript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### 2. Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Development analysis
npm run analyze:dev
```

### 3. Image Optimization Checklist

- [x] Use Next.js Image component
- [x] Implement proper sizing
- [x] Add priority loading for LCP images
- [x] Use WebP/AVIF formats
- [x] Implement lazy loading
- [x] Add blur placeholders
- [x] Optimize image dimensions

### 4. Font Optimization

- [x] Use `display: 'swap'` for fonts
- [x] Preload critical fonts
- [x] Use local fonts instead of Google Fonts
- [x] Implement font subsetting

### 5. JavaScript Optimization

- [x] Enable compression
- [x] Implement code splitting
- [x] Optimize package imports
- [x] Remove unused dependencies
- [x] Minimize bundle size

## 🚨 Common Performance Issues

### 1. Layout Shifts

- **Cause**: Images without dimensions, dynamic content
- **Solution**: Set explicit dimensions, use CSS containment

### 2. Large Bundle Size

- **Cause**: Unused dependencies, no code splitting
- **Solution**: Tree shaking, dynamic imports, bundle analysis

### 3. Slow Image Loading

- **Cause**: Large images, no optimization
- **Solution**: Next.js Image, proper sizing, lazy loading

### 4. Render Blocking Resources

- **Cause**: CSS/JS in head blocking rendering
- **Solution**: Critical CSS inlining, async loading

## 📈 Performance Monitoring

### Development Tools

- **Lighthouse**: Run audits locally
- **Chrome DevTools**: Performance tab
- **Bundle Analyzer**: Webpack bundle analysis
- **Custom Metrics**: Performance monitoring utility

### Production Monitoring

- **Vercel Analytics**: Core Web Vitals
- **Real User Monitoring**: Actual user experience
- **Error Tracking**: Performance-related errors

## 🔄 Continuous Optimization

### Regular Tasks

1. **Weekly**: Review performance metrics
2. **Monthly**: Analyze bundle size changes
3. **Quarterly**: Audit image optimization
4. **Annually**: Review and update dependencies

### Performance Budget

- **JavaScript**: < 300KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Images**: < 500KB total
- **Fonts**: < 100KB total

## 📚 Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)
