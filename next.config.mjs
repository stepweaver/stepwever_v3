/** @type {import('next').NextConfig} */
const nextConfig = {
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
