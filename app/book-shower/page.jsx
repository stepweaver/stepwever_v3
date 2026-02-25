'use client';

import { useEffect, useState } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyjvVhJ9UzjPHErwZ7tju4rSzBj7zeegW6HAnBdGNAafiUuWPFKDUysD3jnUFBtMZdQ3A/exec';

export default function BookShowerPage() {
  const [queryString, setQueryString] = useState('');
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [closedMessage, setClosedMessage] = useState(
    'Bookings are currently closed.'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build the Google Script URL with query parameters
  const getGoogleScriptUrl = () => {
    if (queryString) {
      // Remove leading '?' if present
      const cleanQuery = queryString.startsWith('?')
        ? queryString.slice(1)
        : queryString;
      return `${GOOGLE_SCRIPT_URL}?${cleanQuery}`;
    }
    return GOOGLE_SCRIPT_URL;
  };

  useEffect(() => {
    // Capture query parameters from URL
    if (typeof window !== 'undefined') {
      setQueryString(window.location.search);
    }

    // Hide navbar and footer, remove main padding
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) main.style.paddingTop = '0';

    // Fetch config to check booking status
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/book-shower?action=config');
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const data = await response.json();

        // Handle different response structures
        let enabled = true;
        let message = 'Bookings are currently closed.';

        if (data.booking_enabled !== undefined) {
          // Direct booking_enabled field
          enabled =
            data.booking_enabled === true ||
            data.booking_enabled === 'true' ||
            data.booking_enabled === 1 ||
            data.booking_enabled === '1';
          message = data.booking_closed_message || message;
        } else if (data.config) {
          // Nested config object
          const config = data.config;
          enabled =
            config.booking_enabled === true ||
            config.booking_enabled === 'true' ||
            config.booking_enabled === 1 ||
            config.booking_enabled === '1';
          message = config.booking_closed_message || message;
        }

        setBookingEnabled(enabled);
        setClosedMessage(message);
      } catch (err) {
        console.error('Error fetching booking config:', err);
        setError(err.message);
        // Default to enabled if we can't fetch config
        setBookingEnabled(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();

    // Cleanup on unmount
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (main) main.style.paddingTop = '';
    };
  }, []);

  if (loading) {
    return (
      <div
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-background'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center'>
          <p className='text-neon/50 font-ocr text-xs tracking-[0.2em] uppercase'>SCANNING MODULES...</p>
        </div>
      </div>
    );
  }

  if (error && !bookingEnabled) {
    // If there's an error and we defaulted to disabled, show error
    return (
      <div
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-background'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center max-w-md mx-auto p-8 border border-neon/30 rounded-lg bg-panel/50 '>
          <p className='text-neon font-ocr text-base'>
            [ERROR] Error loading booking system: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!bookingEnabled) {
    return (
      <div
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-background'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center max-w-md mx-auto p-8 border border-neon/30 rounded-lg bg-panel/50 '>
          <p className='text-neon font-ocr text-lg whitespace-pre-line'>
            {closedMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 w-full h-full' style={{ zIndex: 9999 }}>
      <iframe
        src={getGoogleScriptUrl()}
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
