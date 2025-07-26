'use client';

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { handleCommand } from './commands';
import { useCommandHistory } from './hooks/useCommandHistory';
import { useRouter } from 'next/navigation';
import styles from '../../styles/terminal.module.css';
import GlitchLambda from '@/components/ui/GlitchLambda';

// Utility functions for command processing
const handleClearCommand = (welcomeMessages, setLines, setInput) => {
  // Normal clear behavior
  setLines([...welcomeMessages]);
  setInput('');
};

const handleNavigationCommand = (
  destination,
  currentPath,
  setLines,
  setInput,
  router
) => {
  const newPromptLine = `guest@stepweaver.dev ${currentPath}`;
  const newCommandLine = `λ cd ${destination}`;

  setLines((prev) => [
    ...prev,
    newPromptLine,
    newCommandLine,
    `Navigating to /${destination}...`,
  ]);
  setInput('');

  // Delay navigation slightly to show the message
  setTimeout(() => {
    if (destination === 'bluesky') {
      window.open('https://bsky.app', '_blank');
    } else if (destination === 'github') {
      window.open('https://github.com/stepweaver', '_blank');
    } else {
      router.push(`/${destination}`);
    }
  }, 500);
};

const handleWeatherCommand = (command, currentPath, setLines) => {
  const newPromptLine = `user@stepweaver.dev ${currentPath}`;
  const newCommandLine = `λ ${command}`;

  setLines((prev) => [
    ...prev,
    newPromptLine,
    newCommandLine,
    `<span class="text-terminal-yellow">Fetching weather data...</span>`,
  ]);
};

const displayCommandPrompt = (command, currentPath, setLines) => {
  const newPromptLine = `user@stepweaver.dev ${currentPath}`;
  const newCommandLine = `λ ${command}`;

  setLines((prev) => [...prev, newPromptLine, newCommandLine]);
};

const updateWeatherOutput = (output, setLines) => {
  setLines((prev) => [...prev.slice(0, -1), ...output]);
};

const updateRegularOutput = (output, setLines) => {
  setLines((prev) => [...prev, ...output]);
};

const Terminal = forwardRef((props, ref) => {
  // Define welcome messages as a constant so we can reuse it
  const welcomeMessages = [
    '<span class="text-terminal-green">Welcome to λstepweaver terminal v3.0.0</span>',
    '<span>Type <span class="text-terminal-cyan">"help"</span> to see available commands.</span>',
  ];

  const [lines, setLines] = useState(welcomeMessages);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const [syncCallback, setSyncCallback] = useState(null);
  const [lastCommand, setLastCommand] = useState('');
  const [lastCommandTime, setLastCommandTime] = useState(0);

  // Selection mode state
  const [isInSelectionMode, setIsInSelectionMode] = useState(false);
  const [selectionLocation, setSelectionLocation] = useState('');
  const [selectionOptions, setSelectionOptions] = useState([]);

  // Contact form state
  const [isInContactMode, setIsInContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const {
    history,
    historyIndex,
    setHistoryIndex,
    addToHistory,
    navigateHistory,
  } = useCommandHistory();

  // Selection mode helper functions

  // Create refs for pre elements to check overflow
  const preRefs = useRef({});

  // Add this ref at the top of your Terminal component
  const hasNavigated = useRef(false);

  // Check for overflow and add custom ellipsis
  useEffect(() => {
    // Function to check overflow and update classes
    const checkOverflow = () => {
      Object.keys(preRefs.current).forEach((key) => {
        const el = preRefs.current[key];
        if (el) {
          // Set custom ellipsis if overflowing
          if (el.offsetWidth < el.scrollWidth) {
            el.classList.add(styles.terminalEllipsis);
          } else {
            el.classList.remove(styles.terminalEllipsis);
          }
        }
      });
    };

    // Initial check
    checkOverflow();

    // Add resize listener to handle window size changes
    window.addEventListener('resize', checkOverflow);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [lines]);

  // Add a ref to a pre element
  const addPreRef = (id, el) => {
    if (el) {
      preRefs.current[id] = el;
    }
  };

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    // Execute a command programmatically
    executeCommand: (cmd) => {
      processCommand(cmd);
    },

    // Set a callback function to sync filter state with UI
    setSyncCallback: (callback) => {
      setSyncCallback(callback);
    },

    // Update filters from UI
    updateFilters: ({ type, tags }) => {
      // For future implementation
      if (type) {
        if (type === 'all') {
          processCommand('codex all');
        } else {
          processCommand(`codex ${type}`);
        }
      }

      if (tags && tags.length > 0) {
        // Process only the first tag for now
        processCommand(`filter ${tags[0]}`);
      }
    },
  }));

  // Scroll to bottom when lines change
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lines]);

  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  const processCommand = async (command) => {
    if (command.trim()) {
      // Check for duplicate rapid commands (prevents double execution)
      const now = Date.now();
      if (command === lastCommand && now - lastCommandTime < 500) {
        return; // Skip if same command executed within 500ms
      }

      // Update command tracking
      setLastCommand(command);
      setLastCommandTime(now);

      addToHistory(command);
    }

    // Handle contact mode - if we're in contact form mode
    if (isInContactMode) {
      if (command.trim().toLowerCase() === 'cancel') {
        // Cancel contact form
        setIsInContactMode(false);
        setContactStep(0);
        setContactData({ name: '', email: '', message: '' });
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-yellow">Contact form cancelled.</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      }

      // Handle contact form steps
      if (contactStep === 0) {
        // Name step
        setContactData((prev) => ({ ...prev, name: command.trim() }));
        setContactStep(1);
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-text">${command.trim()}</span>`,
          `<span class="text-terminal-cyan">What's your email address?</span>`,
          `<span class="text-terminal-text">(Type your email and press Enter)</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      } else if (contactStep === 1) {
        // Email step
        setContactData((prev) => ({ ...prev, email: command.trim() }));
        setContactStep(2);
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-text">${command.trim()}</span>`,
          `<span class="text-terminal-cyan">Tell me about your project:</span>`,
          `<span class="text-terminal-text">(Type your message and press Enter)</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      } else if (contactStep === 2) {
        // Message step
        setContactData((prev) => ({ ...prev, message: command.trim() }));
        setContactStep(3);

        // Show summary and confirmation
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-text">${command.trim()}</span>`,
          ``,
          `<span class="text-terminal-green">Contact Form Summary:</span>`,
          `<span class="text-terminal-text ml-4">Name: ${contactData.name}</span>`,
          `<span class="text-terminal-text ml-4">Email: ${contactData.email}</span>`,
          `<span class="text-terminal-text ml-4">Message: ${command.trim()}</span>`,
          ``,
          `<span class="text-terminal-cyan">Type 'send' to submit or 'cancel' to abort</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      } else if (contactStep === 3) {
        // Confirmation step
        if (command.trim().toLowerCase() === 'send') {
          // Send the email
          setLines((prev) => [
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
              setLines((prev) => [
                ...prev.slice(0, -1), // Remove "Sending email..." message
                `<span class="text-terminal-green">✓ Email sent successfully!</span>`,
                `<span class="text-terminal-text">We'll get back to you soon.</span>`,
              ]);
            } else {
              setLines((prev) => [
                ...prev.slice(0, -1), // Remove "Sending email..." message
                `<span class="text-terminal-red">✗ Error: ${result.error}</span>`,
              ]);
            }
          } catch (error) {
            setLines((prev) => [
              ...prev.slice(0, -1), // Remove "Sending email..." message
              `<span class="text-terminal-red">✗ Error sending email. Please try again.</span>`,
            ]);
          }

          // Reset contact form
          setIsInContactMode(false);
          setContactStep(0);
          setContactData({ name: '', email: '', message: '' });
          setInput('');
          setCursorPosition(0);
          return;
        } else if (command.trim().toLowerCase() === 'cancel') {
          // Cancel contact form
          setIsInContactMode(false);
          setContactStep(0);
          setContactData({ name: '', email: '', message: '' });
          setLines((prev) => [
            ...prev,
            `<span class="text-terminal-yellow">Contact form cancelled.</span>`,
          ]);
          setInput('');
          setCursorPosition(0);
          return;
        } else {
          // Invalid input
          setLines((prev) => [
            ...prev,
            `<span class="text-terminal-red">Please type 'send' to submit or 'cancel' to abort</span>`,
          ]);
          setInput('');
          setCursorPosition(0);
          return;
        }
      }
    }

    // Handle selection mode - if we're in selection mode and user types a number
    if (isInSelectionMode) {
      const selectionNumber = parseInt(command.trim());
      if (
        !isNaN(selectionNumber) &&
        selectionNumber >= 1 &&
        selectionNumber <= selectionOptions.length
      ) {
        // User selected a valid option
        setIsInSelectionMode(false);

        // Show loading message
        const loadingLine = `<span class="text-terminal-yellow">Fetching weather for ${
          selectionOptions[selectionNumber - 1].display
        }...</span>`;
        setLines((prev) => [...prev, loadingLine]);

        // Fetch weather for selected location
        try {
          const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
          const selectedCity = selectionOptions[selectionNumber - 1];
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=imperial&appid=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`Weather service error: ${response.status}`);
          }

          const weatherData = await response.json();

          // Replace loading message with weather data
          const weatherOutput = [
            `<span class="text-terminal-yellow">Weather for ${selectedCity.display}</span>`,
            `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
              weatherData.main.temp
            )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
            `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
            `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
            `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
              weatherData.wind.speed
            )} mph`,
          ];

          setLines((prev) => [...prev.slice(0, -1), ...weatherOutput]);
        } catch (error) {
          setLines((prev) => [
            ...prev.slice(0, -1),
            `<span class="text-terminal-red">Error fetching weather data: ${error.message}</span>`,
          ]);
        }

        setInput('');
        setCursorPosition(0);
        return;
      } else {
        // Invalid selection
        setLines((prev) => [
          ...prev,
          `<span class="text-terminal-red">Invalid selection. Please choose a number between 1 and ${selectionOptions.length}</span>`,
        ]);
        setInput('');
        setCursorPosition(0);
        return;
      }
    }

    // Special handling for clear command
    if (command.trim().toLowerCase() === 'clear') {
      handleClearCommand(welcomeMessages, setLines, setInput);
      return;
    }

    // Special handling for resume command (show resume instead of navigating)
    const cmd = command.trim().toLowerCase();
    if (cmd === 'cd resume') {
      displayCommandPrompt(command, currentPath, setLines);
      processCommand('resume');
      return;
    }

    // Show loading message for weather command
    if (cmd.startsWith('weather')) {
      handleWeatherCommand(command, currentPath, setLines);
    } else {
      displayCommandPrompt(command, currentPath, setLines);
    }

    // Execute the command
    const output = await handleCommand(command, currentPath, setCurrentPath, {
      setLines,
      setInput,
      router,
    });

    // Handle weather output
    if (cmd.startsWith('weather')) {
      updateWeatherOutput(output, setLines);

      // Check if this is a selection list (multiple locations found)
      if (
        output &&
        output.length > 0 &&
        output.some((line) => line.includes('Type a number'))
      ) {
        // Extract location from the command (remove 'weather' prefix)
        const location = command.replace(/^weather\s+/i, '').trim();
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        // Fetch the options again to store them for selection
        try {
          const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
          );

          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            if (geoData.length > 1) {
              setIsInSelectionMode(true);
              setSelectionLocation(location);
              setSelectionOptions(
                geoData.map((city, index) => ({
                  id: index,
                  name: city.name,
                  state: city.state || '',
                  country: city.country,
                  lat: city.lat,
                  lon: city.lon,
                  display: `${city.name}, ${city.state || ''} ${
                    city.country
                  }`.trim(),
                }))
              );
            }
          }
        } catch (error) {
          // If we can't fetch the options, just continue normally
          console.error('Error setting up selection mode:', error);
        }
      }
    } else if (cmd === 'contact') {
      // Handle contact command
      updateRegularOutput(output, setLines);
      setIsInContactMode(true);
      setContactStep(0);
    } else {
      updateRegularOutput(output, setLines);
    }

    setInput('');
    setCursorPosition(0);
  };

  const handleKeyDown = (e) => {
    // Handle history navigation (up/down arrows)
    const newInput = navigateHistory(e.key);
    if (newInput !== undefined) {
      e.preventDefault();
      setInput(newInput);
      // Reset cursor position to end of new input
      setTimeout(() => {
        if (inputRef.current) {
          const length = newInput.length;
          inputRef.current.setSelectionRange(length, length);
          setCursorPosition(length);
        }
      }, 0);
      return;
    }

    // Handle cursor position for arrow keys
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCursorPosition((prev) => Math.max(0, prev - 1));
      setTimeout(() => {
        if (inputRef.current) {
          const pos = Math.max(0, cursorPosition - 1);
          inputRef.current.setSelectionRange(pos, pos);
        }
      }, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCursorPosition((prev) => Math.min(input.length, prev + 1));
      setTimeout(() => {
        if (inputRef.current) {
          const pos = Math.min(input.length, cursorPosition + 1);
          inputRef.current.setSelectionRange(pos, pos);
        }
      }, 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCursorPosition(0);
      if (inputRef.current) {
        inputRef.current.setSelectionRange(0, 0);
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      setCursorPosition(input.length);
      if (inputRef.current) {
        inputRef.current.setSelectionRange(input.length, input.length);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  const handleClick = (e) => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Add handler for clicking on elements with data-open attribute
  const handleContentClick = (e) => {
    // Find closest element with data-open attribute
    const target = e.target.closest('[data-open]');
    if (target) {
      const path = target.getAttribute('data-open');
      if (path) {
        // Navigate to the path
        router.push(`/${path}`);
      }
    }
  };

  // Effect to handle auto-open elements after they're added to the DOM
  useEffect(() => {
    // Find any auto-open elements that were added in the latest render
    const autoOpenElements =
      containerRef.current?.querySelectorAll('[data-auto-open]');
    if (
      autoOpenElements &&
      autoOpenElements.length > 0 &&
      !hasNavigated.current
    ) {
      const path = autoOpenElements[0].getAttribute('data-auto-open');
      if (path) {
        hasNavigated.current = true;
        // Navigation...
      }
    }
  }, [lines, router]);

  return (
    <div
      ref={containerRef}
      className={`h-96 sm:h-[32rem] md:h-[40rem] lg:h-[48rem] overflow-y-auto overflow-x-auto p-2 sm:p-3 md:p-4 text-base sm:text-lg md:text-xl text-terminal-text font-ibm leading-relaxed cursor-text w-full ${styles.scrollbarHide} ${styles.crtTerminal} ${styles.crtEffect}`}
      onClick={focusInput}
    >
      <div className='terminal-output mb-4' onClick={handleContentClick}>
        {lines.map((line, i) => (
          <div key={i} className='mb-1'>
            {line.startsWith('λ ') ? (
              <span className='flex items-center'>
                <GlitchLambda
                  className={`text-terminal-green text-xs inline-block mr-1 ${styles.crtText}`}
                />
                <span className={`text-terminal-text ${styles.crtText}`}>
                  {line.substring(2)}
                </span>
              </span>
            ) : line.startsWith('guest@') ? (
              <span className={`text-terminal-green ${styles.crtText}`}>
                {line}
              </span>
            ) : line.startsWith('<span') || line.startsWith('<div') ? (
              <pre
                ref={(el) => addPreRef(`html-${i}`, el)}
                className={`${styles.terminalNoWrap} leading-tight font-ibm ${styles.crtText}`}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ) : (
              <pre
                ref={(el) => addPreRef(`text-${i}`, el)}
                className={`${styles.terminalNoWrap} leading-tight font-ibm ${styles.crtText}`}
              >
                {line}
              </pre>
            )}
          </div>
        ))}
      </div>
      <div className='terminal-prompt'>
        <div className={`text-terminal-green mb-1 ${styles.crtText}`}>
          user@stepweaver.dev {currentPath}
        </div>
        <div className='flex items-center'>
          <GlitchLambda
            className={`text-terminal-green text-xs inline-block mr-1 ${styles.crtText}`}
          />
          <div className='relative flex-grow'>
            <div className='relative'>
              {/* Simple text before cursor */}
              <span className='text-terminal-text pr-0'>
                {input.substring(0, cursorPosition)}
              </span>

              {/* Cursor block */}
              <span
                className={`inline-block h-5 w-2.5 align-middle -mt-0.5 bg-terminal-green ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                } ${styles.cursorGlow}`}
              ></span>

              {/* Simple text after cursor */}
              <span className='text-terminal-text pl-0'>
                {input.substring(cursorPosition)}
              </span>
            </div>

            {/* Hidden input for keyboard handling */}
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

export default Terminal;
