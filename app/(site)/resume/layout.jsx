export const metadata = {
  title: 'Resume',
  description:
    'Resume, experience highlights, and technical skill profile for Stephen Weaver.',
  alternates: {
    canonical: 'https://stepweaver.dev/resume',
  },
  openGraph: {
    title: 'Resume | Stephen Weaver',
    description:
      'Resume, experience highlights, and technical skill profile for Stephen Weaver.',
    type: 'profile',
    url: 'https://stepweaver.dev/resume',
    images: [
      {
        url: 'https://stepweaver.dev/resume/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Stephen Weaver Resume',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Stephen Weaver',
    description:
      'Resume, experience highlights, and technical skill profile for Stephen Weaver.',
    creator: '@stepweaver',
    site: '@stepweaver',
    images: ['https://stepweaver.dev/resume/opengraph-image'],
  },
};

export default function ResumeLayout({ children }) {
  return children;
}
