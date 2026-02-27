'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send, Minimize2, Maximize2, Expand, Shrink } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage, {
  ChatLoadingIndicator,
} from '@/components/Chat/ChatMessage';
import ExampleQuestions from '@/components/Chat/ExampleQuestions';
import GlitchLambda from '@/components/ui/GlitchLambda';
import '@/components/ThemeToggle/ThemeToggle.css';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  'Tell me about your background',
  'Are you open to work?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const inputRef = useRef(null);

  const {
    messages,
    input,
    setInput,
    attachments,
    addAttachment,
    removeAttachment,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  } = useChat({ inputRef, isVisible: isOpen && !isMinimized });

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handlePaste = useCallback(
    (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file || file.size > 4 * 1024 * 1024) continue; // 4MB limit
          const reader = new FileReader();
          reader.onload = () => {
            addAttachment(reader.result, file.type);
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    },
    [addAttachment]
  );

  // Show notification dot when message arrives while minimized
  const prevMessageCount = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevMessageCount.current && isMinimized) {
      setHasNewMessage(true);
    }
    prevMessageCount.current = messages.length;
  }, [messages.length, isMinimized]);

  // Clear notification when opened
  useEffect(() => {
    if (isOpen && !isMinimized) setHasNewMessage(false);
  }, [isOpen, isMinimized]);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setIsFullscreen(false);
    } else {
      setIsOpen(false);
      setIsFullscreen(false);
    }
  };

  // Escape to exit fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  return (
    <>
      {/* Backdrop blur when chat is open */}
      {isOpen && (
        <button
          type='button'
          aria-label='Close chat'
          onClick={toggleOpen}
          className='fixed inset-0 z-[90] bg-black/30 cursor-pointer'
        />
      )}
      {/* Chat Widget Container */}
      {isOpen && (
        <div
          className={`fixed transition-all duration-300 ${
            isFullscreen
              ? 'inset-0 m-0 z-[200]'
              : `z-[100] ${isMinimized
                ? 'bottom-20 right-4 sm:right-6 w-72 h-14'
                : 'bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[min(28rem,90vw)] md:w-[min(32rem,90vw)] h-[500px] max-h-[70vh]'
              }`
          }`}
        >
          <div className='hud-panel h-full flex flex-col relative overflow-hidden' style={{ background: 'rgb(var(--panel))', backdropFilter: 'none', boxShadow: '0 0 24px rgb(var(--neon) / 0.25), 0 4px 30px rgba(0,0,0,0.4)' }}>
            {/* Header */}
            <div className='flex items-center justify-between px-4 pt-4 pb-3 border-b border-neon/20' style={{ background: 'rgb(var(--panel))' }}>
              <div className='flex items-center gap-2 flex-wrap min-w-0'>
                <span className='font-ibm text-base sm:text-lg font-semibold text-neon whitespace-nowrap'>
                  <GlitchLambda className='text-neon' size='small' />
                  lambda
                </span>
                <span className='font-mono text-[10px] text-neon/50 ml-1 shrink-0 hidden sm:inline'>
                  CHAT-00
                </span>
                {hasNewMessage && isMinimized && (
                  <span className='w-2 h-2 rounded-full bg-neon animate-pulse shrink-0' />
                )}
              </div>
              <div className='flex items-center gap-2 shrink-0'>
                {!isMinimized && (
                  <button
                    type='button'
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className='p-1 text-text/60 hover:text-neon transition-colors cursor-pointer'
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Expand to fullscreen'}
                  >
                    {isFullscreen ? (
                      <Shrink className='w-4 h-4' />
                    ) : (
                      <Expand className='w-4 h-4' />
                    )}
                  </button>
                )}
                <button
                  type='button'
                  onClick={() => {
                    if (isFullscreen) setIsFullscreen(false);
                    setIsMinimized(!isMinimized);
                  }}
                  className='p-1 text-text/60 hover:text-neon transition-colors cursor-pointer'
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  {isMinimized ? (
                    <Maximize2 className='w-4 h-4' />
                  ) : (
                    <Minimize2 className='w-4 h-4' />
                  )}
                </button>
                <button
                  type='button'
                  onClick={toggleOpen}
                  className='p-1 text-text/60 hover:text-neon transition-colors cursor-pointer'
                  aria-label='Close chat'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            </div>

            {/* Chat Content (hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className='flex-1 overflow-y-auto p-3 space-y-3 min-h-0'>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message}
                      variant='compact'
                    />
                  ))}
                  {isLoading && <ChatLoadingIndicator variant='compact' />}
                  {error && (
                    <div className='p-2.5 bg-danger/10 border border-danger/30 rounded-lg'>
                      <p className='text-danger font-ocr text-sm'>{error}</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Example Questions */}
                {messages.length <= 1 && (
                  <ExampleQuestions
                    questions={EXAMPLE_QUESTIONS}
                    onSelect={sendMessage}
                    disabled={isLoading}
                    variant='compact'
                  />
                )}

                {/* Input Form */}
                <form
                  onSubmit={handleSubmit}
                  className='p-3 border-t border-neon/20'
                >
                  {attachments.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-2'>
                      {attachments.map((att, i) => (
                        <div
                          key={i}
                          className='relative group inline-block'
                        >
                          <img
                            src={att.dataUrl}
                            alt='Pasted'
                            className='w-14 h-14 object-cover rounded border border-neon/30'
                          />
                          <button
                            type='button'
                            onClick={() => removeAttachment(i)}
                            className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            aria-label='Remove image'
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className='flex gap-2 items-end'>
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      placeholder='Ask me anything... (Shift+Enter for new line, paste images)'
                      rows={1}
                      className='flex-1 min-w-0 bg-panel/40 border border-neon/25 text-text font-ocr text-base sm:text-sm min-h-[2.75rem] max-h-32 p-2.5 focus:outline-none focus:ring-1 focus:ring-neon/40 focus:border-neon/50 placeholder:text-text/40 resize-y overflow-y-auto'
                      disabled={isLoading}
                      style={{ resize: 'vertical' }}
                    />
                    <button
                      type='submit'
                      disabled={isLoading || (!input.trim() && attachments.length === 0)}
                      className='px-3 py-2 bg-neon/10 border border-neon text-neon rounded hover:bg-neon/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0'
                      aria-label='Send message'
                    >
                      <Send className='w-4 h-4' />
                    </button>
                  </div>
                  <p className='text-xs text-text/40 font-ocr mt-2 text-center'>
                    Conversations are processed by Groq API and not stored.{' '}
                    <Link
                      href='/privacy'
                      className='text-neon hover:text-accent underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button - hidden when fullscreen */}
      {!isFullscreen && (
        <button
          type='button'
          onClick={toggleOpen}
          className={`fixed bottom-4 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 ${
            isOpen
              ? 'border-neon/50 text-neon hover:bg-neon/10'
              : 'border-neon text-neon hover:bg-neon/30 hover:shadow-[0_0_18px_rgb(var(--neon)/0.4)]'
          }`}
        style={{
          background: 'rgb(var(--panel))'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <>
              <MessageCircle className='w-6 h-6' />
              {hasNewMessage && (
                <span className='absolute top-0 right-0 w-3 h-3 rounded-full bg-neon motion-safe:animate-pulse' />
              )}
            </>
          )}
        </button>
      )}
    </>
  );
}
