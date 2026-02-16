import { useState, useRef, useEffect, useCallback } from 'react';
import { useBotProtection } from '@/hooks/useBotProtection';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! I'm λlambda, Stephen's AI advocate. I can answer questions about his background, skills, and experience. What would you like to know?",
};

/**
 * Shared chat logic used by both ChatWidget and ChatBot.
 * Handles message state, sending, loading, errors, and auto-scroll.
 */
export function useChat({ scrollRef, inputRef, isVisible = true } = {}) {
  const { getBotFields } = useBotProtection();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (!isVisible) return;
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isVisible, scrollRef]);

  // Focus input when visible
  useEffect(() => {
    if (isVisible) {
      inputRef?.current?.focus();
    }
  }, [isVisible, inputRef]);

  const sendMessage = useCallback(
    async (messageText = input) => {
      const trimmedMessage = (messageText ?? '').trim();
      if (!trimmedMessage || isLoading) return;

      setError(null);
      setInput('');

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
            ...getBotFields(),
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
        inputRef?.current?.focus();
      }
    },
    [input, isLoading, messages, getBotFields, inputRef]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage]
  );

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  };
}
