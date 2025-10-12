/**
 * Date formatting utilities
 * Formats dates consistently across the application
 */

/**
 * Format ISO timestamp to readable format with brackets
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} - Formatted date string [YYYY-MM-DD HH:mm]
 */
export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  // Use UTC methods to avoid timezone conversion issues
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `[${year}-${month}-${day} ${hours}:${minutes}]`;
}

