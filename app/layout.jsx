import localFont from 'next/font/local';
import './globals.css';
import '../styles/mdx.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Analytics } from '@vercel/analytics/next';
import '@/utils/errorMonitor'; // Initialize error monitoring
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

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
    default: 'λstepweaver - Growth Systems for Fast-Moving Businesses',
  },
  description:
    'We build lean data pipelines, automations, and high-impact web experiences that slash waste and surface profit opportunities in weeks-not quarters.',
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
    title: 'λstepweaver - Growth Systems for Fast-Moving Businesses',
    description:
      'We build lean data pipelines, automations, and high-impact web experiences that slash waste and surface profit opportunities in weeks-not quarters.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Terminal-inspired business growth systems',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'λstepweaver - Growth Systems for Fast-Moving Businesses',
    description:
      'We build lean data pipelines, automations, and high-impact web experiences that slash waste and surface profit opportunities in weeks-not quarters.',
    images: [
      {
        url: '/images/lambda_preview.png',
        width: 1200,
        height: 630,
        alt: 'λstepweaver - Terminal-inspired business growth systems',
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
    >
      <head>
        <meta name='theme-color' content='#0d1211' />
        <meta name='color-scheme' content='dark' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
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
      </head>
      <body className='text-terminal-text'>
        <ErrorBoundary>
          <ThemeProvider>
            <Navbar />
            {children}
            <Analytics />
            <Footer />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
