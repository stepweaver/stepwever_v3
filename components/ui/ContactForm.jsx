'use client';

import { useState, useEffect } from 'react';
import GlitchButton from '@/components/ui/GlitchButton';
import { useBotProtection } from '@/hooks/useBotProtection';

export default function ContactForm() {
  const { honeypotProps, getBotFields } = useBotProtection();
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

  useEffect(() => {
    if (status.success) {
      setStatusText('Message Sent!');
      const timer = setTimeout(() => setStatusText('Ready'), 5000);
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
        body: JSON.stringify({ ...formData, ...getBotFields() }),
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

  const inputBase =
    'w-full bg-panel/40 backdrop-blur-sm border border-neon/25 rounded-md text-text py-2.5 px-2 text-base font-ibm transition-colors focus:outline-none focus:border-neon/70 focus:ring-1 focus:ring-neon/30 placeholder:text-muted hover:border-neon/40';
  const labelClass = 'text-neon/90 font-ocr text-sm uppercase tracking-widest block mb-2';

  return (
    <div className='border-l-2 border-neon/50 pl-4'>
        {status.error && (
          <div
            className='mb-6 p-4 border border-danger/50 bg-danger/10 rounded-lg font-ocr text-sm text-danger'
            role='alert'
            aria-live='polite'
          >
            [ERROR] {status.error}
          </div>
        )}

        {status.success && (
          <div
            className='mb-6 p-4 border border-neon/40 bg-neon/10 rounded-lg font-ocr text-sm text-neon'
            role='status'
            aria-live='polite'
          >
            [SUCCESS] {status.success}
          </div>
        )}

        <form
          className='space-y-6'
          onSubmit={handleSubmit}
          aria-label='Contact form'
        >
          {/* Honeypot — invisible to humans, traps bots */}
          <div aria-hidden='true' className='absolute -left-[9999px] opacity-0 h-0 overflow-hidden'>
            <label htmlFor='_hp_website'>Website</label>
            <input {...honeypotProps} id='_hp_website' />
          </div>

          <div>
            <label htmlFor='name' className={labelClass}>
              Your name
            </label>
            <input
              id='name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={inputBase}
              placeholder='Jane Doe'
              required
              aria-required='true'
              aria-describedby='name-error'
            />
            <div id='name-error' className='sr-only' role='alert' />
          </div>

          <div>
            <label htmlFor='email' className={labelClass}>
              Your email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={inputBase}
              placeholder='jane@example.com'
              required
              aria-required='true'
              aria-describedby='email-error'
            />
            <div id='email-error' className='sr-only' role='alert' />
          </div>

          <div>
            <label htmlFor='message' className={labelClass}>
              What&apos;s on your mind?
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              className={`${inputBase} min-h-[140px] resize-y`}
              placeholder='Say hello, ask a question, or share something interesting...'
              required
              aria-required='true'
              aria-describedby='message-help message-error'
            />
            <p id='message-help' className='text-muted text-sm mt-2 font-ocr'>
              Job opportunity, question, or just saying hi — I&apos;d love to hear from you.
            </p>
            <div id='message-error' className='sr-only' role='alert' />
          </div>

          <div className='pt-2 flex flex-col gap-3'>
            <GlitchButton
              type='submit'
              disabled={status.submitting}
              isLoading={status.submitting}
              loadingText='SENDING...'
              brackets={false}
              className='w-fit'
            >
              [[ SEND MESSAGE ]]
            </GlitchButton>
            <p className='text-muted text-sm font-ocr'>
              I typically respond within a day or two.
            </p>
          </div>
        </form>

        {/* Minimal status line */}
        <div className='mt-6 pt-4 border-t border-neon/20 flex items-center gap-2 font-ocr text-xs text-muted'>
          <span className='text-neon/60'>Status:</span>
          <span
            className={
              statusText === 'Message Sent!'
                ? 'text-neon'
                : statusText.startsWith('Error')
                ? 'text-danger'
                : 'text-text/80 font-ibm'
            }
          >
            {statusText}
          </span>
        </div>
    </div>
  );
}
