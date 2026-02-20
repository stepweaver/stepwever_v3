'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage, {
  ChatLoadingIndicator,
} from '@/components/Chat/ChatMessage';
import ExampleQuestions from '@/components/Chat/ExampleQuestions';
import '@/components/ThemeToggle/ThemeToggle.css';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  'Tell me about your background',
  'Are you open to work?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const inputRef = useRef(null);

  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  } = useChat({ inputRef, isVisible: isOpen && !isMinimized });

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
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Widget Container */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 sm:right-6 z-[100] transition-all duration-300 ${
            isMinimized
              ? 'w-72 h-14'
              : 'w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh]'
          }`}
        >
          <div className='hud-panel h-full flex flex-col relative overflow-hidden' style={{ background: 'rgb(var(--panel))', backdropFilter: 'none' }}>
            {/* Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-neon/20' style={{ background: 'rgb(var(--panel))' }}>
              <div className='flex items-center gap-2 flex-wrap min-w-0'>
                <span className='font-ocr text-[10px] sm:text-xs tracking-[0.28em] text-neon/70 uppercase whitespace-nowrap'>
                  MODULE
                </span>
                <span
                  className='font-ocr text-neon/50 text-xs sm:text-sm'
                  aria-hidden
                >
                  //
                </span>
                <span className='font-ibm text-base sm:text-lg font-semibold text-neon whitespace-nowrap'>
                  λlambda
                </span>
                <span className='font-mono text-[10px] text-neon/50 ml-1 shrink-0 hidden sm:inline'>
                  CHAT-00
                </span>
                {hasNewMessage && isMinimized && (
                  <span className='w-2 h-2 rounded-full bg-neon animate-pulse shrink-0' />
                )}
              </div>
              <div className='flex items-center gap-2 shrink-0'>
                <button
                  type='button'
                  onClick={() => setIsMinimized(!isMinimized)}
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
                  <div className='flex gap-2'>
                    <input
                      ref={inputRef}
                      type='text'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder='Ask me anything...'
                      className='flex-1 bg-terminal-dark/30 border border-terminal-border text-terminal-text font-ocr text-base sm:text-sm min-h-[2.75rem] p-2.5 rounded focus:outline-none focus:border-terminal-green focus:shadow-[0_0_8px_rgba(0,255,0,0.2)] placeholder:text-terminal-text/50'
                      disabled={isLoading}
                    />
                    <button
                      type='submit'
                      disabled={isLoading || !input.trim()}
                      className='px-3 py-2 bg-neon/10 border border-neon text-neon rounded hover:bg-neon/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer'
                      aria-label='Send message'
                    >
                      <Send className='w-4 h-4' />
                    </button>
                  </div>
                  <p className='text-xs text-terminal-muted mt-2 text-center'>
                    Conversations are processed by Groq API and not stored.{' '}
                    <a
                      href='/privacy'
                      className='text-neon hover:text-accent underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type='button'
        onClick={toggleOpen}
        className={`fixed bottom-4 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 ${
          isOpen
            ? 'border-neon/50 text-neon hover:bg-neon/10'
            : 'border-neon text-neon hover:bg-neon/30'
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
    </>
  );
}
