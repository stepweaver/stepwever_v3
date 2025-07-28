'use client';

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import { handleCommand } from './commands';
import { useCommandHistory } from './hooks/useCommandHistory';
import { useContactForm } from './hooks/useContactForm';
import { useWeatherSelection } from './hooks/useWeatherSelection';
import { getCurrentPath, isCodexModeActive } from './data/codex.js';
import { useRouter } from 'next/navigation';
import styles from '../../styles/terminal.module.css';
import GlitchLambda from '@/components/ui/GlitchLambda';

// Configuration constants
const TERMINAL_CONFIG = {
  COMMAND_TIMEOUT: 500,
  CURSOR_BLINK_INTERVAL: 500,
  NAVIGATION_DELAY: 500,
  MAX_HISTORY_SIZE: 100,
};

// Welcome messages
const WELCOME_MESSAGES = [
  '<span class="text-terminal-green">Welcome to λstepweaver terminal v3.0.0</span>',
  '<span>Type <span class="text-terminal-cyan">"help"</span> to see available commands.</span>',
];

// Utility functions
const sanitizeHTML = (html) => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  );
};

const Terminal = forwardRef((props, ref) => {
  // Core state
  const [lines, setLines] = useState(WELCOME_MESSAGES);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [lastCommandTime, setLastCommandTime] = useState(0);

  // Refs
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const preRefs = useRef({});

  // Hooks
  const router = useRouter();
  const { addToHistory, navigateHistory } = useCommandHistory();
  const {
    isInContactMode,
    contactStep,
    contactData,
    handleContactInput,
    cancelContact,
    resetContact,
    activateContactMode,
  } = useContactForm(setLines, setInput, setCursorPosition);
  const {
    isInSelectionMode,
    selectionOptions,
    handleSelectionInput,
    resetSelection,
    setupSelectionMode,
  } = useWeatherSelection(setLines, setInput, setCursorPosition);

  // Memoized values
  const memoizedLines = useMemo(() => lines, [lines]);

  // Get current path for prompt
  const getPromptPath = useCallback(() => {
    if (isCodexModeActive()) {
      return getCurrentPath();
    }
    return currentPath;
  }, [currentPath]);

  // Command processing
  const processCommand = useCallback(
    async (command) => {
      const trimmedCommand = command.trim();

      if (!trimmedCommand) return;

      // Prevent duplicate rapid commands
      const now = Date.now();
      if (
        trimmedCommand === lastCommand &&
        now - lastCommandTime < TERMINAL_CONFIG.COMMAND_TIMEOUT
      ) {
        return;
      }

      // Update command tracking
      setLastCommand(trimmedCommand);
      setLastCommandTime(now);
      addToHistory(trimmedCommand);

      // Handle special modes first
      if (isInContactMode) {
        handleContactInput(trimmedCommand);
        return;
      }

      if (isInSelectionMode) {
        handleSelectionInput(trimmedCommand);
        return;
      }

      // Handle system commands
      if (trimmedCommand.toLowerCase() === 'clear') {
        setLines([...WELCOME_MESSAGES]);
        setInput('');
        setCursorPosition(0);
        return;
      }

      // Display command prompt
      const newPromptLine = `user@stepweaver.dev ${getPromptPath()}`;
      const newCommandLine = `λ ${trimmedCommand}`;
      setLines((prev) => [...prev, newPromptLine, newCommandLine]);

      // Execute regular command
      try {
        const output = await handleCommand(
          trimmedCommand,
          currentPath,
          setCurrentPath,
          {
            setLines,
            setInput,
            router,
            activateContactMode,
            setupSelectionMode,
          }
        );

        // Add command output to terminal
        setLines((prev) => [...prev, ...output]);

        setInput('');
        setCursorPosition(0);
      } catch (error) {
        console.error('Command execution error:', error);
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-red">Error executing command: ${error.message}</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
      }
    },
    [
      lastCommand,
      lastCommandTime,
      addToHistory,
      isInContactMode,
      isInSelectionMode,
      handleContactInput,
      handleSelectionInput,
      currentPath,
      router,
      activateContactMode,
      setupSelectionMode,
    ]
  );

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e) => {
      // Handle escape key for canceling modes
      if (e.key === 'Escape') {
        if (isInContactMode) {
          cancelContact();
          return;
        }
        if (isInSelectionMode) {
          resetSelection();
          return;
        }
      }

      // Handle history navigation
      const newInput = navigateHistory(e.key);
      if (newInput !== undefined) {
        e.preventDefault();
        setInput(newInput);
        setCursorPosition(newInput.length);
        return;
      }

      // Handle cursor navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCursorPosition((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCursorPosition((prev) => Math.min(input.length, prev + 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCursorPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCursorPosition(input.length);
      }
    },
    [
      isInContactMode,
      isInSelectionMode,
      cancelContact,
      resetSelection,
      navigateHistory,
      input.length,
    ]
  );

  // Input handling
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      processCommand(input);
    },
    [processCommand, input]
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Content click handling
  const handleContentClick = useCallback(
    (e) => {
      const target = e.target.closest('[data-open]');
      if (target) {
        const path = target.getAttribute('data-open');
        if (path) {
          router.push(`/${path}`);
        }
      }
    },
    [router]
  );

  // Effects
  useEffect(() => {
    // Cursor blink effect
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, TERMINAL_CONFIG.CURSOR_BLINK_INTERVAL);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [memoizedLines]);

  useEffect(() => {
    // Overflow checking
    const checkOverflow = () => {
      Object.keys(preRefs.current).forEach((key) => {
        const el = preRefs.current[key];
        if (el) {
          if (el.offsetWidth < el.scrollWidth) {
            el.classList.add(styles.terminalEllipsis);
          } else {
            el.classList.remove(styles.terminalEllipsis);
          }
        }
      });
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [memoizedLines]);

  // Ref management
  const addPreRef = useCallback((id, el) => {
    if (el) {
      preRefs.current[id] = el;
    }
  }, []);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    executeCommand: (cmd) => {
      processCommand(cmd);
    },
    setSyncCallback: (callback) => {
      // For future implementation
    },
    updateFilters: ({ type, tags }) => {
      // For future implementation
      if (type) {
        processCommand(type === 'all' ? 'codex all' : `codex ${type}`);
      }
      if (tags && tags.length > 0) {
        processCommand(`filter ${tags[0]}`);
      }
    },
  }));

  // Render line content
  const renderLine = useCallback(
    (line, index) => {
      if (line.startsWith('λ ')) {
        return (
          <span className='flex items-center'>
            <GlitchLambda
              className={`text-terminal-green text-lg inline-block mr-1 ${styles.crtText}`}
            />
            <span className={`text-terminal-text ${styles.crtText}`}>
              {line.substring(2)}
            </span>
          </span>
        );
      }

      if (line.startsWith('guest@')) {
        return (
          <span className={`text-terminal-green ${styles.crtText}`}>
            {line}
          </span>
        );
      }

      if (line.includes('<span') || line.includes('<div')) {
        return (
          <pre
            ref={(el) => addPreRef(`html-${index}`, el)}
            className={`${styles.terminalHtml} leading-tight font-ibm ${styles.crtText}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(line) }}
          />
        );
      }

      return (
        <pre
          ref={(el) => addPreRef(`text-${index}`, el)}
          className={`${styles.terminalText} leading-tight font-ibm ${styles.crtText}`}
        >
          {line}
        </pre>
      );
    },
    [addPreRef]
  );

  return (
    <div
      ref={containerRef}
      className={`h-full md:h-96 md:sm:h-[32rem] md:md:h-[40rem] md:lg:h-[48rem] flex flex-col md:overflow-y-auto md:overflow-x-auto p-2 sm:p-3 md:p-4 text-base sm:text-lg md:text-xl text-terminal-text font-ibm leading-relaxed cursor-text w-full ${styles.scrollbarHide} ${styles.crtTerminal} ${styles.crtEffect}`}
      onClick={focusInput}
    >
      <div
        className='flex-1 overflow-y-auto overflow-x-auto md:flex-none md:overflow-visible'
        onClick={handleContentClick}
      >
        <div className='terminal-output mb-4 md:mb-4'>
          {memoizedLines.map((line, i) => (
            <div key={i} className='mb-1'>
              {renderLine(line, i)}
            </div>
          ))}
        </div>
      </div>

      <div className='terminal-prompt flex-shrink-0 md:flex-none'>
        <div className={`text-terminal-green mb-1 ${styles.crtText}`}>
          user@stepweaver.dev {getPromptPath()}
        </div>
        <div className='flex items-center'>
          <GlitchLambda
            className={`text-terminal-green text-lg inline-block mr-1 ${styles.crtText}`}
          />
          <div className='relative flex-grow'>
            <div className='relative'>
              <span className='text-terminal-text pr-0'>
                {input.substring(0, cursorPosition)}
              </span>
              <span
                className={`inline-block h-5 w-2.5 align-middle -mt-0.5 bg-terminal-green ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                } ${styles.cursorGlow}`}
              />
              <span className='text-terminal-text pl-0'>
                {input.substring(cursorPosition)}
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className='absolute top-0 left-0 w-full'
            >
              <input
                ref={inputRef}
                type='text'
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                className='opacity-0 absolute top-0 left-0 w-full h-full cursor-text'
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

Terminal.displayName = 'Terminal';

export default Terminal;
