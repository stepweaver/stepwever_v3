/**
 * Dice Roller Constants
 * Centralized configuration for dice types, colors, icons, and UI constants
 */

import {
  GiD4,
  GiDiceSixFacesOne,
  GiDiceEightFacesEight,
  GiD10,
  GiD12,
  GiDiceTwentyFacesTwenty,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi';

/**
 * Icon mapping for each dice type
 * Using more accurate dice representations from Game Icons
 */
export const DICE_ICONS = {
  4: GiD4,
  6: GiDiceSixFacesOne,
  8: GiDiceEightFacesEight,
  10: GiD10,
  12: GiD12,
  20: GiDiceTwentyFacesTwenty,
  100: GiPerspectiveDiceSixFacesRandom,
};

/**
 * Color mapping for each dice type
 */
export const DICE_COLORS = {
  4: 'var(--color-terminal-cyan)',
  6: 'var(--color-terminal-green)',
  8: 'var(--color-terminal-yellow)',
  10: 'var(--color-terminal-blue)',
  12: 'var(--color-terminal-magenta)',
  20: 'var(--color-terminal-pink)',
  100: 'var(--color-terminal-purple)',
};

/**
 * Available dice types with labels
 */
export const DICE_TYPES = [
  { sides: 4, label: 'd4' },
  { sides: 6, label: 'd6' },
  { sides: 8, label: 'd8' },
  { sides: 10, label: 'd10' },
  { sides: 12, label: 'd12' },
  { sides: 20, label: 'd20' },
  { sides: 100, label: 'd100' },
];

/**
 * Color palette for random die colors
 */
export const COLOR_PALETTE = [
  'var(--color-terminal-green)',
  'var(--color-terminal-cyan)',
  'var(--color-terminal-yellow)',
  'var(--color-terminal-blue)',
  'var(--color-terminal-magenta)',
  'var(--color-terminal-pink)',
  'var(--color-terminal-purple)',
  'var(--color-terminal-orange)',
];

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  MAX_HISTORY: 10,
  ROLL_ANIMATION_DURATION: 1200,
  COPY_STATUS_DURATION: 2000,
  MAX_COMMENT_LENGTH: 150,
  MAX_HISTORY_COMMENT_LENGTH: 100,
  MAX_DICE_COUNT: 99,
  MIN_MODIFIER: -999,
  MAX_MODIFIER: 999,
};

/**
 * Get a random color from the palette
 * @returns {string} - CSS variable color string
 */
export function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

