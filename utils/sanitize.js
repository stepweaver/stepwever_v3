// DOMPurify + JSDOM are lazy-loaded only when sanitizeHTML() is called.
// This avoids cold-start cost for routes that only use sanitizeText/sanitizeFormData (chat, contact APIs).

let _purify = null;

function getPurify() {
  if (!_purify) {
    const DOMPurify = require('dompurify');
    const { JSDOM } = require('jsdom');
    const window = new JSDOM('').window;
    _purify = DOMPurify(window);
  }
  return _purify;
}

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Lazy-loads DOMPurify/JSDOM on first use to avoid cold-start cost for text-only routes.
 * @param {string} html - The HTML content to sanitize
 * @param {Object} options - DOMPurify configuration options
 * @returns {string} - Sanitized HTML
 */
export const sanitizeHTML = (html, options = {}) => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const defaultOptions = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span', 'div'
    ],
    ALLOWED_ATTR: ['class', 'id', 'style'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
    RETURN_TRUSTED_TYPE: false,
    FORCE_BODY: false,
    SANITIZE_DOM: true,
    WHOLE_DOCUMENT: false,
    RETURN_TRUSTED_TYPE: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    ...options
  };

  return getPurify().sanitize(html, defaultOptions);
};

/**
 * Sanitize plain text content
 * @param {string} text - The text content to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove any HTML tags and encode special characters
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&/g, '&amp;') // Encode ampersands
    .replace(/</g, '&lt;') // Encode less than
    .replace(/>/g, '&gt;') // Encode greater than
    .replace(/"/g, '&quot;') // Encode quotes
    .replace(/'/g, '&#x27;') // Encode apostrophes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

/**
 * Sanitize form data
 * @param {Object} formData - The form data object
 * @returns {Object} - Sanitized form data
 */
export const sanitizeFormData = (formData) => {
  if (!formData || typeof formData !== 'object') {
    return {};
  }

  const sanitized = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      // For text fields, use text sanitization
      sanitized[key] = sanitizeText(value);
    } else if (Array.isArray(value)) {
      // For arrays, sanitize each element
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      // For nested objects, recursively sanitize
      sanitized[key] = sanitizeFormData(value);
    } else {
      // For other types, keep as is
      sanitized[key] = value;
    }
  }

  return sanitized;
}; 