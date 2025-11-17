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
  
  // Production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production to reduce bundle size

  // Compress output
  compress: true,

  // Better code splitting and smaller chunks
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle splitting for production
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
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
          }
        ]
      }
    ];
  }
};

export default nextConfig;
