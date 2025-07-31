/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
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
  }),

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
