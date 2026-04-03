import { useState, useRef, useEffect, useCallback } from 'react';
import { useBotProtection } from '@/hooks/useBotProtection';
import { buildChatRequestPayload } from '@/lib/chat/requestBuilder';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! I'm λlambda, Stephen's AI advocate. I can answer questions about his background, skills, and experience. What would you like to know?",
};

const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;
const MAX_IMAGES = 5;
const ALLOWED_IMAGE_MIME = /^image\/(png|jpeg|jpg|webp|gif)$/i;

/**
 * Shared chat logic used by both ChatWidget and ChatBot.
 */
export function useChat({ inputRef, isVisible = true } = {}) {
  const { getBotFields } = useBotProtection();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const messagesRef = useRef(messages);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestSeqRef = useRef(0);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (isVisible) {
      inputRef?.current?.focus();
    }
  }, [isVisible, inputRef]);

  const addAttachment = useCallback((dataUrl, mimeType) => {
    if (!dataUrl || typeof dataUrl !== 'string' || !mimeType) return;
    if (!ALLOWED_IMAGE_MIME.test(mimeType)) return;
    if (dataUrl.length > MAX_IMAGE_SIZE_BYTES) return;
    setAttachments((prev) => {
      if (prev.length >= MAX_IMAGES) return prev;
      return [...prev, { dataUrl, type: mimeType }];
    });
  }, []);

  const removeAttachment = useCallback((index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const sendMessage = useCallback(
    async (messageText = input, imageAttachments = attachments) => {
      const trimmedMessage = (messageText ?? '').trim();
      const sanitizedAtt = (imageAttachments || [])
        .filter(
          (att) =>
            att?.dataUrl &&
            typeof att.dataUrl === 'string' &&
            att.dataUrl.startsWith('data:image/') &&
            att.dataUrl.length <= MAX_IMAGE_SIZE_BYTES &&
            att.type &&
            ALLOWED_IMAGE_MIME.test(att.type)
        )
        .slice(0, MAX_IMAGES);

      const hasContent = trimmedMessage || sanitizedAtt.length > 0;
      if (!hasContent || isLoading) return;

      setError(null);
      setInput('');
      setAttachments([]);

      const userMessage = {
        role: 'user',
        content: trimmedMessage,
        attachments: sanitizedAtt,
      };

      const prev = messagesRef.current;
      const nextMessages = [...prev, userMessage];
      setMessages(nextMessages);
      messagesRef.current = nextMessages;
      setIsLoading(true);

      const seq = ++requestSeqRef.current;
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            buildChatRequestPayload({
              channel: 'widget',
              messages: nextMessages,
              botFields: getBotFields(),
            })
          ),
          signal: ac.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        if (seq !== requestSeqRef.current) return;

        setMessages((pm) => [
          ...pm,
          {
            role: 'assistant',
            content: data.message,
            citations: data.citations || [],
          },
        ]);
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (seq !== requestSeqRef.current) return;
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        if (seq === requestSeqRef.current) {
          setIsLoading(false);
          inputRef?.current?.focus();
        }
      }
    },
    [input, isLoading, attachments, getBotFields, inputRef]
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
    attachments,
    addAttachment,
    removeAttachment,
    isLoading,
    error,
    sendMessage,
    handleSubmit,
  };
}
