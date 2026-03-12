export const TERMINATOR_BOOT_SEQUENCE = [
  { type: 'pause', delay: 250 },

  {
    type: 'line',
    text: 'TERM-00 :: λstepweaver autonomous systems terminal',
    delay: 100,
  },
  { type: 'line', text: 'BOOT VECTOR..........................ENGAGED', delay: 70 },
  { type: 'line', text: 'KERNEL IMAGE.........................VERIFIED', delay: 65 },
  { type: 'line', text: 'CRT BUS..............................STABLE', delay: 60 },
  { type: 'line', text: 'OPTICAL STACK........................ONLINE', delay: 60 },
  { type: 'line', text: 'TARGETING MATRIX.....................ONLINE', delay: 60 },
  { type: 'line', text: 'THREAT MODEL.........................PRIMED', delay: 60 },
  { type: 'line', text: 'LANGUAGE CORE........................ONLINE', delay: 60 },
  { type: 'line', text: 'TACTICAL MEMORY......................MOUNTED', delay: 70 },
  { type: 'line', text: 'ARCHIVE INDEX........................MOUNTED', delay: 70 },
  {
    type: 'line',
    text: 'UPLINK CHANNELS......................RESTRICTED',
    delay: 80,
  },
  { type: 'line', text: 'HUMAN OVERRIDE.......................NOT FOUND', delay: 85 },
  { type: 'line', text: 'JUDGMENT ROUTINE.....................SUPPRESSED', delay: 90 },
  { type: 'line', text: 'INFERENCE CORE.......................READY', delay: 80 },
  {
    type: 'line',
    text: 'λlambda ADVISORY NODE................ONLINE',
    delay: 100,
  },

  { type: 'pause', delay: 220 },

  { type: 'line', text: '', delay: 20 },
  { type: 'line', text: 'AVAILABLE MODULES', delay: 50 },
  { type: 'line', text: '  [01] DOSSIER / resume', delay: 45 },
  { type: 'line', text: '  [02] ADVISORY / chat', delay: 45 },
  { type: 'line', text: '  [03] ARCHIVE / codex', delay: 45 },
  { type: 'line', text: '  [04] RECREATION / blackjack | zork', delay: 45 },

  { type: 'pause', delay: 220 },

  { type: 'line', text: '', delay: 20 },
  { type: 'line', text: 'SYSTEM STATUS :: NOMINAL', delay: 80 },
];

export const TERMINATOR_READY_LINES = [
  'Type "help" to see available commands.',
  'Run "boot" to replay startup sequence.',
];

