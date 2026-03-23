import TerminalPageClient from './TerminalPageClient';

export const metadata = {
  title: 'Terminal',
  description:
    'Browser-based command interface for exploring projects, codex, and site navigation.',
};

export default function TerminalPage() {
  return <TerminalPageClient />;
}
