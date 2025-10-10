import { useState, useEffect } from 'react';
import styles from '@/styles/dice-roller.module.css';
import {
  GiTriangleTarget,
  GiPerspectiveDiceSixFacesRandom,
  GiDiceEightFacesEight,
  GiDiceTwentyFacesTwenty,
  GiRollingDices,
  GiDiceTarget,
  GiCubes,
} from 'react-icons/gi';

// Dice icon components - using Game Icons collection for authentic RPG dice
const DiceIcons = {
  4: GiTriangleTarget, // d4 (triangle/pyramid shape)
  6: GiPerspectiveDiceSixFacesRandom, // d6 (cube die)
  8: GiDiceEightFacesEight, // d8 (octahedron)
  10: GiDiceTarget, // d10 (using target/angular die)
  12: GiCubes, // d12 (using stacked cubes icon)
  20: GiDiceTwentyFacesTwenty, // d20 (icosahedron) - the iconic one!
  100: GiRollingDices, // d100 (percentile dice)
};

// Available dice types
const DICE_TYPES = [
  { sides: 4, label: 'd4' },
  { sides: 6, label: 'd6' },
  { sides: 8, label: 'd8' },
  { sides: 10, label: 'd10' },
  { sides: 12, label: 'd12' },
  { sides: 20, label: 'd20' },
  { sides: 100, label: 'd100' },
];

// Available colors from the palette
const COLORS = [
  'var(--color-terminal-green)',
  'var(--color-terminal-cyan)',
  'var(--color-terminal-yellow)',
  'var(--color-terminal-blue)',
  'var(--color-terminal-magenta)',
  'var(--color-terminal-pink)',
  'var(--color-terminal-purple)',
  'var(--color-terminal-orange)',
];

/**
 * Get a random color from the palette
 */
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Component for building and managing the dice pool
 */
export default function DicePoolBuilder({ dicePool, onUpdatePool }) {
  // State for button colors - initialize after mount to avoid hydration mismatch
  const [buttonColors, setButtonColors] = useState({});

  // Set initial random colors after component mounts (client-side only)
  useEffect(() => {
    const initialColors = {};
    DICE_TYPES.forEach((dice) => {
      initialColors[dice.sides] = getRandomColor();
    });
    setButtonColors(initialColors);
  }, []);
  const handleAddDice = (sides) => {
    const existingDie = dicePool.find((die) => die.sides === sides);

    if (existingDie) {
      // Increment count if die already exists
      onUpdatePool(
        dicePool.map((die) =>
          die.sides === sides ? { ...die, count: die.count + 1 } : die
        )
      );
    } else {
      // Add new die with random color
      onUpdatePool([...dicePool, { sides, count: 1, color: getRandomColor() }]);
    }
  };

  const handleUpdateCount = (sides, delta) => {
    onUpdatePool(
      dicePool
        .map((die) =>
          die.sides === sides
            ? { ...die, count: Math.max(0, die.count + delta) }
            : die
        )
        .filter((die) => die.count > 0)
    );
  };

  const handleRemoveDice = (sides) => {
    onUpdatePool(dicePool.filter((die) => die.sides !== sides));
  };

  return (
    <div className={styles.dicePoolBuilder}>
      {/* Dice Type Selection */}
      <div>
        <h3
          style={{
            color: 'var(--color-terminal-green)',
            marginBottom: '0.75rem',
            fontSize: '1.25rem',
          }}
        >
          Add Dice
        </h3>
        <div className={styles.diceTypeGrid}>
          {DICE_TYPES.map((dice) => {
            const IconComponent = DiceIcons[dice.sides];
            return (
              <button
                key={dice.sides}
                onClick={() => handleAddDice(dice.sides)}
                className={styles.diceTypeButton}
                style={{
                  color:
                    buttonColors[dice.sides] || 'var(--color-terminal-green)',
                }}
                onMouseEnter={(e) => {
                  const newColor = getRandomColor();
                  e.currentTarget.style.color = newColor;
                  // Update state so color persists after hover
                  setButtonColors((prev) => ({
                    ...prev,
                    [dice.sides]: newColor,
                  }));
                }}
                aria-label={`Add ${dice.label} to pool`}
              >
                <IconComponent size={36} />
                <span className={styles.diceLabel}>{dice.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Dice Pool */}
      <div>
        <h3
          style={{
            color: 'var(--color-terminal-green)',
            marginBottom: '0.75rem',
            fontSize: '1.25rem',
          }}
        >
          Current Pool
        </h3>
        <div className={styles.activeDicePool}>
          {dicePool.length === 0 ? (
            <div className={styles.emptyPool}>
              Click dice above to add them to your pool
            </div>
          ) : (
            dicePool.map((die) => {
              const IconComponent = DiceIcons[die.sides];
              return (
                <div
                  key={die.sides}
                  className={styles.dicePoolItem}
                  style={{ borderColor: die.color }}
                >
                  <div className={styles.dicePoolInfo}>
                    <IconComponent size={16} style={{ color: die.color }} />
                    <span
                      className={styles.dicePoolLabel}
                      style={{ color: die.color }}
                    >
                      d{die.sides}
                    </span>
                    <div className={styles.dicePoolControls}>
                      <button
                        onClick={() => handleUpdateCount(die.sides, -1)}
                        className={styles.quantityButton}
                        disabled={die.count <= 1}
                        aria-label={`Decrease ${die.sides}-sided dice count`}
                      >
                        −
                      </button>
                      <span className={styles.quantityDisplay}>
                        {die.count}
                      </span>
                      <button
                        onClick={() => handleUpdateCount(die.sides, 1)}
                        className={styles.quantityButton}
                        disabled={die.count >= 99}
                        aria-label={`Increase ${die.sides}-sided dice count`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveDice(die.sides)}
                    className={styles.removeButton}
                    aria-label={`Remove ${die.sides}-sided dice from pool`}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
