import PageTransition from '@/components/transition/PageTransition';

export default function EmbedLayout({ children }) {
  return (
    <main id='main-content' role='main' className='p-0 pt-0'>
      <PageTransition>{children}</PageTransition>
    </main>
  );
}
