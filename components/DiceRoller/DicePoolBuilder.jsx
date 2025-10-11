import { useState, useEffect } from 'react';
import {
  DICE_ICONS,
  DICE_TYPES,
  UI_CONSTANTS,
  getRandomColor,
} from '@/lib/diceConstants';

/**
 * Component for building and managing the dice pool
 */
export default function DicePoolBuilder({
  dicePool,
  onUpdatePool,
  modifier,
  setModifier,
}) {
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

  return (
    <div className='flex flex-col gap-3 max-lg:gap-1.5'>
      {/* Dice Type Selection */}
      <div>
        <h3 className='text-terminal-green mb-3 text-xl max-lg:mb-1 max-lg:text-sm'>
          Add Dice
        </h3>
        {/* Hexagonal grid - d20 in center */}
        <div className='relative w-[320px] h-[280px] mx-auto max-lg:w-[90vw] max-lg:max-w-[340px] max-lg:h-[280px]'>
          {DICE_TYPES.map((dice, index) => {
            const IconComponent = DICE_ICONS[dice.sides];

            // Position each die in hexagonal formation
            const positions = [
              // d4 - top
              { left: '50%', top: '0', transform: 'translateX(-50%)' },
              // d6 - top right
              { right: '10%', top: '18%', transform: '' },
              // d8 - bottom right
              { right: '10%', bottom: '18%', transform: '' },
              // d10 - bottom
              { left: '50%', bottom: '0', transform: 'translateX(-50%)' },
              // d12 - bottom left
              { left: '10%', bottom: '18%', transform: '' },
              // d20 - center
              { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
              // d100 - top left
              { left: '10%', top: '18%', transform: '' },
            ];

            const pos = positions[index];
            const positionStyles = {
              ...(pos.left && { left: pos.left }),
              ...(pos.right && { right: pos.right }),
              ...(pos.top && { top: pos.top }),
              ...(pos.bottom && { bottom: pos.bottom }),
              ...(pos.transform && { transform: pos.transform }),
            };

            return (
              <button
                key={dice.sides}
                onClick={() => handleAddDice(dice.sides)}
                className='absolute p-1 bg-transparent border-none font-ibm text-[0.65rem] font-bold cursor-pointer transition-all flex flex-col items-center gap-0.5 justify-center hover:z-10 hover:drop-shadow-[0_0_10px_currentColor] hover:scale-115'
                style={{
                  color:
                    buttonColors[dice.sides] || 'var(--color-terminal-green)',
                  ...positionStyles,
                }}
                onMouseEnter={(e) => {
                  const newColor = getRandomColor();
                  e.currentTarget.style.color = newColor;
                  setButtonColors((prev) => ({
                    ...prev,
                    [dice.sides]: newColor,
                  }));
                }}
                aria-label={`Add ${dice.label} to pool`}
              >
                <IconComponent
                  size={48}
                  className='max-lg:w-[44px] max-lg:h-[44px]'
                />
                <span className='text-base opacity-90 font-semibold tracking-wider max-lg:text-xs'>
                  {dice.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modifier Section */}
      <div>
        <h3 className='text-terminal-green mb-3 text-xl max-lg:mb-1 max-lg:text-sm'>
          Modifier
        </h3>
        <div className='flex items-center gap-2 max-lg:gap-1.5'>
          <label
            htmlFor='modifier-input'
            className='text-terminal-green text-xs font-bold min-w-[50px] max-lg:min-w-[40px] max-lg:text-[0.65rem]'
          >
            MOD:
          </label>
          <button
            onClick={() => setModifier(modifier - 1)}
            className='w-8 h-8 min-w-8 border border-terminal-border bg-terminal-light rounded text-sm font-bold cursor-pointer transition-all text-terminal-text flex items-center justify-center hover:bg-terminal-dark hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] max-lg:w-6 max-lg:h-6 max-lg:min-w-6 max-lg:text-xs'
            aria-label='Decrease modifier'
          >
            −
          </button>
          <input
            id='modifier-input'
            type='number'
            min={UI_CONSTANTS.MIN_MODIFIER}
            max={UI_CONSTANTS.MAX_MODIFIER}
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            className='w-16 p-2 bg-terminal-dark border border-terminal-border rounded text-terminal-text font-ibm text-sm text-center focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] [-webkit-font-smoothing:antialiased] [text-rendering:geometricPrecision] max-lg:w-12 max-lg:p-1 max-lg:text-xs'
            placeholder='0'
            aria-label='Roll modifier'
          />
          <button
            onClick={() => setModifier(modifier + 1)}
            className='w-8 h-8 min-w-8 border border-terminal-border bg-terminal-light rounded text-sm font-bold cursor-pointer transition-all text-terminal-text flex items-center justify-center hover:bg-terminal-dark hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] max-lg:w-6 max-lg:h-6 max-lg:min-w-6 max-lg:text-xs'
            aria-label='Increase modifier'
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
