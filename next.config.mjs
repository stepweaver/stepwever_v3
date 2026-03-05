import { createRequire } from 'module';

/** @type {import('next').NextConfig} */
const require = createRequire(import.meta.url);
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', '@notionhq/client'],
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

  // Bundle analyzer when ANALYZE=true (e.g. npm run analyze)
  webpack: (config, { isServer }) => {
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
        // Next.js build assets (already fingerprinted)
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Public assets: fonts and images only (exclude unversioned .js/.css)
        source: '/(.*\\.(?:woff|woff2|ttf|otf|eot|png|jpg|jpeg|gif|svg|ico|webp|avif|mp4|webm))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Vercel Analytics: 1 hour cache (script may update without filename hash)
        source: '/insights/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      // No catch-all HTML Cache-Control: Next/Vercel manage per-route caching
      // CSP and security headers are set in middleware.js
    ];
  }
};

export default nextConfig;
