'use client';

import { useEffect, useState } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxrRqSH60pJN9HdoSDyO9vUCG-Uuv_aCewR5xILARQt3NKR6RrcirG3Zig8wTok61noDQ/exec';

export default function BookShowerPage() {
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [closedMessage, setClosedMessage] = useState(
    'Bookings are currently closed.'
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-terminal-dark'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center'>
          <p className='text-terminal-text font-ocr text-lg'>Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !bookingEnabled) {
    // If there's an error and we defaulted to disabled, show error
    return (
      <div
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-terminal-dark'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center max-w-md mx-auto p-8 border border-terminal-red bg-terminal-dark/30 backdrop-blur-xl'>
          <p className='text-terminal-red font-ocr text-base'>
            [ERROR] Error loading booking system: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!bookingEnabled) {
    return (
      <div
        className='fixed inset-0 w-full h-full flex items-center justify-center bg-terminal-dark'
        style={{ zIndex: 9999 }}
      >
        <div className='text-center max-w-md mx-auto p-8 border border-terminal-yellow bg-terminal-dark/30 backdrop-blur-xl'>
          <p className='text-terminal-yellow font-ocr text-lg whitespace-pre-line'>
            {closedMessage}
          </p>
        </div>
      </div>
    );
  }

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
