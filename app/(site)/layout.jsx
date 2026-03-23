import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import PageTransition from '@/components/transition/PageTransition';
import ChatWidgetWrapper from '@/components/ChatWidget/ChatWidgetWrapper';

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id='main-content' role='main' className='pt-24'>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatWidgetWrapper />
    </>
  );
}
