'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { parseChatLinks } from '@/utils/parseChatLinks';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  "Tell me about your background",
  "What kind of projects have you worked on?",
  "Are you open to work?",
];

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm Lambda, Stephen's AI advocate. I can answer questions about his background, skills, and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive (within container only)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  return (
    <div className='flex flex-col h-full'>
      {/* Chat Messages */}
      <div ref={messagesContainerRef} className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-terminal-cyan/20 text-terminal-cyan'
                  : 'bg-terminal-green/20 text-terminal-green'
              }`}
            >
              {message.role === 'user' ? (
                <User className='w-4 h-4' />
              ) : (
                <Bot className='w-4 h-4' />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] p-3 rounded font-ocr text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-text'
                  : 'bg-terminal-dark/50 border border-terminal-border text-terminal-text'
              }`}
            >
              {parseChatLinks(message.content)}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className='flex gap-3'>
            <div className='flex-shrink-0 w-8 h-8 rounded flex items-center justify-center bg-terminal-green/20 text-terminal-green'>
              <Bot className='w-4 h-4' />
            </div>
            <div className='bg-terminal-dark/50 border border-terminal-border p-3 rounded'>
              <Loader2 className='w-4 h-4 text-terminal-green animate-spin' />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className='p-3 bg-terminal-red/10 border border-terminal-red/30 rounded'>
            <p className='text-terminal-red font-ocr text-sm'>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Example Questions */}
      {messages.length <= 1 && (
        <div className='px-4 pb-2'>
          <p className='text-terminal-text/60 font-ocr text-xs mb-2'>
            Try asking:
          </p>
          <div className='flex flex-wrap gap-2'>
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(question)}
                className='px-3 py-1.5 text-xs font-ocr text-terminal-green border border-terminal-green/30 rounded hover:bg-terminal-green/10 hover:border-terminal-green/50 transition-colors cursor-pointer'
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
        className='p-4 border-t border-terminal-border/30'
      >
        <div className='flex gap-2'>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask me anything about Stephen...'
            className='flex-1 bg-terminal-dark/30 border border-terminal-border text-terminal-text font-ocr text-sm p-3 rounded focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,0,0.2)] placeholder:text-terminal-text/40'
            disabled={isLoading}
          />
          <button
            type='submit'
            disabled={isLoading || !input.trim()}
            className='px-4 py-2 bg-terminal-green/10 border border-terminal-green text-terminal-green rounded hover:bg-terminal-green/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer'
            aria-label='Send message'
          >
            <Send className='w-5 h-5' />
          </button>
        </div>
      </form>
    </div>
  );
}
