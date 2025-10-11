# RPG Dice Roller

A full-featured dice rolling application for tabletop RPG sessions, built with Next.js and styled to match the stepweaver terminal aesthetic.

## Features

### Core Functionality

- **Multiple Dice Types**: Support for d4, d6, d8, d10, d12, d20, and d100
- **Flexible Pool Building**: Add any combination of dice with custom quantities
- **Modifiers**: Add positive or negative modifiers to your rolls
- **Roll Breakdown**: See individual die results and subtotals by dice type
- **Roll History**: Last 10 rolls saved with timestamps (persisted in localStorage)
- **Copy to Clipboard**: Copy dice notation for sharing or documentation

### User Experience

- **Keyboard Shortcuts**:
  - `ENTER` - Roll the dice
  - `C` - Copy the current roll notation
  - `R` - Reset the entire dice pool
  - `ESC` - Clear current results
- **Randomized Colors**: Each die type gets a random color from the terminal palette
- **Smooth Animations**: Dice roll animation with shake/tumble effect (0.5s)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support

## File Structure

```
components/DiceRoller/
├── DiceRoller.jsx          # Main component with state management
├── DicePoolBuilder.jsx     # UI for adding/removing dice
├── DiceResult.jsx          # Display single roll result
├── RollHistory.jsx         # History sidebar
└── README.md               # This file

lib/
├── roller.js               # Core dice rolling engine
└── diceConstants.js        # Shared constants (icons, colors, UI values)

utils/
└── dateFormatter.js        # Date formatting utilities

app/dice-roller/
└── page.jsx                # Route page with error boundary
```

## Usage

### Accessing the Dice Roller

Navigate to `/dice-roller` in your browser to access the full-screen dice roller interface.

### Rolling Dice

1. Click on dice types (d4-d100) to add them to your pool
2. Use +/- buttons to adjust quantities
3. Optionally add a modifier in the modifier input
4. Click "ROLL DICE" or press ENTER
5. View the breakdown and total
6. Click on history items to review past rolls

### Dice Notation

The dice roller uses standard RPG dice notation:

- `3d6` - Roll three 6-sided dice
- `1d20+5` - Roll one 20-sided die and add 5
- `2d8+1d6-2` - Roll two 8-sided dice, one 6-sided die, and subtract 2

## Architecture & Code Quality

### Centralized Constants

All dice-related constants (icons, colors, UI values) are centralized in `lib/diceConstants.js` to eliminate duplication and ensure consistency across components.

### Error Handling

- Error boundary wraps the dice roller page
- LocalStorage operations use proper error handling
- All errors are logged through the error monitoring service

### Performance Optimizations

- `useMemo` used for computed values like `canRoll`
- `useCallback` used for all event handlers
- React hooks optimized to prevent unnecessary re-renders

### Date Formatting

Dates use the format `[YYYY-MM-DD HH:mm]` via a centralized utility in `utils/dateFormatter.js`

## API Reference

### `lib/roller.js`

The dice rolling engine provides a clean API for programmatic use:

```javascript
import { roll, rollDice, buildNotation, parseDiceNotation } from '@/lib/roller';

// Roll from notation string
const result = roll('3d6+2');
console.log(result.total); // Total result
console.log(result.breakdown); // Individual die results

// Roll specific dice
const dice = rollDice(6, 3); // Roll 3d6
console.log(dice); // [4, 2, 6]

// Build notation from pool
const pool = [
  { sides: 6, count: 3 },
  { sides: 20, count: 1 },
];
const notation = buildNotation(pool, 2); // "3d6 + 1d20 + 2"

// Parse notation
const parsed = parseDiceNotation('2d20+5');
// { groups: [{ sides: 20, count: 2 }], modifier: 5 }
```

### Result Object Structure

```javascript
{
  notation: "3d6+2",           // Original notation
  rolls: [...],                // Raw roll data
  modifier: 2,                 // Applied modifier
  subtotal: 12,                // Sum before modifier
  total: 14,                   // Final total
  breakdown: [                 // Formatted breakdown
    {
      notation: "3d6",
      results: [4, 2, 6],
      subtotal: 12
    }
  ],
  timestamp: "2025-10-10T12:00:00.000Z"
}
```

## Future Enhancements

### Terminal Integration

The roller engine is designed to be integrated into the terminal emulator:

```bash
λ roll 3d6+2
Rolling 3d6+2:
  3d6: [4, 2, 6] = 12
  Modifier: +2
Total: 14

λ roll advantage    # 2d20 keep highest
λ roll disadvantage # 2d20 keep lowest
```

### Dialog Component

A `<DiceRollerDialog />` component could be created for embedding in blog posts or project pages:

```jsx
<DiceRollerDialog preset='3d6' onRoll={(result) => console.log(result)} />
```

## Styling

The dice roller uses the existing terminal theme:

- Colors: Terminal palette (green, cyan, yellow, blue, magenta, pink, purple, orange)
- Fonts: IBM 3270 and OCRA
- Effects: CRT glow, scanlines, terminal borders
- Animations: Smooth roll animation, fade-in effects

## Testing

Run the test suite:

```bash
npm test -- lib/__tests__/roller.test.js
```

The tests cover:

- Single die rolling
- Multiple dice rolling
- Notation parsing
- Roll calculation
- Notation building
- Pool validation

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- localStorage for history persistence
- Clipboard API with fallback for older browsers

## Performance

- Lightweight components with React.memo where appropriate
- Efficient state management with useState
- LocalStorage with error handling
- Optimized animations (hardware-accelerated where possible)

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus management
- High contrast colors for readability
