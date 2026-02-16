'use client';

import { useRef } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage, {
  ChatLoadingIndicator,
} from '@/components/Chat/ChatMessage';
import ExampleQuestions from '@/components/Chat/ExampleQuestions';
import '@/components/ThemeToggle/ThemeToggle.css';

const EXAMPLE_QUESTIONS = [
  "What's your tech stack?",
  'Tell me about your background',
  'What kind of projects have you worked on?',
  'Are you open to work?',
];

export default function ChatBot() {
  const messagesContainerRef = useRef(null);
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
  } = useChat({ scrollRef: messagesContainerRef, inputRef });

  return (
    <div className='flex flex-col h-full'>
      {/* Chat Messages */}
      <div
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && <ChatLoadingIndicator />}
        {error && (
          <div className='p-3 bg-terminal-red/10 border border-terminal-red/30 rounded'>
            <p className='text-terminal-red font-ocr text-base'>{error}</p>
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
        />
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
            className='flex-1 bg-terminal-dark/30 border border-terminal-border text-terminal-text font-ocr text-base min-h-[2.75rem] p-3 rounded focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,0,0.2)] placeholder:text-terminal-text/50'
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
