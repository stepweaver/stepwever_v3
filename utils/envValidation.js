/**
 * Environment validation utility
 * Validates required environment variables and provides helpful error messages
 */

const REQUIRED_ENV_VARS = {
  // Email configuration (required only if using contact form)
  EMAIL_USER: {
    required: false,
    description: 'Email service username (Gmail, etc.)',
    example: 'your-email@gmail.com'
  },
  EMAIL_PASS: {
    required: false,
    description: 'Email service password or app password',
    example: 'your-app-password'
  },
  EMAIL_TO: {
    required: false,
    description: 'Email address to receive contact form submissions',
    example: 'stephen@stepweaver.dev'
  },
  EMAIL_SERVICE: {
    required: false,
    description: 'Email service provider',
    example: 'gmail',
    default: 'gmail'
  },

  // Optional features
  SEND_CONFIRMATION_EMAIL: {
    required: false,
    description: 'Whether to send confirmation emails to users',
    example: 'true',
    default: 'false'
  },

  // Analytics and monitoring
  GOOGLE_ANALYTICS_ID: {
    required: false,
    description: 'Google Analytics tracking ID',
    example: 'G-XXXXXXXXXX'
  },

  // SEO and verification
  GOOGLE_VERIFICATION: {
    required: false,
    description: 'Google Search Console verification code',
    example: 'your-verification-code'
  }
};

/**
 * Validate environment variables
 * @param {Object} env - Environment variables object (defaults to process.env)
 * @returns {Object} - Validation result
 */
export const validateEnvironment = (env = process.env) => {
  const errors = [];
  const warnings = [];
  const missing = [];
  const present = [];

  for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = env[key];

    if (config.required && !value) {
      missing.push({
        key,
        description: config.description,
        example: config.example
      });
      errors.push(`Missing required environment variable: ${key}`);
    } else if (value) {
      present.push(key);
    } else if (!config.required) {
      warnings.push(`Optional environment variable not set: ${key} (${config.description})`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    missing,
    present,
    summary: {
      total: Object.keys(REQUIRED_ENV_VARS).length,
      present: present.length,
      missing: missing.length,
      optional: warnings.length
    }
  };
};

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable name
 * @param {string} fallback - Fallback value
 * @returns {string} - Environment variable value or fallback
 */
export const getEnvVar = (key, fallback = '') => {
  const config = REQUIRED_ENV_VARS[key];
  const value = process.env[key];

  if (value) {
    return value;
  }

  if (config?.default) {
    return config.default;
  }

  return fallback;
};

/**
 * Generate environment setup instructions
 * @returns {string} - Markdown formatted setup instructions
 */
export const generateEnvInstructions = () => {
  const validation = validateEnvironment();

  let instructions = '# Environment Variables Setup\n\n';

  if (validation.errors.length > 0) {
    instructions += '## Required Variables (Missing)\n\n';
    validation.missing.forEach(({ key, description, example }) => {
      instructions += `### ${key}\n`;
      instructions += `- **Description**: ${description}\n`;
      instructions += `- **Example**: \`${example}\`\n\n`;
    });
  }

  instructions += '## All Environment Variables\n\n';
  instructions += 'Create a `.env.local` file in your project root with the following variables:\n\n';

  for (const [key, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const isMissing = validation.missing.some(m => m.key === key);
    const status = isMissing ? '**REQUIRED**' : 'Present';

    instructions += `### ${key}\n`;
    instructions += `- **Status**: ${status}\n`;
    instructions += `- **Description**: ${config.description}\n`;
    instructions += `- **Required**: ${config.required ? 'Yes' : 'No'}\n`;
    if (config.example) {
      instructions += `- **Example**: \`${config.example}\`\n`;
    }
    if (config.default) {
      instructions += `- **Default**: \`${config.default}\`\n`;
    }
    instructions += '\n';
  }

  return instructions;
};

/**
 * Log environment validation results
 * @param {boolean} verbose - Whether to log detailed information
 */
export const logEnvironmentStatus = (verbose = false) => {
  const validation = validateEnvironment();

  console.log('\nEnvironment Validation Results:');
  console.log(`Summary: ${validation.summary.present}/${validation.summary.total} variables set`);

  if (validation.errors.length > 0) {
    console.log('\nErrors:');
    validation.errors.forEach(error => console.log(`  - ${error}`));
  }

  if (validation.warnings.length > 0 && verbose) {
    console.log('\nWarnings:');
    validation.warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  if (verbose && validation.present.length > 0) {
    console.log('\nPresent variables:');
    validation.present.forEach(key => console.log(`  - ${key}`));
  }

  if (validation.isValid) {
    console.log('\nEnvironment validation passed!');
  } else {
    console.log('\nEnvironment validation failed. Please check the errors above.');
  }

  console.log('');
}; 