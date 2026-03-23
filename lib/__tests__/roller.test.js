/**
 * Tests for the dice roller engine
 * Run with: npm test lib/__tests__/roller.test.js
 */

import {
  randomIntInclusive,
  rollSingleDie,
  rollDice,
  parseDiceNotation,
  roll,
  buildNotation,
  validateDicePool,
  rerollWithHeldDice,
} from '../roller';

describe('Dice Roller Engine', () => {
  describe('randomIntInclusive', () => {
    it('should return a number within the inclusive range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomIntInclusive(1, 6);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
    });

    it('should throw on invalid ranges', () => {
      expect(() => randomIntInclusive(5, 4)).toThrow();
      expect(() => randomIntInclusive(2, 1.2)).toThrow();
    });

    it('coerces float bounds to integer range', () => {
      const v = randomIntInclusive(1.5, 4.9);
      expect(v).toBeGreaterThanOrEqual(2);
      expect(v).toBeLessThanOrEqual(4);
    });
  });

  describe('rollSingleDie', () => {
    it('should return a number between 1 and the number of sides', () => {
      for (let i = 0; i < 100; i++) {
        const result = rollSingleDie(6);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
    });

    it('should throw for invalid side counts', () => {
      expect(() => rollSingleDie(1)).toThrow();
      expect(() => rollSingleDie(0)).toThrow();
      expect(() => rollSingleDie(-2)).toThrow();
      expect(() => rollSingleDie(3.5)).toThrow();
    });
  });

  describe('rollDice', () => {
    it('should return the correct number of dice', () => {
      const result = rollDice(6, 3);
      expect(result).toHaveLength(3);
    });

    it('should return values within range', () => {
      const result = rollDice(20, 5);
      result.forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(20);
      });
    });
  });

  describe('parseDiceNotation', () => {
    it('should parse simple dice notation', () => {
      const result = parseDiceNotation('3d6');
      expect(result.groups).toHaveLength(1);
      expect(result.groups[0]).toEqual({ sides: 6, count: 3 });
      expect(result.modifier).toBe(0);
    });

    it('should parse dice notation with modifier', () => {
      const result = parseDiceNotation('2d20+5');
      expect(result.groups).toHaveLength(1);
      expect(result.groups[0]).toEqual({ sides: 20, count: 2 });
      expect(result.modifier).toBe(5);
    });

    it('should parse multiple dice types', () => {
      const result = parseDiceNotation('3d6+1d20+2');
      expect(result.groups).toHaveLength(2);
      expect(result.groups[0]).toEqual({ sides: 6, count: 3 });
      expect(result.groups[1]).toEqual({ sides: 20, count: 1 });
      expect(result.modifier).toBe(2);
    });

    it('should parse negative modifiers', () => {
      const result = parseDiceNotation('1d20-3');
      expect(result.modifier).toBe(-3);
    });

    it('should handle whitespace', () => {
      const result = parseDiceNotation('3d6 + 1d20 + 2');
      expect(result.groups).toHaveLength(2);
      expect(result.modifier).toBe(2);
    });

    it('should handle implicit single die', () => {
      const result = parseDiceNotation('d20');
      expect(result.groups).toHaveLength(1);
      expect(result.groups[0]).toEqual({ sides: 20, count: 1 });
    });

    it('should ignore invalid or degenerate groups', () => {
      const result = parseDiceNotation('0d6+1d1+2d-4+3');
      expect(result.groups).toHaveLength(0);
      expect(result.modifier).toBe(-1);
    });

    it('should handle empty or non-string input', () => {
      expect(parseDiceNotation('')).toEqual({ groups: [], modifier: 0 });
      // @ts-ignore
      expect(parseDiceNotation(null)).toEqual({ groups: [], modifier: 0 });
    });
  });

  describe('roll', () => {
    it('should return a valid roll result', () => {
      const result = roll('3d6+2');
      expect(result).toHaveProperty('notation');
      expect(result).toHaveProperty('rolls');
      expect(result).toHaveProperty('modifier');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('timestamp');
    });

    it('should calculate correct total', () => {
      const result = roll('1d6+5');
      const diceTotal = result.rolls[0].subtotal;
      expect(result.total).toBe(diceTotal + 5);
    });

    it('should handle multiple dice types', () => {
      const result = roll('2d6+1d8');
      expect(result.rolls).toHaveLength(2);
    });

    it('should handle notation with no valid groups', () => {
      const result = roll('+5');
      expect(result.rolls).toHaveLength(0);
      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(5);
      expect(result.breakdown).toHaveLength(0);
      expect(typeof result.timestamp).toBe('string');
    });
  });

  describe('rerollWithHeldDice', () => {
    it('should reroll only non-held dice and preserve held values', () => {
      const currentResult = {
        notation: '3d6',
        modifier: 2,
        breakdown: [
          {
            notation: '3d6',
            results: [2, 4, 6],
            subtotal: 12,
          },
        ],
        rolls: [
          {
            sides: 6,
            count: 3,
            results: [2, 4, 6],
            subtotal: 12,
          },
        ],
        subtotal: 12,
        total: 14,
        timestamp: new Date().toISOString(),
      };

      const heldDice = new Set(['0-1']); // hold the middle die (4)

      const newResult = rerollWithHeldDice(currentResult, heldDice);

      expect(newResult.breakdown[0].results[1]).toBe(4);
      expect(newResult.breakdown[0].results[0]).toBeGreaterThanOrEqual(1);
      expect(newResult.breakdown[0].results[0]).toBeLessThanOrEqual(6);
      expect(newResult.breakdown[0].results[2]).toBeGreaterThanOrEqual(1);
      expect(newResult.breakdown[0].results[2]).toBeLessThanOrEqual(6);

      const expectedSubtotal = newResult.breakdown[0].results.reduce(
        (sum, v) => sum + v,
        0
      );
      expect(newResult.subtotal).toBe(expectedSubtotal);
      expect(newResult.total).toBe(expectedSubtotal + currentResult.modifier);
      expect(typeof newResult.timestamp).toBe('string');
    });
  });

  describe('buildNotation', () => {
    it('should build notation from dice pool', () => {
      const pool = [
        { sides: 6, count: 3 },
        { sides: 20, count: 1 },
      ];
      const result = buildNotation(pool, 2);
      expect(result).toBe('3d6 + 1d20 + 2');
    });

    it('should handle negative modifiers', () => {
      const pool = [{ sides: 20, count: 1 }];
      const result = buildNotation(pool, -2);
      expect(result).toBe('1d20 - 2');
    });

    it('should filter out zero count dice', () => {
      const pool = [
        { sides: 6, count: 3 },
        { sides: 8, count: 0 },
      ];
      const result = buildNotation(pool, 0);
      expect(result).toBe('3d6');
    });
  });

  describe('validateDicePool', () => {
    it('should return true for valid pool', () => {
      const pool = [{ sides: 6, count: 1 }];
      expect(validateDicePool(pool)).toBe(true);
    });

    it('should return false for empty pool', () => {
      expect(validateDicePool([])).toBe(false);
    });

    it('should return false for pool with all zero counts', () => {
      const pool = [
        { sides: 6, count: 0 },
        { sides: 8, count: 0 },
      ];
      expect(validateDicePool(pool)).toBe(false);
    });
  });
});

