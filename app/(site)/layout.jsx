import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import PageTransition from '@/components/transition/PageTransition';
import ChatWidgetWrapper from '@/components/ChatWidget/ChatWidgetWrapper';
import GlobalCommandPaletteWrapper from '@/components/navigation/GlobalCommandPaletteWrapper';

export default function SiteLayout({ children }) {
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
      <Footer />
      <ChatWidgetWrapper />
      <GlobalCommandPaletteWrapper />
    </>
  );
}
