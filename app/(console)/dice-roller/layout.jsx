// Metadata for dice-roller page
export const metadata = {
  title: 'RPG Dice Roller | λstepweaver',
  description:
    'A retro terminal-styled dice roller for tabletop RPGs. Roll d4, d6, d8, d10, d12, d20, and d100 with modifiers, notes, and roll history tracking.',
  keywords: [
    'dice roller',
    'RPG dice',
    'tabletop gaming',
    'd20 dice roller',
    'DnD dice roller',
    'dice pool',
    'Ironsworn Starforged',
    'online dice roller',
    'terminal dice',
    'gaming tools',
  ],
  openGraph: {
    title: 'RPG Dice Roller | λstepweaver',
    description:
      'Roll dice with style! Terminal-inspired dice roller for tabletop RPGs with full suite of dice, modifiers, and roll history.',
    url: 'https://stepweaver.dev/dice-roller',
    type: 'website',
    images: [
      {
        url: '/images/screely-dice.png',
        width: 1200,
        height: 630,
        alt: 'RPG Dice Roller - Terminal styled dice rolling application',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RPG Dice Roller | Terminal-Styled Gaming Tool',
    description:
      'Roll d4, d6, d8, d10, d12, d20, d100 with modifiers and roll history. Perfect for tabletop RPG sessions.',
    images: [
      {
        url: '/images/screely-dice.png',
        width: 1200,
        height: 630,
        alt: 'RPG Dice Roller - Terminal styled dice rolling application',
      },
    ],
  },
  alternates: {
    canonical: 'https://stepweaver.dev/dice-roller',
  },
};

export default function DiceRollerLayout({ children }) {
  return children;
}
