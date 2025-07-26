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
    callback.setLines((prev) => [...prev, `<span class="text-terminal-text">• A ${item.name}</span>`]);
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
      callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">• A ${containedItemObj.name}</span>`]);
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
      callback.setLines((prev) => [...prev, `<span class="text-terminal-yellow">• A ${hiddenItemObj.name}</span>`]);
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

// Export functions and state
export const getZorkGameState = () => zorkGameState;
export const setZorkGameState = (newState) => {
  zorkGameState = { ...zorkGameState, ...newState };
};
export { handleZorkCommand, startZorkGame }; 