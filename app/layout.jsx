import localFont from 'next/font/local';
import './globals.css';
import '../styles/mdx.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Analytics } from '@vercel/analytics/next';
import '@/utils/errorMonitor'; // Initialize error monitoring
import '@/utils/performanceMonitor'; // Initialize performance monitoring
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

// Environment validation in development
if (process.env.NODE_ENV === 'development') {
  const { logEnvironmentStatus } = await import('@/utils/envValidation');
  logEnvironmentStatus(true);
}

const ocrFont = localFont({
  src: './fonts/OCRA.woff',
  variable: '--font-ocr',
  display: 'swap',
});

const ibm3270 = localFont({
  src: './fonts/IBM_3270.woff',
  variable: '--font-ibm',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://stepweaver.dev'),
  title: {
    template: '%s | λstepweaver',
    default: 'λstepweaver - Practical transformation, powered by code.',
  },
  description:
    'Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences that transform businesses through efficient, scalable solutions.',
  keywords: [
    'business automation',
    'data pipelines',
    'web development',
    'growth systems',
    'business intelligence',
    'process automation',
    'full-stack development',
    'React',
    'Next.js',
    'Node.js',
    'data analytics',
    'business optimization',
    'startup technology',
    'SaaS development',
    'API integration',
  ],
  authors: [{ name: 'Stephen Weaver' }],
  creator: 'Stephen Weaver',
  publisher: 'λstepweaver LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stepweaver.dev/',
    siteName: 'λstepweaver',
    title: 'λstepweaver - Practical transformation, powered by code.',
    description:
      'Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences that transform businesses through efficient, scalable solutions.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Practical transformation, powered by code.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'λstepweaver - Practical transformation, powered by code.',
    description:
      'Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences that transform businesses through efficient, scalable solutions.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Practical transformation, powered by code.',
      },
    ],
    creator: '@stepweaver',
    site: '@stepweaver',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://stepweaver.dev/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
  manifest: '/manifest.js',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${ocrFont.variable} ${ibm3270.variable} antialiased`}
      data-theme='dark'
      suppressHydrationWarning // Suppress hydration warning for data-theme attribute which is set by client script
    >
      <head>
        <meta name='theme-color' content='#0d1211' />
        <meta name='color-scheme' content='dark light' />
        <meta name='supported-color-schemes' content='dark light' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />

        {/* Theme script to prevent flashing - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check for saved theme preference or default to system preference
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  const theme = savedTheme || systemTheme;
                  
                  // Set the theme immediately to prevent flashing
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Update meta tags for better mobile experience
                  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
                  if (metaThemeColor) {
                    metaThemeColor.setAttribute('content', theme === 'light' ? '#e8f0e8' : '#0d1211');
                  }
                  
                  // Add a class to prevent layout shift during theme transition
                  document.documentElement.classList.add('theme-loaded');
                } catch (e) {
                  // Fallback to dark theme if there's an error
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('theme-loaded');
                }
              })();
            `,
          }}
          strategy='beforeInteractive'
        />

        {/* Mobile-specific meta tags */}
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content='λstepweaver' />

        {/* Additional Open Graph tags for better mobile support */}
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/png' />
        <meta
          property='og:image:secure_url'
          content='https://stepweaver.dev/images/lambda_preview.png'
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* Resource hints for performance */}
        <link rel='dns-prefetch' href='https://va.vercel-scripts.com' />
        <link rel='dns-prefetch' href='https://assets.calendly.com' />
        <link rel='dns-prefetch' href='https://calendly.com' />
        <link rel='dns-prefetch' href='https://api.openweathermap.org' />

        {/* Preload critical images */}
        <link
          rel='preload'
          href='/images/lambda_preview.png'
          as='image'
          type='image/png'
        />
        <link
          rel='preload'
          href='/images/lambda_stepweaver.png'
          as='image'
          type='image/png'
        />

        {/* Preload critical fonts */}
        <link
          rel='preload'
          href='/fonts/OCRA.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/IBM_3270.woff'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
      </head>
      <body className='text-terminal-text'>
        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-terminal-green text-terminal-dark px-4 py-2 rounded font-ibm font-bold z-50'
        >
          Skip to main content
        </a>

        <ErrorBoundary>
          <ThemeProvider>
            <Navbar />
            <main id='main-content' role='main'>
              {children}
            </main>
            <Analytics />
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
