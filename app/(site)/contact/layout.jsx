export const metadata = {
  title: 'Contact',
  description:
    'Start a project or ask a question. Reach Stephen Weaver for web app, automation, and AI implementation work.',
  alternates: {
    canonical: 'https://stepweaver.dev/contact',
  },
  openGraph: {
    title: 'Contact | Stephen Weaver',
    description:
      'Start a project or ask a question. Reach Stephen Weaver for web app, automation, and AI implementation work.',
    type: 'website',
    url: 'https://stepweaver.dev/contact',
    images: [
      {
        url: 'https://stepweaver.dev/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Contact Stephen Weaver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Stephen Weaver',
    description:
      'Start a project or ask a question. Reach Stephen Weaver for web app, automation, and AI implementation work.',
    creator: '@stepweaver',
    site: '@stepweaver',
    images: ['https://stepweaver.dev/opengraph-image'],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
