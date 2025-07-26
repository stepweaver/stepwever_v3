

// Import modular functions
import { handleNavigationCommand } from '../data/navigation.js';
import { fetchWeather, fetchWeatherWithGeolocation } from '../data/weather.js';
import { displayResume, displayContactForm } from '../data/content.js';
import { handleZorkCommand, startZorkGame, getZorkGameState } from '../data/zork.js';
import { handleBlogList, handleBlogPost } from '../data/blog.js';



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

  // Regular terminal commands (only when not in Zork mode)
  switch (cmd) {
    case 'help':
      return [
        `<span class="text-terminal-green">Available Commands:</span>`,
        ``,
        `<span class="text-terminal-cyan">Navigation:</span>`,
        `<span class="text-terminal-text">cd contact - Go to contact page</span>`,
        `<span class="text-terminal-text">cd blog - Go to blog page</span>`,
        ``,
        `<span class="text-terminal-cyan">Features:</span>`,
        `<span class="text-terminal-text">weather [location] - Get weather info</span>`,
        `<span class="text-terminal-text">resume - View resume</span>`,
        `<span class="text-terminal-text">contact - Send message</span>`,
        `<span class="text-terminal-text">blog list - List recent blog posts</span>`,
        `<span class="text-terminal-text">blog [slug] - Open a post directly in the terminal</span>`,
        `<span class="text-terminal-text">clear - Clear terminal</span>`,
        ``,
        `<span class="text-terminal-cyan">Games:</span>`,
        `<span class="text-terminal-text">zork - Play ZORK I: The Great Underground Empire</span>`
      ];

    case 'cd':
      const destination = args[0];
      if (!destination) {
        return [`<span class="text-terminal-red">Usage: cd [destination]</span>`];
      }

      const validDestinations = ['contact', 'blog', 'github'];
      if (validDestinations.includes(destination)) {
        if (callback && callback.setLines && callback.setInput && callback.router) {
          handleNavigationCommand(destination, currentPath, callback);
        } else {
          return [`<span class="text-terminal-red">Navigation not available</span>`];
        }
        return [];
      } else {
        return [`<span class="text-terminal-red">Invalid destination: ${destination}</span>`];
      }

    case 'weather':
      const weatherArgs = args.join(' ');
      if (!weatherArgs) {
        // No location provided, try to get user's location
        return await fetchWeatherWithGeolocation();
      }
      return await fetchWeather(weatherArgs);

    case 'resume':
      return displayResume();

    case 'contact':
      return displayContactForm();

    case 'clear':
      if (callback && callback.setLines && callback.setInput) {
        callback.setLines(['<span class="text-terminal-green">Terminal cleared</span>']);
        callback.setInput('');
      }
      return [];

    case 'blog':
      const blogArg = args[0];
      if (!blogArg || blogArg === 'list') {
        return await handleBlogList();
      }
      return await handleBlogPost(blogArg);

    case 'zork':
      startZorkGame(callback);
      return [];

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available commands</span>`];
  }
};
