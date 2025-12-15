'use client';

import { useEffect } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvYQ0hZz1MKGOWR7_6lSFexmtjLUM8wXMH3Kj-GemwCj3X21AqIlOiCIZMyUTpqaekaA/exec';

export default function BookShowerPage() {
  useEffect(() => {
    // Hide navbar and footer, remove main padding
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) main.style.paddingTop = '0';
    
    // Cleanup on unmount
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (main) main.style.paddingTop = '';
    };
  }, []);

  return (
    <div className='fixed inset-0 w-full h-full' style={{ zIndex: 9999 }}>
      <iframe
        src={GOOGLE_SCRIPT_URL}
        width='100%'
        height='100%'
        frameBorder='0'
        title='Book Shower'
        className='w-full h-full'
        allow='fullscreen'
      />
    </div>
  );
}

