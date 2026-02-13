'use client';

import { useState, useEffect } from 'react';
import GlitchButton from '@/components/ui/GlitchButton';
import TerminalWindow from '@/components/ui/TerminalWindow/TerminalWindow';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });
  const [statusText, setStatusText] = useState('Ready');

  // Reset status text after success
  useEffect(() => {
    if (status.success) {
      setStatusText('Message Sent!');

      const timer = setTimeout(() => {
        setStatusText('Ready');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status.success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });
    setStatusText('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, success: data.message, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          success: null,
          error: data.error || 'Something went wrong',
        });
        setStatusText(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      setStatus({
        submitting: false,
        success: null,
        error: 'Failed to send message',
      });
      setStatusText('Error: Failed to send message');
    }
  };

  const formattedDate = `[${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}]`;

  return (
    <div className='space-y-6 sm:space-y-8'>
      <div className='relative z-10'>
        <TerminalWindow
          showStatusBar={true}
          statusText={statusText}
          lastUpdated={formattedDate}
          customTitleContent={
            <div className='text-neon font-ibm'>/contact</div>
          }
        >
          <div className='p-4 sm:p-5 relative z-10'>
            {status.error && (
              <div
                className='mb-4 p-3 border border-danger/60 bg-danger/10 rounded-lg backdrop-blur-xl'
                role='alert'
                aria-live='polite'
              >
                <p className='text-danger text-base font-ocr'>
                  [ERROR] {status.error}
                </p>
              </div>
            )}

            {status.success && (
              <div
                className='mb-4 p-3 border border-neon/50 bg-neon/10 rounded-lg backdrop-blur-xl'
                role='status'
                aria-live='polite'
              >
                <p className='text-neon text-base font-ocr'>
                  [SUCCESS] {status.success}
                </p>
              </div>
            )}

            <form
              className='space-y-4'
              onSubmit={handleSubmit}
              aria-label='Contact form'
            >
              <div>
                <label
                  htmlFor='name'
                  className='text-neon font-ocr text-base block mb-1.5'
                >
                  Your name:
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full bg-panel/50 backdrop-blur-xl border border-neon/30 rounded-lg text-text p-2.5 text-base font-ibm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 placeholder:text-muted'
                  placeholder='Jane Doe'
                  required
                  aria-required='true'
                  aria-describedby='name-error'
                />
                <div id='name-error' className='sr-only' role='alert'></div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-neon font-ocr text-base block mb-1.5'
                >
                  Your email:
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full bg-panel/50 backdrop-blur-xl border border-neon/30 rounded-lg text-text p-2.5 text-base font-ibm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 placeholder:text-muted'
                  placeholder='jane@example.com'
                  required
                  aria-required='true'
                  aria-describedby='email-error'
                />
                <div id='email-error' className='sr-only' role='alert'></div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='text-neon font-ocr text-base block mb-1.5'
                >
                  What&apos;s on your mind?
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full bg-panel/50 backdrop-blur-xl border border-neon/30 rounded-lg text-text p-2.5 text-sm font-ibm h-48 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 placeholder:text-muted resize-y'
                  placeholder='Say hello, ask a question, or share something interesting...'
                  required
                  aria-required='true'
                  aria-describedby='message-help message-error'
                ></textarea>
                <p
                  id='message-help'
                  className='text-text/70 text-sm mt-1.5 font-ocr'
                >
                  Whether it&apos;s a job opportunity, a question, or just saying hi, I&apos;d love to hear from you.
                </p>
                <div id='message-error' className='sr-only' role='alert'></div>
              </div>

              <div className='pt-2 flex flex-col gap-3'>
                <GlitchButton
                  type='submit'
                  disabled={status.submitting}
                  isLoading={status.submitting}
                  loadingText='SENDING...'
                  brackets={false}
                  className='w-fit max-w-[95%]'
                >
                  [[ SEND MESSAGE ]]
                </GlitchButton>
                <p className='text-text/70 text-sm font-ocr'>
                  I typically respond within a day or two.
                </p>
              </div>
            </form>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
