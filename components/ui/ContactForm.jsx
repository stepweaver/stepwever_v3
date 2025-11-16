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
    setStatusText('Submitting...');

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
      <div>
        <TerminalWindow
          showStatusBar={true}
          statusText={statusText}
          lastUpdated={formattedDate}
          customTitleContent={
            <div className='text-terminal-green'>~/contact</div>
          }
        >
          <div className='p-4'>
            {status.error && (
              <div
                className='mb-4 p-2 border border-terminal-red bg-terminal-red/20 backdrop-blur-xl'
                role='alert'
                aria-live='polite'
              >
                <p className='text-terminal-red text-sm'>
                  [ERROR] {status.error}
                </p>
              </div>
            )}

            {status.success && (
              <div
                className='mb-4 p-2 border border-terminal-green bg-terminal-green/20 backdrop-blur-xl'
                role='status'
                aria-live='polite'
              >
                <p className='text-terminal-green text-sm'>
                  [SUCCESS] {status.success}
                </p>
              </div>
            )}

            <form
              className='space-y-3'
              onSubmit={handleSubmit}
              aria-label='Contact form'
            >
              <div>
                <label
                  htmlFor='name'
                  className='text-terminal-green text-sm block mb-1'
                >
                  Who am I chatting with?
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full bg-terminal-dark/30 backdrop-blur-xl border border-terminal-border text-terminal-text p-1.5 text-sm focus:outline-none focus:border-terminal-green focus:shadow-terminal-glow'
                  placeholder='Your name'
                  required
                  aria-required='true'
                  aria-describedby='name-error'
                />
                <div id='name-error' className='sr-only' role='alert'></div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-terminal-green text-sm block mb-1'
                >
                  Your best email:
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full bg-terminal-dark/30 backdrop-blur-xl border border-terminal-border text-terminal-text p-1.5 text-sm focus:outline-none focus:border-terminal-green focus:shadow-terminal-glow'
                  placeholder='your.email@company.com'
                  required
                  aria-required='true'
                  aria-describedby='email-error'
                />
                <div id='email-error' className='sr-only' role='alert'></div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='text-terminal-green text-sm block mb-1'
                >
                  What are you building, fixing, or exploring?
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full bg-terminal-dark/30 backdrop-blur-xl border border-terminal-border text-terminal-text p-1.5 text-sm h-48 focus:outline-none focus:border-terminal-green focus:shadow-terminal-glow'
                  placeholder='Include goals, timeline, budget, blockers, or any context you have handy.'
                  required
                  aria-required='true'
                  aria-describedby='message-help message-error'
                ></textarea>
                <p
                  id='message-help'
                  className='text-terminal-muted text-xs mt-1'
                >
                  Feel free to include goals, timeline, budget, or anything else
                  that helps.
                </p>
                <div id='message-error' className='sr-only' role='alert'></div>
              </div>

              <div className='pt-2 flex flex-col gap-3'>
                <GlitchButton
                  type='submit'
                  disabled={status.submitting}
                  isLoading={status.submitting}
                  loadingText='SENDING...'
                  className='w-fit max-w-[95%]'
                >
                  [SEND TRANSMISSION]
                </GlitchButton>
                <p className='text-terminal-muted text-xs'>
                  No perfect brief required. Write what you know - I'll help
                  clarify the rest.
                </p>
              </div>
            </form>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
