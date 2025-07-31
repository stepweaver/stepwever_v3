import { validateEnvironment, getEnvVar, generateEnvInstructions } from '../envValidation';

// Mock process.env for testing
const originalEnv = process.env;

beforeEach(() => {
  // Reset process.env before each test
  process.env = { ...originalEnv };
});

afterAll(() => {
  // Restore original process.env
  process.env = originalEnv;
});

describe('validateEnvironment', () => {
  test('should return valid when all required variables are present', () => {
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';

    const result = validateEnvironment();

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.present).toContain('EMAIL_USER');
    expect(result.present).toContain('EMAIL_PASS');
  });

  test('should return invalid when required variables are missing', () => {
    // Clear required variables
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;

    const result = validateEnvironment();

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
    expect(result.missing).toHaveLength(2);
    expect(result.missing.some(m => m.key === 'EMAIL_USER')).toBe(true);
    expect(result.missing.some(m => m.key === 'EMAIL_PASS')).toBe(true);
  });

  test('should include optional variables in warnings when not set', () => {
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';
    delete process.env.EMAIL_TO;

    const result = validateEnvironment();

    expect(result.isValid).toBe(true);
    expect(result.warnings.some(w => w.includes('EMAIL_TO'))).toBe(true);
  });

  test('should provide correct summary statistics', () => {
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';
    process.env.EMAIL_TO = 'test@example.com';

    const result = validateEnvironment();

    expect(result.summary.total).toBeGreaterThan(0);
    expect(result.summary.present).toBe(3);
    expect(result.summary.missing).toBe(0);
  });
});

describe('getEnvVar', () => {
  test('should return environment variable value when present', () => {
    process.env.EMAIL_USER = 'test@example.com';

    const result = getEnvVar('EMAIL_USER');

    expect(result).toBe('test@example.com');
  });

  test('should return default value when variable not set but has default', () => {
    delete process.env.EMAIL_SERVICE;

    const result = getEnvVar('EMAIL_SERVICE');

    expect(result).toBe('gmail');
  });

  test('should return fallback when variable not set and no default', () => {
    delete process.env.EMAIL_USER;

    const result = getEnvVar('EMAIL_USER', 'fallback@example.com');

    expect(result).toBe('fallback@example.com');
  });

  test('should return empty string when variable not set and no fallback', () => {
    delete process.env.EMAIL_USER;

    const result = getEnvVar('EMAIL_USER');

    expect(result).toBe('');
  });
});

describe('generateEnvInstructions', () => {
  test('should generate instructions with missing variables highlighted', () => {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;
    process.env.EMAIL_TO = 'test@example.com';

    const instructions = generateEnvInstructions();

    expect(instructions).toContain('# Environment Variables Setup');
    expect(instructions).toContain('## Required Variables (Missing)');
    expect(instructions).toContain('### EMAIL_USER');
    expect(instructions).toContain('### EMAIL_PASS');
    expect(instructions).toContain('❌ **REQUIRED**');
    expect(instructions).toContain('✅ Present');
  });

  test('should generate instructions when all variables are present', () => {
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';
    process.env.EMAIL_TO = 'test@example.com';

    const instructions = generateEnvInstructions();

    expect(instructions).toContain('# Environment Variables Setup');
    expect(instructions).not.toContain('## Required Variables (Missing)');
    expect(instructions).toContain('✅ Present');
  });
}); 