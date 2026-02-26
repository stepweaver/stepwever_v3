'use client';

import { useState, useEffect } from 'react';
import {
  DICE_ICONS,
  DICE_TYPES,
  UI_CONSTANTS,
  getRandomColor,
} from '@/lib/diceConstants';

/**
 * Hexagonal dice layout - d20 in center. Click to add to pool.
 */
export default function DicePoolBuilder({ dicePool, onUpdatePool }) {
  const [buttonColors, setButtonColors] = useState({});

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
      onUpdatePool(
        dicePool.map((die) =>
          die.sides === sides
            ? { ...die, count: Math.min(die.count + 1, UI_CONSTANTS.MAX_DICE_COUNT) }
            : die
        )
      );
    } else {
      onUpdatePool([
        ...dicePool,
        { sides, count: 1, color: buttonColors[sides] || getRandomColor() },
      ]);
    }
  };

  const positions = [
    { left: '50%', top: '0', transform: 'translateX(-50%)' },
    { right: '10%', top: '18%', transform: '' },
    { right: '10%', bottom: '18%', transform: '' },
    { left: '50%', bottom: '0', transform: 'translateX(-50%)' },
    { left: '10%', bottom: '18%', transform: '' },
    { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
    { left: '10%', top: '18%', transform: '' },
  ];

  return (
    <div className='relative w-[280px] h-[240px] mx-auto max-lg:w-[85vw] max-lg:max-w-[260px] max-lg:h-[200px]'>
      {DICE_TYPES.map((dice, index) => {
        const IconComponent = DICE_ICONS[dice.sides];
        const pos = positions[index];
        const positionStyles = {
          ...(pos.left && { left: pos.left }),
          ...(pos.right && { right: pos.right }),
          ...(pos.top && { top: pos.top }),
          ...(pos.bottom && { bottom: pos.bottom }),
          ...(pos.transform && { transform: pos.transform }),
        };
        const color = buttonColors[dice.sides] || 'var(--color-terminal-green)';

        return (
          <button
            key={dice.sides}
            onClick={() => handleAddDice(dice.sides)}
            className='absolute p-1 bg-transparent border-none font-ibm text-xs font-bold transition-all flex flex-col items-center gap-0.5 justify-center hover:z-10 hover:drop-shadow-[0_0_8px_currentColor] hover:scale-110 cursor-pointer'
            style={{ color, ...positionStyles }}
            onMouseEnter={(e) => {
              const newColor = getRandomColor();
              e.currentTarget.style.color = newColor;
              setButtonColors((prev) => ({ ...prev, [dice.sides]: newColor }));
            }}
            aria-label={`Add ${dice.label} to pool`}
          >
            <IconComponent
              size={44}
              className='max-lg:w-[36px] max-lg:h-[36px]'
            />
            <span className='text-xs opacity-90 font-semibold tracking-wider font-ocr'>
              {dice.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
