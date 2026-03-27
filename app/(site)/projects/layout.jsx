export const metadata = {
  title: 'Projects',
  description:
    'Case studies and build notes across web apps, automation, and client delivery work.',
  alternates: {
    canonical: 'https://stepweaver.dev/projects',
  },
  openGraph: {
    title: 'Projects | Stephen Weaver',
    description:
      'Case studies and build notes across web apps, automation, and client delivery work.',
    type: 'website',
    url: 'https://stepweaver.dev/projects',
    images: [
      {
        url: 'https://stepweaver.dev/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Stephen Weaver Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Stephen Weaver',
    description:
      'Case studies and build notes across web apps, automation, and client delivery work.',
    creator: '@stepweaver',
    site: '@stepweaver',
    images: ['https://stepweaver.dev/opengraph-image'],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
