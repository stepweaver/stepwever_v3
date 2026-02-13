'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { parseChatLinks } from '@/utils/parseChatLinks';
import { useTheme } from '@/components/ThemeProvider/ThemeProvider';
import GlitchLambda from '@/components/ui/GlitchLambda';
import '@/components/ThemeToggle/ThemeToggle.css';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  "Tell me about your background",
  "Are you open to work?",
];

export default function ChatWidget() {
  const { theme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm λlambda, Stephen's AI advocate. I can answer questions about his background, skills, and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Clear new message indicator when opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const sendMessage = async (messageText = input) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    setError(null);
    setInput('');

    // Add user message
    const userMessage = { role: 'user', content: trimmedMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'widget',
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),        
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.message },
      ]);
      
      // Show notification if minimized
      if (isMinimized) {
        setHasNewMessage(true);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleExampleClick = (question) => {
    sendMessage(question);
  };

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
          <div className='h-full flex flex-col relative rounded-2xl border border-neon/25 bg-panel/95 backdrop-blur-xl shadow-[0_0_40px_rgba(90,255,140,0.15)] overflow-hidden'>
            {/* Tron corner embellishments */}
            <div className='pointer-events-none absolute left-2 top-2 h-1.5 w-6 border-l border-t border-neon/50 z-10' />
            <div className='pointer-events-none absolute bottom-2 right-2 h-1.5 w-6 border-b border-r border-neon/50 z-10' />
            {/* Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-neon/20 bg-panel/80'>
              <div className='flex items-center gap-2 flex-wrap min-w-0'>
                <span className='font-ocr text-[10px] sm:text-xs tracking-[0.28em] text-neon/70 uppercase whitespace-nowrap'>
                  MODULE
                </span>
                <span className='font-ocr text-neon/50 text-xs sm:text-sm' aria-hidden>
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
                  onClick={toggleMinimize}
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
                    <div
                      key={index}
                      className={`flex gap-2 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center overflow-hidden ${
                          message.role === 'user'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-neon/20 text-neon'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className='w-3.5 h-3.5' />
                        ) : (
                          <Image
                            src='/images/lambda_stepweaver.png'
                            alt=''
                            width={14}
                            height={14}
                            className={`lambda-icon object-contain ${mounted ? theme : 'dark'}`}
                            style={{ width: 'auto', height: 'auto' }}
                            aria-hidden
                          />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[80%] p-2.5 rounded font-ocr text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-text'
                            : 'bg-terminal-dark/50 border border-terminal-border text-terminal-text'
                        }`}
                      >
                        {parseChatLinks(message.content, {
                          renderAgentName: (key) => (
                            <GlitchLambda key={key} size='small' className='inline' />
                          ),
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className='flex gap-2'>
                      <div className='flex-shrink-0 w-7 h-7 rounded flex items-center justify-center bg-neon/20 overflow-hidden'>
                        <Image
                          src='/images/lambda_stepweaver.png'
                          alt=''
                          width={14}
                          height={14}
                          className={`lambda-icon object-contain ${mounted ? theme : 'dark'}`}
                          style={{ width: 'auto', height: 'auto' }}
                          aria-hidden
                        />
                      </div>
                      <div className='bg-panel/50 border border-neon/20 p-2.5 rounded-lg'>
                        <Loader2 className='w-4 h-4 text-neon animate-spin' />
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className='p-2.5 bg-danger/10 border border-danger/30 rounded-lg'>
                      <p className='text-danger font-ocr text-sm'>{error}</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Example Questions */}
                {messages.length <= 1 && (
                  <div className='px-3 pb-2'>
                    <p className='text-text/60 font-ocr text-xs mb-1.5'>
                      Try asking:
                    </p>
                    <div className='flex flex-wrap gap-1.5'>
                      {EXAMPLE_QUESTIONS.map((question, index) => (
                        <button
                          key={index}
                          type='button'
                          onClick={() => handleExampleClick(question)}
                          className='px-2.5 py-1.5 text-xs font-ocr text-neon border border-neon/30 rounded-lg hover:bg-neon/10 hover:border-neon/50 transition-colors cursor-pointer'
                          disabled={isLoading}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
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
                      className='flex-1 bg-terminal-dark/30 border border-terminal-border text-terminal-text font-ocr text-sm min-h-[2.75rem] p-2.5 rounded focus:outline-none focus:border-terminal-green focus:shadow-[0_0_8px_rgba(0,255,0,0.2)] placeholder:text-terminal-text/50'
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
                  {/* Privacy Disclosure */}
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
        className={`fixed bottom-4 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-panel/80 border-2 border-neon/50 text-neon hover:bg-neon/10'
            : 'bg-neon/20 border-2 border-neon text-neon hover:bg-neon/30 hover:shadow-[0_0_24px_rgba(90,255,140,0.35)]'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <>
            <MessageCircle className='w-6 h-6' />
            {hasNewMessage && (
              <span className='absolute top-0 right-0 w-3 h-3 rounded-full bg-neon animate-pulse' />
            )}
          </>
        )}
      </button>
    </>
  );
}
