/**
 * Tests for the dice roller engine
 * Run with: npm test lib/__tests__/roller.test.js
 */

import {
  rollSingleDie,
  rollDice,
  parseDiceNotation,
  roll,
  buildNotation,
  validateDicePool,
} from '../roller';

describe('Dice Roller Engine', () => {
  describe('rollSingleDie', () => {
    it('should return a number between 1 and the number of sides', () => {
      for (let i = 0; i < 100; i++) {
        const result = rollSingleDie(6);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
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

