import StartHerePageClient from './StartHerePageClient';

export const metadata = {
  title: 'Start Here | Stephen Weaver',
  description:
    'Guided entry for hiring managers, founders, and engineers. Find the right path through the portfolio based on who you are and what you need.',
  alternates: {
    canonical: 'https://stepweaver.dev/start-here',
  },
  openGraph: {
    title: 'Start Here | Stephen Weaver',
    description:
      'Guided entry for hiring managers, founders, and engineers. Find the right path through the portfolio.',
    url: 'https://stepweaver.dev/start-here',
    type: 'website',
  },
};

export default function StartHerePage() {
  return <StartHerePageClient />;
}
