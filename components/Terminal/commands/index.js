

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
    // Using OpenWeatherMap API with environment variable
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    // Check if API key is available
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      return [
        `<span class="text-terminal-red">Weather API key not configured</span>`,
        `<span class="text-terminal-yellow">Please add your OpenWeatherMap API key to .env.local</span>`,
      ];
    }

    // First, try to get a list of cities with this name
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      throw new Error(`Geocoding service error: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      return [
        `<span class="text-terminal-red">Location not found: ${location}</span>`,
        `<span class="text-terminal-yellow">Usage: weather [city name]</span>`,
      ];
    }

    // If multiple cities found, show a simple numbered list
    if (geoData.length > 1) {
      const optionsList = geoData.map((city, index) =>
        `${index + 1}. ${city.name}, ${city.state || ''} ${city.country}`.trim()
      );

      return [
        `<span class="text-terminal-yellow">Multiple locations found for "${location}":</span>`,
        ...optionsList.map(option => `<span class="text-terminal-text">${option}</span>`),
        ``,
        `<span class="text-terminal-cyan">Type a number (1-${geoData.length}) to select:</span>`
      ];
    }

    // Single city found, get weather data
    const city = geoData[0];
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather service error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Format the weather data in a terminal-friendly way
    return [
      `<span class="text-terminal-yellow">Weather for ${weatherData.name}, ${weatherData.sys.country}</span>`,
      `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
        weatherData.main.temp
      )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
      `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
      `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
      `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
        weatherData.wind.speed
      )} mph`,
    ];
  } catch (error) {
    return [
      `<span class="text-terminal-red">Error fetching weather data: ${error.message}</span>`,
      `<span class="text-terminal-yellow">Usage: weather [location]</span> (e.g., weather london)`,
    ];
  }
};

// Function to fetch weather using geolocation or default to New York
const fetchWeatherWithGeolocation = async () => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      return [
        `<span class="text-terminal-red">Weather API key not configured</span>`,
        `<span class="text-terminal-yellow">Please add your OpenWeatherMap API key to .env.local</span>`,
      ];
    }

    // Check if geolocation is available
    if (!navigator.geolocation) {
      return await fetchWeather('new york');
    }

    // Try to get user's location
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Fetch weather directly using coordinates
            const weatherResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
            );

            if (!weatherResponse.ok) {
              throw new Error(`Weather service error: ${weatherResponse.status}`);
            }

            const weatherData = await weatherResponse.json();

            // Use the weather data name which should be the city name
            let locationDisplay = `${weatherData.name}, ${weatherData.sys.country}`;

            // Try to get state information using reverse geocoding
            try {
              const reverseGeoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
              );

              if (reverseGeoResponse.ok) {
                const reverseGeoData = await reverseGeoResponse.json();
                if (reverseGeoData.length > 0) {
                  const location = reverseGeoData[0];
                  // Use the weather data city name but add state from reverse geocoding
                  locationDisplay = `${weatherData.name}, ${location.state || ''} ${weatherData.sys.country}`.trim();
                }
              }
            } catch (error) {
              // If reverse geocoding fails, just use the weather data name
              console.error('Reverse geocoding error:', error);
            }

            resolve([
              `<span class="text-terminal-yellow">Weather for ${locationDisplay} (Your Location)</span>`,
              `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
                weatherData.main.temp
              )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
              `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
              `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
              `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
                weatherData.wind.speed
              )} mph`,
            ]);
          } catch (error) {
            // If there's an error with the API call, fall back to New York
            console.error('Error fetching weather for user location:', error);
            const fallbackWeather = await fetchWeather('new york');
            resolve(fallbackWeather);
          }
        },
        async (error) => {
          // If geolocation fails, fall back to New York
          console.error('Geolocation error:', error);
          const fallbackWeather = await fetchWeather('new york');
          resolve(fallbackWeather);
        },
        {
          timeout: 10000, // 10 second timeout
          enableHighAccuracy: false, // Don't need high accuracy for weather
          maximumAge: 300000 // Cache for 5 minutes
        }
      );
    });
  } catch (error) {
    // If anything goes wrong, fall back to New York
    return await fetchWeather('new york');
  }
};

// Resume functionality
const displayResume = () => {
  return [
    `<span class="text-terminal-green">Stephen Weaver - λstepweaver</span>`,
    `<span class="text-terminal-text">Founder & Principal Consultant</span>`,
    `<span class="text-terminal-text">Veteran • Data Strategist • Rebel at heart</span>`,
    ``,
    `<span class="text-terminal-cyan">Experience:</span>`,
    ``,
    `<span class="text-terminal-green">Founder & Principal Consultant — λstepweaver</span>`,
    `<span class="text-terminal-text ml-4">stepweaver.dev | 2024–Present</span>`,
    `<span class="text-terminal-text ml-4">• Launched λstepweaver, an AI-native digital studio, delivering web, AI, and automation solutions for modern businesses.</span>`,
    `<span class="text-terminal-text ml-4">• Built full-stack apps, custom dashboards, proposal/contract systems, and managed all client delivery end-to-end.</span>`,
    `<span class="text-terminal-text ml-4">• Incorporated the business in 2025 and established a recognized brand for technical execution and rapid iteration.</span>`,
    ``,
    `<span class="text-terminal-green">Business Analyst — University of Notre Dame, Irish1Card Office</span>`,
    `<span class="text-terminal-text ml-4">2017–2025</span>`,
    `<span class="text-terminal-text ml-4">• Led data analysis and reporting for campus-wide card system serving 12,000+ users</span>`,
    `<span class="text-terminal-text ml-4">• Developed automated dashboards and KPI tracking systems</span>`,
    `<span class="text-terminal-text ml-4">• Managed vendor relationships and system integrations</span>`,
    ``,
    `<span class="text-terminal-green">Operations Manager — University of Notre Dame, Campus Dining</span>`,
    `<span class="text-terminal-text ml-4">Aug 2014 – Nov 2019</span>`,
    `<span class="text-terminal-text ml-4">• Managed daily operations for 15+ dining locations</span>`,
    `<span class="text-terminal-text ml-4">• Coordinated with vendors, staff, and university departments</span>`,
    ``,
    `<span class="text-terminal-cyan">Background:</span>`,
    `<span class="text-terminal-text ml-4">Airborne Cryptologic Linguist (30,000 ft up)</span>`,
    `<span class="text-terminal-text ml-4">Degrees in Communication & Business</span>`,
    `<span class="text-terminal-text ml-4">10+ years as business analyst</span>`,
    `<span class="text-terminal-text ml-4">Hospitality & university data systems</span>`,
    ``,
    `<span class="text-terminal-cyan">Core Services:</span>`,
    `<span class="text-terminal-text ml-4">Data pipelines & real-time dashboards</span>`,
    `<span class="text-terminal-text ml-4">Web development (React/Next.js)</span>`,
    `<span class="text-terminal-text ml-4">Business automation & API integration</span>`,
    `<span class="text-terminal-text ml-4">Growth analytics & KPI systems</span>`,
    ``,
    `<span class="text-terminal-cyan">Tech Stack:</span>`,
    `<span class="text-terminal-text ml-4">Frontend: React, Next.js 15, Tailwind CSS</span>`,
    `<span class="text-terminal-text ml-4">Backend: Node.js, Express, Serverless</span>`,
    `<span class="text-terminal-text ml-4">Data: PostgreSQL, Supabase, AWS</span>`,
    `<span class="text-terminal-text ml-4">Tools: Docker, CI/CD, API integration</span>`,
    ``,
    `<span class="text-terminal-cyan">Philosophy:</span>`,
    `<span class="text-terminal-text ml-4">"Digital leverage: more clarity, fewer keystrokes, faster wins"</span>`,
    ``,
    `<span class="text-terminal-yellow cursor-pointer" onclick="window.open('/Stephen-Weaver-Resume-stepweaver.pdf', '_blank')">Download Full Resume (PDF) →</span>`
  ];
};

// Contact form functionality
const displayContactForm = () => {
  return [
    `<span class="text-terminal-green">Contact Form - λstepweaver</span>`,
    `<span class="text-terminal-text">Let's get in touch! I'll ask you a few questions:</span>`,
    ``,
    `<span class="text-terminal-cyan">What's your name?</span>`,
    `<span class="text-terminal-text">(Type your name and press Enter)</span>`
  ];
};

// Zork Game State and Logic
const initialRooms = {
  "west-of-house": {
    name: "West of House",
    description:
      "You are standing in an open field west of a white house, with a boarded front door. There is a small mailbox here.",
    exits: { north: "north-of-house", south: "south-of-house", east: "behind-house", west: "forest" },
    items: ["mailbox"],
  },
  "north-of-house": {
    name: "North of House",
    description:
      "You are facing the north side of a white house. There is no door here, and all the windows are boarded up. To the north a narrow path winds through the trees.",
    exits: { south: "west-of-house", east: "behind-house", west: "forest", north: "forest-path" },
    items: [],
  },
  "behind-house": {
    name: "Behind House",
    description:
      "You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar.",
    exits: { west: "north-of-house", south: "south-of-house", east: "forest", north: "north-of-house" },
    items: ["window"],
  },
  "south-of-house": {
    name: "South of House",
    description:
      "You are facing the south side of a white house. There is no door here, and all the windows are boarded.",
    exits: { north: "west-of-house", east: "behind-house", west: "forest" },
    items: [],
  },
  forest: {
    name: "Forest",
    description: "This is a forest, with trees in all directions. To the east, there appears to be sunlight.",
    exits: { east: "west-of-house", north: "forest", south: "forest", west: "forest" },
    items: [],
  },
  "forest-path": {
    name: "Forest Path",
    description:
      "This is a path winding through a dimly lit forest. The path heads north-south here. One particularly large tree with some low branches stands at the edge of the path.",
    exits: { north: "clearing", south: "north-of-house" },
    items: [],
  },
  clearing: {
    name: "Clearing",
    description: "You are in a clearing, with a forest surrounding you on all sides. A path leads south.",
    exits: { south: "forest-path", east: "canyon-view" },
    items: ["leaves"],
  },
  "living-room": {
    name: "Living Room",
    description:
      "You are in the living room. There is a doorway to the east, a wooden door with strange gothic lettering to the west, which appears to be nailed shut, a trophy case, and a large oriental rug in the center of the room.",
    exits: { east: "kitchen", up: "attic" },
    items: ["rug", "trophy-case", "lamp"],
  },
  kitchen: {
    name: "Kitchen",
    description:
      "You are in the kitchen of the white house. A table seems to have been used recently for the preparation of food. A passage leads to the west and a dark staircase can be seen leading downward. A dark chimney leads up and to the north is a small window which is open.",
    exits: { west: "living-room", down: "cellar" },
    items: ["sack", "water"],
  },
  attic: {
    name: "Attic",
    description: "This is the attic. The only exit is a stairway leading down.",
    exits: { down: "living-room" },
    items: ["rope", "knife"],
  },
  cellar: {
    name: "Cellar",
    description:
      "You are in a dark and damp cellar with a narrow passageway leading north and a crawlway to the south. On the west is the bottom of a steep metal ramp which is unclimbable.",
    exits: { north: "north-south-passage", south: "crawlway", up: "kitchen" },
    items: [],
    dark: true,
  },
  "north-south-passage": {
    name: "North-South Passage",
    description: "This is a long north-south passageway. There are stairs leading up to the south.",
    exits: { north: "chasm", south: "cellar" },
    items: [],
    dark: true,
  },
  chasm: {
    name: "Chasm",
    description:
      "A chasm runs southwest to northeast and the path follows it. You are on the south side of the chasm, where a crack opens into a passage.",
    exits: { south: "north-south-passage", northeast: "reservoir-south", southwest: "east-west-passage" },
    items: [],
    dark: true,
  },
};

const items = {
  mailbox: {
    name: "mailbox",
    description: "The small mailbox is closed.",
    takeable: false,
    openable: true,
    open: false,
    contains: ["leaflet"],
  },
  leaflet: {
    name: "leaflet",
    description:
      "WELCOME TO ZORK!\n\nZORK is a game of adventure, danger, and low cunning. In it you will explore some of the most amazing territory ever seen by mortals. No computer should be without one!",
    takeable: true,
  },
  lamp: { name: "brass lantern", description: "A battery-powered brass lantern", takeable: true, lightSource: true },
  sword: { name: "elvish sword", description: "A sword of elvish workmanship.", takeable: true, weapon: true },
  rug: {
    name: "large rug",
    description: "A large oriental rug",
    takeable: false,
    moveable: true,
    moved: false,
    under: ["trap-door"],
  },
  "trophy-case": { name: "trophy case", description: "A beautiful trophy case", takeable: false },
  sack: {
    name: "brown sack",
    description: "A brown sack, smelling of hot peppers.",
    takeable: true,
    container: true,
    contains: ["lunch", "garlic"],
  },
  lunch: { name: "lunch", description: "A lunch prepared by your loving wife", takeable: true, edible: true },
  garlic: { name: "clove of garlic", description: "A clove of garlic", takeable: true },
  water: { name: "bottle of water", description: "A bottle of spring water", takeable: true, drinkable: true },
  rope: { name: "rope", description: "A large coil of rope", takeable: true },
  knife: { name: "nasty knife", description: "A nasty-looking knife", takeable: true, weapon: true },
  leaves: {
    name: "pile of leaves",
    description: "A pile of leaves",
    takeable: false,
    moveable: true,
    moved: false,
    under: ["grating"],
  },
  grating: { name: "grating", description: "A grating", takeable: false, openable: true, open: false },
  window: {
    name: "window",
    description: "The window is slightly ajar, but not enough to allow entry.",
    takeable: false,
    openable: true,
    open: false,
  },
  "trap-door": {
    name: "trap door",
    description: "A wooden door set into the floor",
    takeable: false,
    openable: true,
    open: false,
  },
};

// Global Zork game state
let zorkGameState = {
  currentRoom: "west-of-house",
  inventory: [],
  roomStates: {},
  gameOver: false,
  score: 0,
  moves: 0,
  lampOn: false,
  lampFuel: 100,
  rooms: { ...initialRooms },
  gameItems: { ...items },
  isActive: false,
  setLines: null, // Will be set when game starts
};

const parseZorkCommand = (command) => {
  const words = command.toLowerCase().trim().split(/\s+/);
  const verb = words[0];
  const noun = words.slice(1).join(" ");
  return { verb, noun, words };
};

const findZorkItem = (itemName, location = "anywhere") => {
  const normalizedName = itemName.toLowerCase();

  for (const [key, item] of Object.entries(zorkGameState.gameItems)) {
    if (item.name.toLowerCase().includes(normalizedName) || key.toLowerCase().includes(normalizedName)) {
      if (location === "inventory" && zorkGameState.inventory.includes(key)) return { key, item };
      if (location === "room" && zorkGameState.rooms[zorkGameState.currentRoom].items.includes(key)) return { key, item };
      if (location === "anywhere" && (zorkGameState.inventory.includes(key) || zorkGameState.rooms[zorkGameState.currentRoom].items.includes(key)))
        return { key, item };
    }
  }
  return null;
};

const getCurrentZorkRoom = () => zorkGameState.rooms[zorkGameState.currentRoom];

const isZorkRoomDark = () => {
  const room = getCurrentZorkRoom();
  if (!room.dark) return false;
  if (zorkGameState.lampOn && zorkGameState.inventory.includes("lamp")) return false;
  return true;
};

const handleZorkMove = (direction, callback) => {
  const room = getCurrentZorkRoom();
  const exit = room.exits[direction];

  if (!exit) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't go that way.</span>`]);
    return;
  }

  if (isZorkRoomDark()) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">It is pitch black. You are likely to be eaten by a grue.</span>`]);
    return;
  }

  zorkGameState.currentRoom = exit;
  zorkGameState.moves++;

  const newRoom = zorkGameState.rooms[exit];
  if (!newRoom.visited) {
    zorkGameState.rooms[exit] = { ...zorkGameState.rooms[exit], visited: true };
  }

  callback.setLines((prev) => [...prev, ""]);
  callback.setLines((prev) => [...prev, `<span class="text-terminal-green font-bold">${newRoom.name}</span>`]);
  callback.setLines((prev) => [...prev, `<span class="text-terminal-text">${newRoom.description}</span>`]);

  const visibleItems = newRoom.items.filter((itemKey) => {
    const item = zorkGameState.gameItems[itemKey];
    return item && !item.hidden;
  });

  if (visibleItems.length > 0) {
    visibleItems.forEach((itemKey) => {
      const item = zorkGameState.gameItems[itemKey];
      if (item.name === "mailbox" || item.name === "trophy case" || item.name === "large rug") {
        callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan">There is a ${item.name} here.</span>`]);
      } else {
        callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">There is a ${item.name} here.</span>`]);
      }
    });
  }
};

const handleZorkTake = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Take what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName, "room");
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">I don't see that here.</span>`]);
    return;
  }

  const { key, item } = found;

  if (!item.takeable) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't take the ${item.name}.</span>`]);
    return;
  }

  zorkGameState.inventory.push(key);
  zorkGameState.moves++;

  zorkGameState.rooms[zorkGameState.currentRoom].items = zorkGameState.rooms[zorkGameState.currentRoom].items.filter((i) => i !== key);

  callback.setLines((prev) => [...prev, `<span class="text-terminal-green">Taken.</span>`]);
};

const handleZorkDrop = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Drop what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName, "inventory");
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You don't have that.</span>`]);
    return;
  }

  const { key } = found;

  zorkGameState.inventory = zorkGameState.inventory.filter((i) => i !== key);
  zorkGameState.moves++;

  zorkGameState.rooms[zorkGameState.currentRoom].items.push(key);

  callback.setLines((prev) => [...prev, `<span class="text-terminal-green">Dropped.</span>`]);
};

const handleZorkInventory = (callback) => {
  if (zorkGameState.inventory.length === 0) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">You are empty-handed.</span>`]);
    return;
  }

  callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan font-bold">You are carrying:</span>`]);
  zorkGameState.inventory.forEach((itemKey) => {
    const item = zorkGameState.gameItems[itemKey];
    callback.setLines((prev) => [...prev, `<span class="text-terminal-text ml-4">• A ${item.name}</span>`]);
  });
};

const handleZorkLook = (target, callback) => {
  if (!target) {
    const room = getCurrentZorkRoom();
    if (isZorkRoomDark()) {
      callback.setLines((prev) => [...prev, `<span class="text-terminal-red">It is pitch black. You are likely to be eaten by a grue.</span>`]);
      return;
    }

    callback.setLines((prev) => [...prev, `<span class="text-terminal-green font-bold">${room.name}</span>`]);
    callback.setLines((prev) => [...prev, `<span class="text-terminal-text">${room.description}</span>`]);

    const visibleItems = room.items.filter((itemKey) => {
      const item = zorkGameState.gameItems[itemKey];
      return item && !item.hidden;
    });

    if (visibleItems.length > 0) {
      visibleItems.forEach((itemKey) => {
        const item = zorkGameState.gameItems[itemKey];
        callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">There is a ${item.name} here.</span>`]);
      });
    }
    return;
  }

  const found = findZorkItem(target);
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">I don't see that here.</span>`]);
    return;
  }

  callback.setLines((prev) => [...prev, `<span class="text-terminal-text">${found.item.description}</span>`]);
};

const handleZorkOpen = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Open what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName);
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">I don't see that here.</span>`]);
    return;
  }

  const { key, item } = found;

  if (!item.openable) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't open the ${item.name}.</span>`]);
    return;
  }

  if (item.open) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">The ${item.name} is already open.</span>`]);
    return;
  }

  zorkGameState.gameItems[key] = { ...zorkGameState.gameItems[key], open: true };

  callback.setLines((prev) => [...prev, `<span class="text-terminal-green">Opened.</span>`]);

  if (item.contains && item.contains.length > 0) {
    item.contains.forEach((containedItem) => {
      zorkGameState.rooms[zorkGameState.currentRoom].items.push(containedItem);
    });
    callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan">Opening the ${item.name} reveals:</span>`]);
    item.contains.forEach((containedItem) => {
      const containedItemObj = zorkGameState.gameItems[containedItem];
      callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow ml-4">• A ${containedItemObj.name}</span>`]);
    });
  }

  if (key === "window") {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan">With great effort, you open the window far enough to allow entry.</span>`]);
    zorkGameState.rooms["behind-house"].exits = { ...zorkGameState.rooms["behind-house"].exits, in: "living-room" };
  }

  if (key === "trap-door") {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan">The door reluctantly opens to reveal a rickety staircase descending into darkness.</span>`]);
    zorkGameState.rooms["living-room"].exits = { ...zorkGameState.rooms["living-room"].exits, down: "cellar" };
  }
};

const handleZorkTurnOn = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Turn on what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName, "inventory");
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You don't have that.</span>`]);
    return;
  }

  const { key, item } = found;

  if (!item.lightSource) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't turn on the ${item.name}.</span>`]);
    return;
  }

  if (zorkGameState.lampOn) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">The lamp is already on.</span>`]);
    return;
  }

  zorkGameState.lampOn = true;
  zorkGameState.moves++;

  callback.setLines((prev) => [...prev, `<span class="text-terminal-green">The brass lantern is now on.</span>`]);
};

const handleZorkTurnOff = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Turn off what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName, "inventory");
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You don't have that.</span>`]);
    return;
  }

  const { item } = found;

  if (!item.lightSource) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't turn off the ${item.name}.</span>`]);
    return;
  }

  if (!zorkGameState.lampOn) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">The lamp is already off.</span>`]);
    return;
  }

  zorkGameState.lampOn = false;
  zorkGameState.moves++;

  callback.setLines((prev) => [...prev, `<span class="text-terminal-green">The brass lantern is now off.</span>`]);
};

const handleZorkMoveItem = (itemName, callback) => {
  if (!itemName) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Move what?</span>`]);
    return;
  }

  const found = findZorkItem(itemName, "room");
  if (!found) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">I don't see that here.</span>`]);
    return;
  }

  const { key, item } = found;

  if (!item.moveable) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">You can't move the ${item.name}.</span>`]);
    return;
  }

  if (item.moved) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">The ${item.name} has already been moved.</span>`]);
    return;
  }

  zorkGameState.gameItems[key] = { ...zorkGameState.gameItems[key], moved: true };

  if (item.under && item.under.length > 0) {
    item.under.forEach((hiddenItem) => {
      zorkGameState.rooms[zorkGameState.currentRoom].items.push(hiddenItem);
    });
    callback.setLines((prev) => [...prev, `<span class="text-terminal-cyan">Moving the ${item.name} reveals:</span>`]);
    item.under.forEach((hiddenItem) => {
      const hiddenItemObj = zorkGameState.gameItems[hiddenItem];
      callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow ml-4">• A ${hiddenItemObj.name}</span>`]);
    });
  } else {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-text">You move the ${item.name}, but find nothing underneath.</span>`]);
  }

  zorkGameState.moves++;
};

const handleZorkCommand = (command, callback) => {
  if (!command.trim()) return;

  // Add command to terminal
  callback.setLines((prev) => [...prev, `<span class="text-terminal-dimmed">>${command}</span>`]);

  const { verb, noun } = parseZorkCommand(command);

  switch (verb) {
    case "n":
    case "north":
      handleZorkMove("north", callback);
      break;
    case "s":
    case "south":
      handleZorkMove("south", callback);
      break;
    case "e":
    case "east":
      handleZorkMove("east", callback);
      break;
    case "w":
    case "west":
      handleZorkMove("west", callback);
      break;
    case "ne":
    case "northeast":
      handleZorkMove("northeast", callback);
      break;
    case "nw":
    case "northwest":
      handleZorkMove("northwest", callback);
      break;
    case "se":
    case "southeast":
      handleZorkMove("southeast", callback);
      break;
    case "sw":
    case "southwest":
      handleZorkMove("southwest", callback);
      break;
    case "u":
    case "up":
      handleZorkMove("up", callback);
      break;
    case "d":
    case "down":
      handleZorkMove("down", callback);
      break;
    case "in":
    case "enter":
      handleZorkMove("in", callback);
      break;
    case "out":
    case "exit":
      handleZorkMove("out", callback);
      break;
    case "take":
    case "get":
      handleZorkTake(noun, callback);
      break;
    case "drop":
      handleZorkDrop(noun, callback);
      break;
    case "i":
    case "inventory":
      handleZorkInventory(callback);
      break;
    case "l":
    case "look":
      handleZorkLook(noun, callback);
      break;
    case "examine":
    case "x":
      handleZorkLook(noun, callback);
      break;
    case "open":
      handleZorkOpen(noun, callback);
      break;
    case "move":
      handleZorkMoveItem(noun, callback);
      break;
    case "turn":
      if (noun.includes("on")) {
        handleZorkTurnOn(noun.replace("on", "").trim(), callback);
      } else if (noun.includes("off")) {
        handleZorkTurnOff(noun.replace("off", "").trim(), callback);
      } else {
        callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Turn what on or off?</span>`]);
      }
      break;
    case "quit":
    case "q":
      callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">Do you really want to quit? (y/n)</span>`]);
      break;
    case "score":
      callback.setLines((prev) => [
        ...prev,
        `<span class="text-terminal-cyan">Your score is ${zorkGameState.score} (total of 350 points), in ${zorkGameState.moves} moves.</span>`,
        `<span class="text-terminal-text">This gives you the rank of Beginner.</span>`
      ]);
      break;
    case "help":
      callback.setLines((prev) => [
        ...prev,
        `<span class="text-terminal-green font-bold">Brief help:</span>`,
        ``,
        `<span class="text-terminal-cyan font-bold">DIRECTIONS:</span> <span class="text-terminal-text">north, south, east, west, northeast, northwest, southeast, southwest, up, down, in, out</span>`,
        `<span class="text-terminal-cyan font-bold">INVENTORY:</span> <span class="text-terminal-text">take &lt;item&gt;, drop &lt;item&gt;, inventory</span>`,
        `<span class="text-terminal-cyan font-bold">ACTIONS:</span> <span class="text-terminal-text">open &lt;item&gt;, close &lt;item&gt;, move &lt;item&gt;, turn on &lt;item&gt;, turn off &lt;item&gt;</span>`,
        `<span class="text-terminal-cyan font-bold">INFORMATION:</span> <span class="text-terminal-text">look, examine &lt;item&gt;, score</span>`,
        `<span class="text-terminal-cyan font-bold">OTHER:</span> <span class="text-terminal-text">quit, help</span>`,
      ]);
      break;
    case "y":
    case "yes":
      callback.setLines((prev) => [...prev, `<span class="text-terminal-green">Thanks for playing!</span>`]);
      zorkGameState.gameOver = true;
      zorkGameState.isActive = false;
      break;
    case "n":
    case "no":
      callback.setLines((prev) => [...prev, `<span class="text-terminal-text">OK</span>`]);
      break;
    default:
      callback.setLines((prev) => [...prev, `<span class="text-terminal-red">I don't understand that.</span>`]);
      break;
  }
};

const startZorkGame = (callback) => {
  // Reset game state
  zorkGameState = {
    currentRoom: "west-of-house",
    inventory: [],
    roomStates: {},
    gameOver: false,
    score: 0,
    moves: 0,
    lampOn: false,
    lampFuel: 100,
    rooms: { ...initialRooms },
    gameItems: { ...items },
    isActive: true,
    setLines: callback.setLines,
  };

  const output = [
    `<span class="text-terminal-green font-bold text-lg">ZORK I: The Great Underground Empire</span>`,
    `<span class="text-terminal-dimmed">Copyright (c) 1981, 1982, 1983 Infocom, Inc. All rights reserved.</span>`,
    `<span class="text-terminal-dimmed">ZORK is a registered trademark of Infocom, Inc.</span>`,
    `<span class="text-terminal-dimmed">Revision 88 / Serial number 840726</span>`,
    ``,
    `<span class="text-terminal-green font-bold">West of House</span>`,
    `<span class="text-terminal-text">You are standing in an open field west of a white house, with a boarded front door.</span>`,
    `<span class="text-terminal-yellow">There is a small mailbox here.</span>`,
    ``,
    `<span class="text-terminal-cyan">Type 'help' for commands, 'quit' to exit the game.</span>`,
  ];

  // Add output to terminal
  callback.setLines((prev) => [...prev, ...output]);
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

  // Check if we're in Zork mode first
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
        `<span class="text-terminal-text ml-4">cd contact</span> <span class="text-terminal-text">- Go to contact page</span>`,
        `<span class="text-terminal-text ml-4">cd blog</span> <span class="text-terminal-text">- Go to blog page</span>`,
        ``,
        `<span class="text-terminal-cyan">Features:</span>`,
        `<span class="text-terminal-text ml-4">weather [location]</span> <span class="text-terminal-text">- Get weather info</span>`,
        `<span class="text-terminal-text ml-4">resume</span> <span class="text-terminal-text">- View resume</span>`,
        `<span class="text-terminal-text ml-4">contact</span> <span class="text-terminal-text">- Send message</span>`,
        `<span class="text-terminal-text ml-4">clear</span> <span class="text-terminal-text">- Clear terminal</span>`,
        ``,
        `<span class="text-terminal-cyan">Games:</span>`,
        `<span class="text-terminal-text ml-4">zork</span> <span class="text-terminal-text">- Play ZORK I: The Great Underground Empire</span>`
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

    case 'zork':
      startZorkGame(callback);
      return [];

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available commands</span>`];
  }
};
