/**
 * RPG Dice Roller Engine
 * Provides dice rolling functionality with notation parsing
 */

/**
 * Return a cryptographically stronger random integer in the inclusive range [min, max].
 * Uses rejection sampling to avoid modulo bias.
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntInclusive(min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);

  if (!Number.isInteger(low) || !Number.isInteger(high) || high < low) {
    throw new Error(`Invalid random range: [${min}, ${max}]`);
  }

  const range = high - low + 1;

  if (range <= 0) {
    throw new Error(`Invalid random range size: ${range}`);
  }

  if (
    typeof globalThis !== 'undefined' &&
    globalThis.crypto &&
    typeof globalThis.crypto.getRandomValues === 'function'
  ) {
    const maxUint32 = 0xffffffff;
    const bucketSize = Math.floor((maxUint32 + 1) / range);
    const limit = bucketSize * range;

    const buffer = new Uint32Array(1);

    let value;
    do {
      globalThis.crypto.getRandomValues(buffer);
      value = buffer[0];
    } while (value >= limit);

    return low + (value % range);
  }

  return Math.floor(Math.random() * range) + low;
}

/**
 * Roll a single die with the specified number of sides
 * @param {number} sides - Number of sides on the die
 * @returns {number} - Random number between 1 and sides
 */
export function rollSingleDie(sides) {
  if (!Number.isInteger(sides) || sides < 2) {
    throw new Error(`Invalid die sides: ${sides}`);
  }

  return randomIntInclusive(1, sides);
}

/**
 * Roll multiple dice of the same type
 * @param {number} sides - Number of sides on each die
 * @param {number} count - Number of dice to roll
 * @returns {number[]} - Array of individual die results
 */
export function rollDice(sides, count) {
  if (!Number.isInteger(count) || count < 1) {
    return [];
  }

  const results = [];

  for (let i = 0; i < count; i++) {
    results.push(rollSingleDie(sides));
  }

  return results;
}

/**
 * Parse dice notation string (e.g., "3d6+2" or "1d20-1")
 * @param {string} notation - Dice notation string
 * @returns {Object} - Parsed dice groups and modifier
 * Example return: { groups: [{sides: 6, count: 3}], modifier: 2 }
 */
export function parseDiceNotation(notation) {
  if (!notation || typeof notation !== 'string') {
    return { groups: [], modifier: 0 };
  }

  const cleaned = notation.toLowerCase().replace(/\s+/g, '');
  const groups = [];
  let modifier = 0;

  // Match all dice groups (e.g., "3d6", "1d20")
  const diceRegex = /(\d+)?d(\d+)/g;
  let match;

  while ((match = diceRegex.exec(cleaned)) !== null) {
    const count = match[1] ? parseInt(match[1], 10) : 1;
    const sides = parseInt(match[2], 10);
    if (count > 0 && sides > 1) {
      groups.push({ sides, count });
    }
  }

  // Match modifier (e.g., "+2", "-3")
  const modifierRegex = /([+-]\d+)(?!d)/g;
  let modMatch;

  while ((modMatch = modifierRegex.exec(cleaned)) !== null) {
    modifier += parseInt(modMatch[1], 10);
  }

  return { groups, modifier };
}

/**
 * Roll dice based on notation string
 * @param {string} notation - Dice notation (e.g., "3d6+2")
 * @returns {Object} - Roll results with breakdown
 */
export function roll(notation) {
  const { groups, modifier } = parseDiceNotation(notation);

  if (groups.length === 0) {
    return {
      notation,
      rolls: [],
      modifier,
      subtotal: 0,
      total: modifier,
      breakdown: [],
      timestamp: new Date().toISOString(),
    };
  }

  const rolls = [];
  const breakdown = [];
  let subtotal = 0;

  groups.forEach((group) => {
    const results = rollDice(group.sides, group.count);
    const groupTotal = results.reduce((sum, val) => sum + val, 0);

    rolls.push({
      sides: group.sides,
      count: group.count,
      results,
      subtotal: groupTotal,
    });

    breakdown.push({
      notation: `${group.count}d${group.sides}`,
      results,
      subtotal: groupTotal,
    });

    subtotal += groupTotal;
  });

  const total = subtotal + modifier;

  return {
    notation,
    rolls,
    modifier,
    subtotal,
    total,
    breakdown,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Re-roll dice while keeping held dice
 * @param {Object} currentResult - Current roll result
 * @param {Set} heldDice - Set of held dice keys in format "groupIndex-resultIndex"
 * @returns {Object} - New roll result with held dice preserved
 */
export function rerollWithHeldDice(currentResult, heldDice) {
  if (!currentResult || !currentResult.breakdown) {
    return currentResult;
  }

  const newBreakdown = [];
  const newRolls = [];
  let subtotal = 0;

  currentResult.breakdown.forEach((group, groupIndex) => {
    const newResults = [...group.results];
    const sides = parseInt(group.notation.match(/\d+d(\d+)/)?.[1] || 0, 10);

    group.results.forEach((result, resultIndex) => {
      const key = `${groupIndex}-${resultIndex}`;
      if (!heldDice.has(key)) {
        newResults[resultIndex] = rollSingleDie(sides);
      }
    });

    const groupTotal = newResults.reduce((sum, val) => sum + val, 0);

    newBreakdown.push({
      notation: group.notation,
      results: newResults,
      subtotal: groupTotal,
    });

    newRolls.push({
      sides,
      count: group.results.length,
      results: newResults,
      subtotal: groupTotal,
    });

    subtotal += groupTotal;
  });

  const total = subtotal + currentResult.modifier;

  return {
    ...currentResult,
    breakdown: newBreakdown,
    rolls: newRolls,
    subtotal,
    total,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format roll result for display
 * @param {Object} result - Result from roll()
 * @returns {string} - Formatted string representation
 */
export function formatRollResult(result) {
  if (!result || !result.breakdown) {
    return 'Invalid roll';
  }

  let output = `Rolling ${result.notation}:\n`;

  result.breakdown.forEach((group) => {
    output += `  ${group.notation}: [${group.results.join(', ')}] = ${group.subtotal}\n`;
  });

  if (result.modifier !== 0) {
    const sign = result.modifier > 0 ? '+' : '';
    output += `  Modifier: ${sign}${result.modifier}\n`;
  }

  output += `Total: ${result.total}`;

  return output;
}

/**
 * Build notation string from dice pool
 * @param {Array} dicePool - Array of {sides, count, color} objects
 * @param {number} modifier - Optional modifier
 * @returns {string} - Notation string
 */
export function buildNotation(dicePool, modifier = 0) {
  if (!dicePool || dicePool.length === 0) {
    return modifier !== 0 ? `${modifier > 0 ? '+' : ''}${modifier}` : '';
  }

  const parts = dicePool
    .filter((die) => die.count > 0)
    .map((die) => `${die.count}d${die.sides}`);

  let notation = parts.join(' + ');

  if (modifier !== 0) {
    notation += modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`;
  }

  return notation || '0';
}

/**
 * Validate dice pool
 * @param {Array} dicePool - Array of dice configurations
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateDicePool(dicePool) {
  if (!Array.isArray(dicePool) || dicePool.length === 0) {
    return false;
  }

  return dicePool.some((die) => die.count > 0);
}

