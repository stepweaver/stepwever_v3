'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  "Tell me about your background",
  "Are you open to work?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey! I'm Stephen's AI assistant. Ask me anything about his background, skills, or experience!",
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
          <div className='h-full flex flex-col cyber-border cyber-border-green bg-terminal-dark/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,0,0.2)] overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between px-4 py-3 border-b border-terminal-border/30 bg-terminal-dark/80'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1.5'>
                  <span className='w-2.5 h-2.5 rounded-full bg-terminal-red' />
                  <span className='w-2.5 h-2.5 rounded-full bg-terminal-yellow' />
                  <span className='w-2.5 h-2.5 rounded-full bg-terminal-green' />
                </div>
                <span className='font-ocr text-sm text-terminal-green ml-2'>
                  AI Chat
                </span>
                {hasNewMessage && isMinimized && (
                  <span className='w-2 h-2 rounded-full bg-terminal-cyan animate-pulse' />
                )}
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={toggleMinimize}
                  className='p-1 text-terminal-text/60 hover:text-terminal-green transition-colors cursor-pointer'
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  {isMinimized ? (
                    <Maximize2 className='w-4 h-4' />
                  ) : (
                    <Minimize2 className='w-4 h-4' />
                  )}
                </button>
                <button
                  onClick={toggleOpen}
                  className='p-1 text-terminal-text/60 hover:text-terminal-red transition-colors cursor-pointer'
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
                        className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-terminal-cyan/20 text-terminal-cyan'
                            : 'bg-terminal-green/20 text-terminal-green'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className='w-3 h-3' />
                        ) : (
                          <Bot className='w-3 h-3' />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[80%] p-2 rounded font-ocr text-xs leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-text'
                            : 'bg-terminal-dark/50 border border-terminal-border text-terminal-text'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className='flex gap-2'>
                      <div className='flex-shrink-0 w-6 h-6 rounded flex items-center justify-center bg-terminal-green/20 text-terminal-green'>
                        <Bot className='w-3 h-3' />
                      </div>
                      <div className='bg-terminal-dark/50 border border-terminal-border p-2 rounded'>
                        <Loader2 className='w-3 h-3 text-terminal-green animate-spin' />
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className='p-2 bg-terminal-red/10 border border-terminal-red/30 rounded'>
                      <p className='text-terminal-red font-ocr text-xs'>{error}</p>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Example Questions */}
                {messages.length <= 1 && (
                  <div className='px-3 pb-2'>
                    <p className='text-terminal-text/50 font-ocr text-[10px] mb-1'>
                      Try asking:
                    </p>
                    <div className='flex flex-wrap gap-1'>
                      {EXAMPLE_QUESTIONS.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleExampleClick(question)}
                          className='px-2 py-1 text-[10px] font-ocr text-terminal-green border border-terminal-green/30 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-colors cursor-pointer'
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
                  className='p-3 border-t border-terminal-border/30'
                >
                  <div className='flex gap-2'>
                    <input
                      ref={inputRef}
                      type='text'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder='Ask me anything...'
                      className='flex-1 bg-terminal-dark/30 border border-terminal-border text-terminal-text font-ocr text-xs p-2 rounded focus:outline-none focus:border-terminal-green focus:shadow-[0_0_8px_rgba(0,255,0,0.2)] placeholder:text-terminal-text/40'
                      disabled={isLoading}
                    />
                    <button
                      type='submit'
                      disabled={isLoading || !input.trim()}
                      className='px-3 py-2 bg-terminal-green/10 border border-terminal-green text-terminal-green rounded hover:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer'
                      aria-label='Send message'
                    >
                      <Send className='w-3 h-3' />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleOpen}
        className={`fixed bottom-4 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
          isOpen
            ? 'bg-terminal-red/20 border-2 border-terminal-red text-terminal-red hover:bg-terminal-red/30'
            : 'bg-terminal-green/20 border-2 border-terminal-green text-terminal-green hover:bg-terminal-green/30 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <>
            <MessageCircle className='w-6 h-6' />
            {hasNewMessage && (
              <span className='absolute top-0 right-0 w-3 h-3 rounded-full bg-terminal-cyan animate-pulse' />
            )}
          </>
        )}
      </button>
    </>
  );
}
