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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `[${year}-${month}-${day} ${hours}:${minutes}]`;
}

