import Navbar from '@/components/Navbar/Navbar';
import PageTransition from '@/components/transition/PageTransition';
import ChatWidgetWrapper from '@/components/ChatWidget/ChatWidgetWrapper';

export default function ConsoleLayout({ children }) {
  return (
    <>
      <Navbar />
      <main
        id='main-content'
        role='main'
        className='pt-20 md:pt-[5.5rem] lg:pt-24'
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <ChatWidgetWrapper />
    </>
  );
}
