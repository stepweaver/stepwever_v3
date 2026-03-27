import TerminalPageClient from './TerminalPageClient';

export const metadata = {
  title: 'Terminal',
  description:
    'Browser-based command interface for exploring projects, codex, and site navigation.',
  alternates: {
    canonical: 'https://stepweaver.dev/terminal',
  },
  openGraph: {
    title: 'Terminal | Stephen Weaver',
    description:
      'Browser-based command interface for exploring projects, codex, and site navigation.',
    type: 'website',
    url: 'https://stepweaver.dev/terminal',
    images: [
      {
        url: 'https://stepweaver.dev/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Stephen Weaver Terminal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal | Stephen Weaver',
    description:
      'Browser-based command interface for exploring projects, codex, and site navigation.',
    creator: '@stepweaver',
    site: '@stepweaver',
    images: ['https://stepweaver.dev/opengraph-image'],
  },
};

export default function TerminalPage() {
  return <TerminalPageClient />;
}
