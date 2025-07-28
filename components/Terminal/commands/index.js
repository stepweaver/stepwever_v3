

// Import modular functions
import { handleNavigationCommand } from '../data/navigation.js';
import { fetchWeather, fetchWeatherWithGeolocation } from '../data/weather.js';
import { displayContactForm } from '../data/content.js';
import { handleZorkCommand, startZorkGame, getZorkGameState } from '../data/zork.js';
import { handleCodexCommand, startCodexMode, isCodexModeActive } from '../data/codex.js';



// Main command handler
export const handleCommand = async (
  command,
  currentPath,
  setCurrentPath,
  callback
) => {
  const trimmedCommand = command.trim().toLowerCase();
  const [cmd, ...args] = trimmedCommand.split(' ');

  // Check if we're in Zork mode first
  const zorkGameState = getZorkGameState();
  if (zorkGameState.isActive) {
    // Handle Zork commands
    handleZorkCommand(trimmedCommand, callback);
    return [];
  }

  // Check if we're in Codex mode
  if (isCodexModeActive()) {
    // Handle Codex commands
    return await handleCodexCommand(trimmedCommand, callback);
  }

  // Regular terminal commands (only when not in Zork or Codex mode)
  switch (cmd) {
    case 'help':
      return [
        `<span class="text-terminal-green">Available Commands:</span>`,
        ``,
        `<span class="text-terminal-cyan">System:</span>`,
        `<span class="text-terminal-text">clear - Clear terminal screen</span>`,
        `<span class="text-terminal-text">cancel - Exit current form or selection</span>`,
        ``,
        `<span class="text-terminal-cyan">Navigation:</span>`,
        `<span class="text-terminal-text">cd contact - Go to contact page</span>`,
        `<span class="text-terminal-text">cd codex - Go to blog page</span>`,
        `<span class="text-terminal-text">codex - Enter codex mode to browse posts</span>`,
        ``,
        `<span class="text-terminal-cyan">Features:</span>`,
        `<span class="text-terminal-text">weather [location] - Get weather info + --forecast for 5-day forecast</span>`,

        `<span class="text-terminal-text">contact - Send message</span>`,
        ``,
        `<span class="text-terminal-cyan">Games:</span>`,
        `<span class="text-terminal-text">zork - Play ZORK I: The Great Underground Empire</span>`
      ];

    case 'cd':
      const destination = args[0];
      if (!destination) {
        return [`<span class="text-terminal-red">Usage: cd [destination]</span>`];
      }

      const validDestinations = ['contact', 'codex', 'github'];
      if (validDestinations.includes(destination)) {
        if (callback && callback.setLines && callback.setInput && callback.router) {
          // Map 'codex' to 'blog' for navigation
          const navDestination = destination === 'codex' ? 'blog' : destination;
          handleNavigationCommand(navDestination, currentPath, callback);
        } else {
          return [`<span class="text-terminal-red">Navigation not available</span>`];
        }
        return [];
      } else {
        return [`<span class="text-terminal-red">Invalid destination: ${destination}</span>`];
      }

    case 'weather':
      const weatherArgs = args.join(' ');
      const includeForecast = args.includes('--forecast') || args.includes('-f');
      const cleanArgs = args.filter(arg => !arg.startsWith('--') && !arg.startsWith('-'));
      const location = cleanArgs.join(' ');

      if (!location) {
        // No location provided, try to get user's location
        return await fetchWeatherWithGeolocation(includeForecast);
      }

      const weatherOutput = await fetchWeather(location, includeForecast);

      // Check if this is a selection list (multiple locations found)
      if (
        weatherOutput &&
        weatherOutput.length > 0 &&
        weatherOutput.some((line) => line.includes('Type a number'))
      ) {
        // Extract location from the command (remove 'weather' prefix and flags)
        const cleanLocation = command.replace(/^weather\s+/i, '').replace(/\s*--forecast\s*/gi, '').replace(/\s*-f\s*/gi, '').trim();

        // Set up selection mode if callback has the setupSelectionMode function
        if (callback && callback.setupSelectionMode) {
          callback.setupSelectionMode(cleanLocation, includeForecast);
        }
      }

      return weatherOutput;



    case 'contact':
      const contactOutput = displayContactForm();

      // Activate contact mode if callback has the activateContactMode function
      if (callback && callback.activateContactMode) {
        callback.activateContactMode();
      }

      return contactOutput;

    case 'clear':
      // System clear command - handled directly in Terminal component
      return [];

    case 'zork':
      startZorkGame(callback);
      return [];

    case 'codex':
      const codexOutput = startCodexMode(callback);
      return codexOutput;

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available commands</span>`];
  }
};
