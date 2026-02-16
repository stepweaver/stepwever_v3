// Theme color palettes for the background canvas.
// Each palette is an array of [R, G, B] tuples that the canvas cycles through
// as the user scrolls.

// Neon rainbow colors for dark mode - starting with green
export const neonColorsDark = [
  [0, 255, 0], // Neon Green (starting color)
  [255, 255, 0], // Neon Yellow
  [255, 165, 0], // Neon Orange
  [255, 0, 0], // Neon Red
  [255, 0, 255], // Neon Pink/Magenta
  [138, 43, 226], // Neon Purple
  [0, 191, 255], // Neon Blue
  [0, 255, 255], // Neon Cyan
];

// Colors for light mode - starting with black, transitioning through darker tones
export const colorsLight = [
  [0, 0, 0], // Black (starting color for light mode)
  [51, 51, 51], // Dark Gray
  [102, 51, 102], // Dark Purple
  [102, 0, 102], // Darker Magenta
  [153, 0, 153], // Deep Magenta
  [153, 0, 51], // Deep Red-Purple
  [51, 51, 102], // Dark Blue-Gray
  [0, 51, 102], // Dark Blue
];

// Pure white/grayscale colors for monochrome mode
export const colorsMonochrome = [
  [255, 255, 255], // Pure White (starting color)
  [245, 245, 245], // Very Light Gray
  [235, 235, 235], // Light Gray
  [225, 225, 225], // Light-Medium Gray
  [215, 215, 215], // Medium Gray
  [205, 205, 205], // Medium-Dark Gray
  [195, 195, 195], // Dark Gray
  [185, 185, 185], // Very Dark Gray
];

// Pure black/grayscale colors for monochrome inverted mode
export const colorsMonochromeInverted = [
  [0, 0, 0], // Pure Black (starting color)
  [10, 10, 10], // Very Dark Gray
  [20, 20, 20], // Dark Gray
  [30, 30, 30], // Dark-Medium Gray
  [40, 40, 40], // Medium Gray
  [50, 50, 50], // Medium-Light Gray
  [60, 60, 60], // Light Gray
  [70, 70, 70], // Very Light Gray
];

// Vintage DOS/IBM PC colors for vintage mode
export const colorsVintage = [
  [85, 255, 255], // Bright Cyan (starting color)
  [255, 255, 255], // White
  [85, 85, 255], // Bright Blue
  [255, 255, 85], // Bright Yellow
  [85, 255, 85], // Bright Green
  [255, 85, 255], // Bright Magenta
  [170, 170, 170], // Light Gray
  [85, 85, 85], // Dark Gray
];

// Apple II soft lime green colors
export const colorsApple = [
  [51, 255, 51], // Soft Lime (starting color)
  [102, 255, 102], // Medium Lime
  [68, 204, 68], // Muted Lime
  [136, 255, 136], // Pale Lime
  [119, 255, 119], // Light Lime
  [85, 255, 85], // Bright Lime
  [153, 255, 153], // Very Light Lime
  [34, 136, 34], // Dark Lime
];

// Commodore 64 blue colors
export const colorsC64 = [
  [163, 230, 255], // Light Blue (starting color)
  [124, 112, 218], // Purple-Blue
  [163, 163, 255], // Bright Blue
  [216, 216, 255], // Very Light Blue
  [149, 149, 221], // Medium Blue
  [184, 184, 255], // Pale Blue
  [200, 200, 255], // Ultra Light Blue
  [96, 88, 184], // Dark Blue
];

// Amber CRT colors
export const colorsAmber = [
  [255, 176, 0], // Amber (starting color)
  [255, 187, 34], // Light Amber
  [255, 153, 0], // Deep Amber/Orange
  [255, 204, 102], // Pale Amber
  [221, 136, 68], // Burnt Orange
  [255, 170, 85], // Soft Orange
  [255, 221, 136], // Cream Amber
  [204, 136, 51], // Dark Amber
];

// Synthwave hot pink/cyan colors
export const colorsSynthwave = [
  [255, 20, 147], // Hot Pink (starting color)
  [0, 255, 255], // Cyan
  [157, 0, 255], // Purple
  [255, 255, 0], // Yellow
  [255, 105, 180], // Light Pink
  [65, 105, 225], // Royal Blue
  [255, 0, 255], // Magenta
  [0, 191, 255], // Deep Sky Blue
];

// Dracula purple/pink colors
export const colorsDracula = [
  [189, 147, 249], // Purple (starting color)
  [255, 121, 198], // Pink
  [139, 233, 253], // Cyan
  [80, 250, 123], // Green
  [241, 250, 140], // Yellow
  [255, 184, 108], // Orange
  [255, 85, 85], // Red
  [248, 248, 242], // White
];

// Solarized teal/cyan colors
export const colorsSolarized = [
  [42, 161, 152], // Teal (starting color)
  [38, 139, 210], // Blue
  [133, 153, 0], // Green
  [181, 137, 0], // Yellow
  [203, 75, 22], // Orange
  [211, 54, 130], // Magenta
  [108, 113, 196], // Violet
  [131, 148, 150], // Base0
];

// Nord frost blue colors
export const colorsNord = [
  [136, 192, 208], // Frost Blue (starting color)
  [129, 161, 193], // Frost Blue 2
  [94, 129, 172], // Frost Blue 3
  [163, 190, 140], // Aurora Green
  [235, 203, 139], // Aurora Yellow
  [208, 135, 112], // Aurora Orange
  [191, 97, 106], // Aurora Red
  [180, 142, 173], // Aurora Purple
];

// Cobalt bright yellow/orange colors
export const colorsCobalt = [
  [255, 198, 0], // Bright Yellow (starting color)
  [255, 157, 0], // Orange
  [255, 0, 136], // Hot Pink
  [174, 129, 255], // Purple
  [0, 136, 255], // Blue
  [0, 187, 255], // Cyan
  [58, 217, 0], // Green
  [255, 198, 0], // Back to Yellow
];

// Maps theme name → color palette array
export const THEME_COLORS_MAP = {
  dark: neonColorsDark,
  light: colorsLight,
  monochrome: colorsMonochrome,
  'monochrome-inverted': colorsMonochromeInverted,
  vintage: colorsVintage,
  apple: colorsApple,
  c64: colorsC64,
  amber: colorsAmber,
  synthwave: colorsSynthwave,
  dracula: colorsDracula,
  solarized: colorsSolarized,
  nord: colorsNord,
  cobalt: colorsCobalt,
};

// Maps theme name → CSS filter string for the main canvas drop-shadow
export const THEME_FILTER_MAP = {
  light: 'drop-shadow(8px 8px 12px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 60px rgba(0, 0, 0, 0.3))',
  monochrome: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))',
  'monochrome-inverted': 'drop-shadow(0 0 8px rgba(0, 0, 0, 1)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))',
  vintage: 'drop-shadow(0 0 8px rgba(85, 255, 255, 1)) drop-shadow(0 0 20px rgba(85, 255, 255, 0.4))',
  apple: 'drop-shadow(0 0 8px rgba(51, 255, 51, 1)) drop-shadow(0 0 20px rgba(51, 255, 51, 0.4))',
  c64: 'drop-shadow(0 0 8px rgba(163, 230, 255, 1)) drop-shadow(0 0 20px rgba(163, 230, 255, 0.4))',
  amber: 'drop-shadow(0 0 8px rgba(255, 176, 0, 1)) drop-shadow(0 0 20px rgba(255, 176, 0, 0.4))',
  synthwave: 'drop-shadow(0 0 8px rgba(255, 20, 147, 1)) drop-shadow(0 0 20px rgba(255, 20, 147, 0.4))',
  dracula: 'drop-shadow(0 0 8px rgba(189, 147, 249, 1)) drop-shadow(0 0 20px rgba(189, 147, 249, 0.4))',
  solarized: 'drop-shadow(0 0 8px rgba(42, 161, 152, 1)) drop-shadow(0 0 20px rgba(42, 161, 152, 0.4))',
  nord: 'drop-shadow(0 0 8px rgba(136, 192, 208, 1)) drop-shadow(0 0 20px rgba(136, 192, 208, 0.4))',
};

// Default filter (used for dark, cobalt, and any unrecognised theme)
export const DEFAULT_FILTER = 'drop-shadow(0 0 8px rgba(0, 255, 65, 1)) drop-shadow(0 0 20px rgba(0, 255, 65, 0.4))';
