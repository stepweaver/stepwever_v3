import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import './globals.css';
import '../styles/mdx.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
// Analytics is a client component that handles its own lazy loading
import Analytics from '@/components/Analytics/Analytics';

// Lazy load below-the-fold and non-critical components
const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  ssr: true, // Keep SSR for SEO
});
const PageTransition = dynamic(
  () => import('@/components/transition/PageTransition'),
  {
    ssr: true,
  }
);

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
    default: 'λstepweaver - Practical transformations, powered by code.',
  },
  description:
    'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
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
    title: 'λstepweaver - Practical transformations, powered by code.',
    description:
      'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Practical transformations, powered by code.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'λstepweaver - Practical transformations, powered by code.',
    description:
      'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Practical transformations, powered by code.',
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
                  // Only run in browser environment
                  if (typeof window === 'undefined' || typeof document === 'undefined') {
                    return;
                  }
                  
                  // Check for saved theme preference or default to system preference
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  const theme = savedTheme || systemTheme;
                  
                  // Set the theme immediately to prevent flashing
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Update meta tags for better mobile experience
                  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
                  if (metaThemeColor) {
                    const themeColor = theme === 'light' ? '#e5e5e5' : theme === 'monochrome' ? '#000000' : theme === 'monochrome-inverted' ? '#ffffff' : theme === 'vintage' ? '#000000' : theme === 'apple' ? '#000000' : theme === 'c64' ? '#40318d' : theme === 'amber' ? '#1a0f00' : theme === 'synthwave' ? '#0a0a14' : theme === 'dracula' ? '#282a36' : theme === 'solarized' ? '#002b36' : theme === 'nord' ? '#2e3440' : theme === 'cobalt' ? '#193549' : '#0d1211';
                    metaThemeColor.setAttribute('content', themeColor);
                  }
                  
                  // Add a class to prevent layout shift during theme transition
                  document.documentElement.classList.add('theme-loaded');
                } catch (e) {
                  // Fallback to dark theme if there's an error
                  if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.add('theme-loaded');
                  }
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

        {/* Preload LCP image for better performance - WebP only (PNG is fallback) */}
        <link
          rel='preload'
          href='/images/screely-lambda.webp'
          as='image'
          type='image/webp'
          fetchPriority='high'
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
            <main id='main-content' role='main' className='pt-24'>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ThemeProvider>
          {/* Load Analytics after initial render to reduce blocking */}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
