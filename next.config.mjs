/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  // Compiler configuration to target modern browsers and exclude unnecessary polyfills
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production to reduce bundle size

  // Compress output
  compress: true,

  // Better code splitting and smaller chunks
  webpack: (config, { isServer, dev }) => {
    // Exclude unnecessary polyfills for modern browsers
    // These features are natively supported in all modern browsers
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Prevent polyfills from being included for Baseline features
        // These are natively supported in all modern browsers
        'core-js/modules/es.array.at': false,
        'core-js/modules/es.array.flat': false,
        'core-js/modules/es.array.flat-map': false,
        'core-js/modules/es.object.from-entries': false,
        'core-js/modules/es.object.has-own': false,
        'core-js/modules/es.string.trim-end': false,
        'core-js/modules/es.string.trim-start': false,
      };
    }

    // Optimize bundle splitting for production
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 20, // Reduced to prevent too many initial chunks
          minSize: 20000,
          maxSize: 244000, // Limit chunk size to improve parallel loading
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate chunk for React core - highest priority
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Icons chunk - split to reduce main bundle
            icons: {
              name: 'icons',
              test: /[\\/]node_modules[\\/](react-icons|lucide-react)[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // MDX and content processing libraries
            mdx: {
              name: 'mdx',
              test: /[\\/]node_modules[\\/](@mdx-js|next-mdx-remote|gray-matter|vfile-matter)[\\/]/,
              chunks: 'all',
              priority: 25,
            },
            // Vendor chunk for other node_modules (smaller, more granular)
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Common chunk for shared code between pages
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              minSize: 0,
            },
          },
        },
      };
    }

    // Bundle analyzer in development/production when ANALYZE is set
    if (process.env.ANALYZE === 'true' && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: './bundle-analysis.html',
        })
      );
    }

    return config;
  },

  async headers() {
    return [
      {
        // Cache static assets (JS, CSS, images, fonts) for 1 year
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets (images, fonts, etc.) for 1 year
        source: '/(.*\\.(?:js|css|woff|woff2|ttf|otf|eot|png|jpg|jpeg|gif|svg|ico|webp|avif|mp4|webm))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache insights/script.js and similar analytics scripts for 1 year
        source: '/insights/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML pages - short cache with revalidation
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://calendly.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://calendly.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https:",
              "connect-src 'self' https://calendly.com https://api.calendly.com https://api.openweathermap.org https://va.vercel-scripts.com",
              "frame-src 'self' https://calendly.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://calendly.com"
            ].join('; ')
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
