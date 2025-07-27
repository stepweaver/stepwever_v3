import { useState, useCallback } from 'react';

export const useContactForm = (setLines, setInput, setCursorPosition) => {
  const [isInContactMode, setIsInContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const resetContact = useCallback(() => {
    setIsInContactMode(false);
    setContactStep(0);
    setContactData({ name: '', email: '', message: '' });
  }, []);

  const cancelContact = useCallback(() => {
    resetContact();
    setLines(prev => [
      ...prev,
      `<span class="text-terminal-yellow">Contact form cancelled.</span>`,
    ]);
    setInput('');
    setCursorPosition(0);
  }, [resetContact, setLines, setInput, setCursorPosition]);

  const handleContactInput = useCallback(async (command) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Handle cancel commands
    if (trimmedCommand === 'cancel' || trimmedCommand === 'exit' || trimmedCommand === 'quit') {
      cancelContact();
      return;
    }

    // Handle contact form steps
    if (contactStep === 0) {
      // Name step
      setContactData(prev => ({ ...prev, name: command.trim() }));
      setContactStep(1);
      setLines(prev => [
        ...prev,
        `<span class="text-terminal-text">${command.trim()}</span>`,
        `<span class="text-terminal-cyan">What's your email address?</span>`,
        `<span class="text-terminal-text">(Type your email and press Enter, or press ESC to cancel)</span>`,
      ]);
      setInput('');
      setCursorPosition(0);
      return;
    }

    if (contactStep === 1) {
      // Email step
      setContactData(prev => ({ ...prev, email: command.trim() }));
      setContactStep(2);
      setLines(prev => [
        ...prev,
        `<span class="text-terminal-text">${command.trim()}</span>`,
        `<span class="text-terminal-cyan">Tell me about your project:</span>`,
        `<span class="text-terminal-text">(Type your message and press Enter, or press ESC to cancel)</span>`,
      ]);
      setInput('');
      setCursorPosition(0);
      return;
    }

    if (contactStep === 2) {
      // Message step
      setContactData(prev => ({ ...prev, message: command.trim() }));
      setContactStep(3);

      // Show summary and confirmation
      setLines(prev => [
        ...prev,
        `<span class="text-terminal-text">${command.trim()}</span>`,
        ``,
        `<span class="text-terminal-green">Contact Form Summary:</span>`,
        `<span class="text-terminal-text">Name: ${contactData.name}</span>`,
        `<span class="text-terminal-text">Email: ${contactData.email}</span>`,
        `<span class="text-terminal-text">Message: ${command.trim()}</span>`,
        ``,
        `<span class="text-terminal-cyan">Type 'send' to submit, 'cancel' to abort, or 'edit' to go back</span>`,
      ]);
      setInput('');
      setCursorPosition(0);
      return;
    }

    if (contactStep === 3) {
      // Confirmation step
      if (trimmedCommand === 'send') {
        // Send the email
        setLines(prev => [
          ...prev,
          `<span class="text-terminal-yellow">Sending email...</span>`,
        ]);

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: contactData.name,
              email: contactData.email,
              message: contactData.message,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            setLines(prev => [
              ...prev.slice(0, -1), // Remove "Sending email..." message
              `<span class="text-terminal-green">✓ Email sent successfully!</span>`,
              `<span class="text-terminal-text">We'll get back to you soon.</span>`,
            ]);
          } else {
            setLines(prev => [
              ...prev.slice(0, -1), // Remove "Sending email..." message
              `<span class="text-terminal-red">✗ Error: ${result.error}</span>`,
            ]);
          }
        } catch (error) {
          setLines(prev => [
            ...prev.slice(0, -1), // Remove "Sending email..." message
            `<span class="text-terminal-red">✗ Error sending email. Please try again.</span>`,
          ]);
        }

        // Reset contact form
        resetContact();
        setInput('');
        setCursorPosition(0);
        return;
      }

      if (trimmedCommand === 'cancel') {
        cancelContact();
        return;
      }

      if (trimmedCommand === 'edit') {
        // Go back to message step
        setContactStep(2);
        setLines(prev => [
          ...prev,
          `<span class="text-terminal-cyan">Tell me about your project:</span>`,
          `<span class="text-terminal-text">(Type your message and press Enter, or press ESC to cancel)</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      }

      // Invalid input
      setLines(prev => [
        ...prev,
        `<span class="text-terminal-red">Please type 'send' to submit, 'cancel' to abort, or 'edit' to go back</span>`,
      ]);
      setInput('');
      setCursorPosition(0);
      return;
    }
  }, [contactStep, contactData, setLines, setInput, setCursorPosition, cancelContact, resetContact]);

  const activateContactMode = useCallback(() => {
    setIsInContactMode(true);
    setContactStep(0);
  }, []);

  return {
    isInContactMode,
    contactStep,
    contactData,
    handleContactInput,
    cancelContact,
    resetContact,
    activateContactMode,
  };
}; 