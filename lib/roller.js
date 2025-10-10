/**
 * RPG Dice Roller Engine
 * Provides dice rolling functionality with notation parsing
 */

/**
 * Roll a single die with the specified number of sides
 * @param {number} sides - Number of sides on the die
 * @returns {number} - Random number between 1 and sides
 */
export function rollSingleDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Roll multiple dice of the same type
 * @param {number} sides - Number of sides on each die
 * @param {number} count - Number of dice to roll
 * @returns {number[]} - Array of individual die results
 */
export function rollDice(sides, count) {
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
    groups.push({ sides, count });
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
      total: modifier,
      breakdown: [],
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

