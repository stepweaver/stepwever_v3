import { weatherArt } from '../data/weatherArt';

// Simple navigation commands for the current site structure
const handleNavigationCommand = (destination, currentPath, callback) => {
  const newPromptLine = `user@stepweaver.dev ${currentPath}`;
  const newCommandLine = `λ cd ${destination}`;

  callback.setLines((prev) => [
    ...prev,
    newPromptLine,
    newCommandLine,
    `Navigating to /${destination}...`,
  ]);
  callback.setInput('');

  // Delay navigation slightly to show the message
  setTimeout(() => {
    if (destination === 'github') {
      window.open('https://github.com/stepweaver', '_blank');
    } else {
      callback.router.push(`/${destination}`);
    }
  }, 500);
};

// Weather functionality
const fetchWeather = async (location = 'new york') => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=demo&units=imperial`
    );
    const data = await response.json();

    if (data.cod === 200) {
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].main.toLowerCase();
      const art = weatherArt[condition] || weatherArt.default;

      return [
        `<span class="text-terminal-green">Weather in ${location}:</span>`,
        `<span class="text-terminal-text">${temp}°F, ${condition}</span>`,
        `<pre class="text-terminal-cyan font-mono text-xs">${art}</pre>`
      ];
    } else {
      return [`<span class="text-terminal-red">Weather data not available for ${location}</span>`];
    }
  } catch (error) {
    return [`<span class="text-terminal-red">Error fetching weather data</span>`];
  }
};

// Resume functionality
const displayResume = () => {
  return [
    `<span class="text-terminal-green">Resume - stepweaver</span>`,
    `<span class="text-terminal-text">Full-stack developer & automation specialist</span>`,
    ``,
    `<span class="text-terminal-cyan">Skills:</span>`,
    `<span class="text-terminal-text">• Python, JavaScript, React, Next.js</span>`,
    `<span class="text-terminal-text">• Data automation, API integration</span>`,
    `<span class="text-terminal-text">• AWS, Docker, CI/CD</span>`,
    ``,
    `<span class="text-terminal-cyan">Experience:</span>`,
    `<span class="text-terminal-text">• Business automation & data pipelines</span>`,
    `<span class="text-terminal-text">• Web development & optimization</span>`,
    `<span class="text-terminal-text">• Growth analytics & dashboards</span>`,
    ``,
    `<span class="text-terminal-yellow cursor-pointer" onclick="window.open('/weaver_resume.pdf', '_blank')">Click to download PDF →</span>`
  ];
};

// Main command handler
export const handleCommand = async (
  command,
  currentPath,
  setCurrentPath,
  callback
) => {
  const trimmedCommand = command.trim().toLowerCase();
  const [cmd, ...args] = trimmedCommand.split(' ');

  switch (cmd) {
    case 'help':
      return [
        `<span class="text-terminal-green">Available Commands:</span>`,
        ``,
        `<span class="text-terminal-cyan">Navigation:</span>`,
        `<span class="text-terminal-text ml-4">cd contact</span>`,
        `<span class="text-terminal-text ml-4">cd blog</span>`,
        ``,
        `<span class="text-terminal-cyan">Features:</span>`,
        `<span class="text-terminal-text ml-4">weather [location] - e.g., weather london</span>`,
        `<span class="text-terminal-text ml-4">resume</span>`,
        `<span class="text-terminal-text ml-4">clear</span>`
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
      const location = args.join(' ') || 'new york';
      return await fetchWeather(location);

    case 'resume':
      return displayResume();

    case 'clear':
      if (callback && callback.setLines && callback.setInput) {
        callback.setLines(['<span class="text-terminal-green">Terminal cleared</span>']);
        callback.setInput('');
      }
      return [];

    case 'ls':
      return [
        `<span class="text-terminal-green">Available destinations:</span>`,
        ``,
        `<span class="text-terminal-cyan">contact</span> - Get in touch`,
        `<span class="text-terminal-cyan">blog</span> - Read our blog (coming soon)`,
        ``,
        `<span class="text-terminal-green">Commands:</span>`,
        `<span class="text-terminal-cyan">weather</span> - Get weather information`,
        `<span class="text-terminal-cyan">resume</span> - View resume`,
        `<span class="text-terminal-cyan">help</span> - Show all commands`
      ];

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available commands</span>`];
  }
};
