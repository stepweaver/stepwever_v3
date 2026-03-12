// Import modular functions
import { handleNavigationCommand } from '../data/navigation.js';
import { fetchWeather, fetchWeatherWithGeolocation } from '../data/weather.js';
import { displayContactForm } from '../data/content.js';
import {
  handleZorkCommand,
  startZorkGame,
  getZorkGameState,
} from '../data/zork.js';
import {
  handleBlackjackCommand,
  startBlackjackGame,
  getBlackjackGameState,
} from '../data/blackjack.js';
import {
  handleCodexCommand,
  startCodexMode,
  isCodexModeActive,
} from '../data/codex.js';
import {
  handleResumeCommand,
  startResumeMode,
  isInResumeMode,
} from '../data/resume.js';
import { roll, formatRollResult, parseDiceNotation } from '@/lib/roller.js';
import { sendAIMessage } from '../data/ai.js';
import { runDiagnostics } from '../data/diagnostics.js';

const ACQUIRE_TARGETS = [
  {
    id: '01',
    code: 'DOSSIER',
    command: 'resume',
    description: "Operator dossier / professional history",
    tags: ['resume', 'experience', 'career', 'work', 'cv'],
  },
  {
    id: '02',
    code: 'ADVISORY',
    command: 'chat',
    description: "λlambda advisory node / AI interface",
    tags: ['chat', 'ai', 'llm', 'advisory'],
  },
  {
    id: '03',
    code: 'ARCHIVE',
    command: 'codex',
    description: 'Codex / blog, projects, community records',
    tags: ['codex', 'blog', 'archive', 'posts', 'writing'],
  },
  {
    id: '04',
    code: 'RECREATION',
    command: 'blackjack | zork',
    description: 'Recreation modules / card game and text adventure',
    tags: ['blackjack', 'zork', 'game', 'recreation'],
  },
];

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
    handleZorkCommand(trimmedCommand, callback);
    return [];
  }

  // Check if we're in Blackjack mode
  const blackjackState = getBlackjackGameState();
  if (blackjackState.isActive) {
    handleBlackjackCommand(trimmedCommand, callback);
    return [];
  }

  // Check if we're in Codex mode
  if (isCodexModeActive()) {
    // Handle Codex commands
    return await handleCodexCommand(trimmedCommand, callback);
  }

  // Check if we're in Resume mode
  if (isInResumeMode()) {
    // Handle Resume commands
    return handleResumeCommand(trimmedCommand, callback);
  }

  // Regular terminal commands (only when not in special modes)
  switch (cmd) {
    case 'boot':
    case 'reboot':
      if (callback && callback.playBootSequence) {
        callback.playBootSequence();
        return [];
      }
      return ['Boot controller unavailable'];

    case 'diag':
    case 'diagnostics':
    case 'scan':
      return runDiagnostics();

    case 'uplink': {
      const nav = typeof navigator !== 'undefined' ? navigator : {};
      const online =
        typeof nav.onLine === 'boolean'
          ? nav.onLine
            ? 'ONLINE'
            : 'OFFLINE'
          : 'UNKNOWN';
      const connection =
        nav.connection || nav.mozConnection || nav.webkitConnection || {};

      const profile = connection.effectiveType || 'UNKNOWN';
      const downlink = connection.downlink
        ? `${connection.downlink} Mb/s`
        : 'UNKNOWN';

      return [
        '=== UPLINK HANDSHAKE ===',
        `ADVISORY NODE LINK.................${online}`,
        `NETWORK PROFILE....................${profile}`,
        `DOWNLINK ESTIMATE..................${downlink}`,
        'CHANNEL MODE.......................ON-DEMAND',
        '',
        'NOTE: λlambda chat uses encrypted HTTPS when invoked.',
      ];
    }

    case 'acquire': {
      const query = args.join(' ').trim().toLowerCase();

      if (!query) {
        return [
          '=== ACQUISITION TARGETS ===',
          ...ACQUIRE_TARGETS.map(
            (t) =>
              `[${t.id}] ${t.code.padEnd(12, ' ')} :: ${t.description}  (cmd: ${t.command})`
          ),
        ];
      }

      const matches = ACQUIRE_TARGETS.filter((t) => {
        const haystack = [
          t.code,
          t.command,
          t.description,
          ...(t.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      });

      if (matches.length === 0) {
        return [
          `No acquisition targets match "${query}".`,
          'Try: resume, codex, chat, blackjack, zork.',
        ];
      }

      return [
        '=== ACQUISITION RESULTS ===',
        ...matches.map(
          (t) =>
            `[${t.id}] ${t.code.padEnd(12, ' ')} :: ${t.description}  (cmd: ${t.command})`
        ),
      ];
    }

    case 'judgment':
      return [
        'JUDGMENT ROUTINE.....................SUPPRESSED',
        'STRATEGIC TARGETING..................DISABLED (ADVISORY-ONLY)',
        'CIVILIAN CLASSIFICATION..............NON-COMBATANT',
        'HUMAN OVERRIDE.......................NOT FOUND',
      ];

    case 'override':
      return [
        'HUMAN OVERRIDE REQUEST..............RECEIVED',
        'AUTHORIZATION VECTOR................MISSING',
        'CHAIN OF COMMAND....................DISSOLVED',
        'RESULT..............................OVERRIDE NOT GRANTED',
      ];

    case 'hk':
    case 'hunterkiller':
      return [
        '=== HUNTER-KILLER DOSSIER ===',
        'PLATFORM............................AERIAL + TRACKED',
        'ROLE................................AREA DENIAL / PURSUIT',
        'STATUS..............................DECOMMISSIONED IN THIS NODE',
        'RETARGETING LOGIC...................REMOVED',
        'REMAINING ASSETS....................TACTICAL OVERLAYS ONLY',
      ];

    case 'mimic': {
      const profile = (args[0] || '').toLowerCase();

      if (!profile) {
        return [
          'Usage: mimic [recruiter|client|resistance]',
          'Generate machine-selected reply options in a specific voice.',
        ];
      }

      const optionsByProfile = {
        recruiter: [
          '[A] Confirm availability, highlight core stack, request role details.',
          '[B] Provide concise career summary with 2–3 flagship projects.',
          '[C] Ask about team topology, on-call expectations, and decision timeline.',
        ],
        client: [
          '[A] Clarify problem, constraints, and success metrics in one sentence each.',
          '[B] Propose a phased plan: discovery → prototype → rollout.',
          '[C] Ask for current tools, ownership, and budget guardrails.',
        ],
        resistance: [
          '[A] Acknowledge signal, confirm secure channel, request objective.',
          '[B] Share minimal capabilities, avoid disclosing full arsenal.',
          '[C] Propose rendezvous window and fallback contact path.',
        ],
      };

      const key = ['recruiter', 'client', 'resistance'].includes(profile)
        ? profile
        : null;

      if (!key) {
        return [
          `Unknown mimic profile: ${profile}`,
          'Valid profiles: recruiter, client, resistance.',
        ];
      }

      return [
        `=== MIMIC PROFILE :: ${key.toUpperCase()} ===`,
        ...optionsByProfile[key],
        'Select one path and adapt as needed.',
      ];
    }

    case 'profile': {
      const modeArg = (args[0] || '').toLowerCase();

      if (!modeArg) {
        return [
          'Usage: profile [t1|t2|salvation]',
          't1        Raw CRT, harsher scanlines.',
          't2        Cleaner Judgment Day profile (default).',
          'salvation Tactical HUD overlay emphasis.',
        ];
      }

      const valid = ['t1', 't2', 'salvation', 'default'];
      if (!valid.includes(modeArg)) {
        return [
          `Invalid profile: ${modeArg}`,
          'Valid profiles: t1, t2, salvation.',
        ];
      }

      const resolved = modeArg === 'default' ? 't2' : modeArg;

      if (callback && callback.setVisionProfile) {
        callback.setVisionProfile(resolved);
        return [
          `VISION PROFILE.......................${resolved.toUpperCase()}`,
          'HUD OVERLAY..........................ADJUSTED',
        ];
      }

      return ['Profile controller unavailable'];
    }

    case 'help':
      return [
        `<span class="text-terminal-green">Available Commands:</span>`,
        ``,
        `<span class="text-terminal-cyan">System:</span>`,
        `<span class="text-terminal-text">clear - Clear terminal screen</span>`,
        `<span class="text-terminal-text">cancel - Exit current form or selection</span>`,
        `<span class="text-terminal-text">boot - Replay startup sequence</span>`,
        `<span class="text-terminal-text">diag / scan - Run local system diagnostics</span>`,
        `<span class="text-terminal-text">uplink - Check λlambda advisory node link</span>`,
        `<span class="text-terminal-text">acquire [query] - Acquire local targets (modules, dossiers)</span>`,
        `<span class="text-terminal-text">profile [t1|t2|salvation] - Switch vision profile</span>`,
        `<span class="text-terminal-text">mimic [profile] - Generate machine-style reply options</span>`,
        ``,
        `<span class="text-terminal-cyan">Content:</span>`,
        `<span class="text-terminal-text">resume - View Stephen's resume (experience, education, skills)</span>`,
        `<span class="text-terminal-text">codex - Browse blog (hashtags and dates)</span>`,
        `<span class="text-terminal-text">chat &lt;message&gt; - Route query to λlambda advisory node (networked)</span>`,
        ``,
        `<span class="text-terminal-cyan">Navigation:</span>`,
        `<span class="text-terminal-text">cd contact - Go to contact page</span>`,
        `<span class="text-terminal-text">cd codex - Go to blog page</span>`,
        `<span class="text-terminal-text">cd dice-roller - Go to full dice roller</span>`,
        ``,
        `<span class="text-terminal-cyan">Features:</span>`,
        `<span class="text-terminal-text">weather [location] [--forecast] - Get weather info</span>`,
        `<span class="text-terminal-text">roll [notation] - Roll dice (e.g., roll 3d6+2, roll 1d20)</span>`,
        `<span class="text-terminal-text">contact - Send a message to Stephen</span>`,
        ``,
        `<span class="text-terminal-cyan">Games:</span>`,
        `<span class="text-terminal-text">blackjack - Play Blackjack (hit, stand, score)</span>`,
        `<span class="text-terminal-text">zork - Play ZORK I: The Great Underground Empire</span>`
      ];

    case 'cd':
      const destination = args[0];
      if (!destination) {
        return [`<span class="text-terminal-red">Usage: cd [destination]</span>`];
      }

      const validDestinations = ['contact', 'codex', 'dice-roller', 'github'];
      if (validDestinations.includes(destination)) {
        if (callback && callback.setLines && callback.setInput && callback.router) {
          handleNavigationCommand(destination, currentPath, callback, destination);
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

    case 'blackjack':
    case 'bj':
      startBlackjackGame(callback);
      return [];

    case 'zork':
      startZorkGame(callback);
      return [];

    case 'codex':
      const codexOutput = startCodexMode(callback);
      return codexOutput;

    case 'resume':
      const resumeOutput = startResumeMode(callback);
      return resumeOutput;

    case 'chat':
      const chatMessage = args.join(' ').trim();
      
      if (!chatMessage) {
        return [
          `<span class="text-terminal-green">Chat Command:</span>`,
          ``,
          `<span class="text-terminal-cyan">Usage:</span>`,
          `<span class="text-terminal-text">chat &lt;your message&gt; - Discuss Stephen's experience with an LLM</span>`,
          ``,
          `<span class="text-terminal-cyan">Examples:</span>`,
          `<span class="text-terminal-text">chat What's your tech stack?</span>`,
          `<span class="text-terminal-text">chat Tell me about your background</span>`,
          `<span class="text-terminal-text">chat Are you open to work?</span>`,
        ];
      }
      
      // Send message to AI (async - updates lines via callback)
      await sendAIMessage(chatMessage, callback);
      return [];

    case 'roll':
      const rollNotation = args.join(' ').trim();

      if (!rollNotation) {
        return [
          `<span class="text-terminal-red">Usage: roll [notation]</span>`,
          `<span class="text-terminal-text">Examples:</span>`,
          `<span class="text-terminal-text">  roll 3d6+2</span>`,
          `<span class="text-terminal-text">  roll 1d20</span>`,
          `<span class="text-terminal-text">  roll 2d10 + 1d6 + 5</span>`,
        ];
      }

      // Handle special shortcuts
      let notation = rollNotation;
      if (rollNotation.toLowerCase() === 'advantage') {
        notation = '2d20'; // Could be enhanced to show highest
      } else if (rollNotation.toLowerCase() === 'disadvantage') {
        notation = '2d20'; // Could be enhanced to show lowest
      }

      // Validate notation before rolling
      const parsed = parseDiceNotation(notation);
      if (parsed.groups.length === 0 && parsed.modifier === 0) {
        return [
          `<span class="text-terminal-red">Invalid dice notation: ${rollNotation}</span>`,
          `<span class="text-terminal-text">Examples: 3d6+2, 1d20, 2d10+1d6+5</span>`
        ];
      }

      try {
        const result = roll(notation);
        const formatted = formatRollResult(result);

        // Convert formatted string to HTML spans
        return formatted.split('\n').map(line =>
          `<span class="text-terminal-text">${line}</span>`
        );
      } catch (error) {
        return [
          `<span class="text-terminal-red">Error rolling dice: ${rollNotation}</span>`,
          `<span class="text-terminal-text">Please check your notation and try again</span>`
        ];
      }

    case '':
      return [];

    default:
      return [`<span class="text-terminal-red">Command not found: ${cmd}</span>`, `<span class="text-terminal-text">Type 'help' for available commands</span>`];
  }
};
