// Blackjack game for Terminal
// Standard rules: dealer stands on 17, blackjack pays 3:2 (simplified to 1 win)

const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit, value: rank === 'A' ? 11 : ['J', 'Q', 'K'].includes(rank) ? 10 : parseInt(rank, 10) });
    }
  }
  return deck;
};

const shuffle = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const formatCard = (card) => `${card.rank}${card.suit}`;

const getHandValue = (hand) => {
  let value = hand.reduce((sum, c) => sum + c.value, 0);
  let aces = hand.filter((c) => c.rank === 'A').length;
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
};

const isBlackjack = (hand) => hand.length === 2 && getHandValue(hand) === 21;

let blackjackState = {
  isActive: false,
  deck: [],
  playerHand: [],
  dealerHand: [],
  dealerHole: null,
  playerTurn: false,
  gameOver: false,
  result: null,
  wins: 0,
  losses: 0,
  ties: 0,
};

export const getBlackjackGameState = () => blackjackState;

const dealNewHand = () => {
  if (blackjackState.deck.length < 15) {
    blackjackState.deck = shuffle(createDeck());
  }
  blackjackState.playerHand = [];
  blackjackState.dealerHand = [];
  blackjackState.dealerHole = null;
  blackjackState.playerTurn = true;
  blackjackState.gameOver = false;
  blackjackState.result = null;

  blackjackState.playerHand.push(blackjackState.deck.pop());
  blackjackState.dealerHand.push(blackjackState.deck.pop());
  blackjackState.playerHand.push(blackjackState.deck.pop());
  blackjackState.dealerHole = blackjackState.deck.pop();
  blackjackState.dealerHand.push(blackjackState.dealerHole);
};

const resolveGame = (callback) => {
  blackjackState.gameOver = true;
  blackjackState.playerTurn = false;

  const playerValue = getHandValue(blackjackState.playerHand);
  const dealerValue = getHandValue(blackjackState.dealerHand);
  const playerBJ = isBlackjack(blackjackState.playerHand);
  const dealerBJ = isBlackjack(blackjackState.dealerHand);

  let result;
  if (playerBJ && dealerBJ) {
    result = 'tie';
  } else if (playerBJ) {
    result = 'win';
  } else if (dealerBJ) {
    result = 'loss';
  } else if (playerValue > 21) {
    result = 'loss';
  } else {
    while (getHandValue(blackjackState.dealerHand) < 17) {
      blackjackState.dealerHand.push(blackjackState.deck.pop());
    }
    const finalDealerValue = getHandValue(blackjackState.dealerHand);
    if (finalDealerValue > 21) {
      result = 'win';
    } else if (finalDealerValue > playerValue) {
      result = 'loss';
    } else if (finalDealerValue < playerValue) {
      result = 'win';
    } else {
      result = 'tie';
    }
  }

  blackjackState.result = result;
  if (result === 'win') blackjackState.wins++;
  else if (result === 'loss') blackjackState.losses++;
  else blackjackState.ties++;

  const dealerStr = blackjackState.dealerHand.map(formatCard).join(' ');
  const dealerVal = getHandValue(blackjackState.dealerHand);
  const playerStr = blackjackState.playerHand.map(formatCard).join(' ');
  const playerVal = getHandValue(blackjackState.playerHand);

  const lines = [
    '',
    `<span class="text-terminal-cyan">Dealer: ${dealerStr} (${dealerVal})</span>`,
    `<span class="text-terminal-text">You:   ${playerStr} (${playerVal})</span>`,
    '',
  ];

  if (result === 'win') {
    lines.push(`<span class="text-terminal-green">You win!</span>`);
  } else if (result === 'loss') {
    lines.push(`<span class="text-terminal-red">Dealer wins.</span>`);
  } else {
    lines.push(`<span class="text-terminal-yellow">Push (tie).</span>`);
  }

  lines.push(`<span class="text-terminal-dimmed">Score: ${blackjackState.wins}W / ${blackjackState.losses}L / ${blackjackState.ties}T</span>`);
  lines.push(`<span class="text-terminal-dimmed">Type 'deal' for another hand, 'quit' to exit.</span>`);

  callback.setLines((prev) => [...prev, ...lines]);
};

const handleHit = (callback) => {
  if (!blackjackState.playerTurn || blackjackState.gameOver) return;
  blackjackState.playerHand.push(blackjackState.deck.pop());
  const value = getHandValue(blackjackState.playerHand);
  const handStr = blackjackState.playerHand.map(formatCard).join(' ');
  callback.setLines((prev) => [
    ...prev,
    `<span class="text-terminal-text">You draw: ${handStr} (${value})</span>`,
  ]);
  if (value > 21) {
    callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Bust!</span>`]);
    blackjackState.result = 'loss';
    blackjackState.losses++;
    blackjackState.gameOver = true;
    blackjackState.playerTurn = false;
    callback.setLines((prev) => [
      ...prev,
      `<span class="text-terminal-dimmed">Score: ${blackjackState.wins}W / ${blackjackState.losses}L / ${blackjackState.ties}T</span>`,
      `<span class="text-terminal-dimmed">Type 'deal' for another hand, 'quit' to exit.</span>`,
    ]);
  }
};

const handleStand = (callback) => {
  if (!blackjackState.playerTurn || blackjackState.gameOver) return;
  resolveGame(callback);
};

const displayHands = (hideDealer = false) => {
  const playerStr = blackjackState.playerHand.map(formatCard).join(' ');
  const playerVal = getHandValue(blackjackState.playerHand);
  const dealerStr = hideDealer
    ? `${formatCard(blackjackState.dealerHand[0])} ??`
    : blackjackState.dealerHand.map(formatCard).join(' ');
  const dealerVal = hideDealer ? '' : ` (${getHandValue(blackjackState.dealerHand)})`;
  return {
    player: `${playerStr} (${playerVal})`,
    dealer: `${dealerStr}${dealerVal}`,
  };
};

export const handleBlackjackCommand = (command, callback) => {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;

  callback.setLines((prev) => [...prev, `<span class="text-terminal-dimmed">>${command}</span>`]);

  switch (cmd) {
    case 'hit':
    case 'h':
      handleHit(callback);
      break;
    case 'stand':
    case 's':
    case 'stay':
      handleStand(callback);
      break;
    case 'deal':
    case 'd':
      if (blackjackState.gameOver) {
        dealNewHand();
        const { player, dealer } = displayHands(true);
        callback.setLines((prev) => [
          ...prev,
          '',
          `<span class="text-terminal-cyan">Dealer: ${dealer}</span>`,
          `<span class="text-terminal-text">You:   ${player}</span>`,
          '',
          `<span class="text-terminal-yellow">Hit or stand?</span>`,
        ]);
      } else {
        callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Finish this hand first.</span>`]);
      }
      break;
    case 'score':
    case 'scores':
      callback.setLines((prev) => [
        ...prev,
        `<span class="text-terminal-cyan">Blackjack: ${blackjackState.wins}W / ${blackjackState.losses}L / ${blackjackState.ties}T</span>`,
      ]);
      break;
    case 'help':
      callback.setLines((prev) => [
        ...prev,
        `<span class="text-terminal-green font-bold">Blackjack commands:</span>`,
        ``,
        `<span class="text-terminal-cyan">hit</span> <span class="text-terminal-text">(h) - Draw a card</span>`,
        `<span class="text-terminal-cyan">stand</span> <span class="text-terminal-text">(s) - End your turn</span>`,
        `<span class="text-terminal-cyan">deal</span> <span class="text-terminal-text">(d) - New hand (after current)</span>`,
        `<span class="text-terminal-cyan">score</span> <span class="text-terminal-text">- View session record</span>`,
        `<span class="text-terminal-cyan">quit</span> <span class="text-terminal-text">(q) - Exit blackjack</span>`,
      ]);
      break;
    case 'quit':
    case 'q':
    case 'exit':
      blackjackState.isActive = false;
      callback.setLines((prev) => [
        ...prev,
        `<span class="text-terminal-green">Thanks for playing! Final score: ${blackjackState.wins}W / ${blackjackState.losses}L / ${blackjackState.ties}T</span>`,
      ]);
      break;
    default:
      callback.setLines((prev) => [...prev, `<span class="text-terminal-red">Unknown command. Type 'help' for options.</span>`]);
  }
};

export const startBlackjackGame = (callback) => {
  blackjackState = {
    isActive: true,
    deck: shuffle(createDeck()),
    playerHand: [],
    dealerHand: [],
    dealerHole: null,
    playerTurn: true,
    gameOver: false,
    result: null,
    wins: 0,
    losses: 0,
    ties: 0,
  };

  dealNewHand();
  const { player, dealer } = displayHands(true);

  const output = [
    `<span class="text-terminal-green font-bold">♠ ♥ BLACKJACK ♦ ♣</span>`,
    ``,
    `<span class="text-terminal-cyan">Dealer: ${dealer}</span>`,
    `<span class="text-terminal-text">You:   ${player}</span>`,
    ``,
    `<span class="text-terminal-yellow">Hit or stand?</span>`,
    `<span class="text-terminal-dimmed">Type 'help' for commands, 'quit' to exit.</span>`,
  ];

  callback.setLines((prev) => [...prev, ...output]);
};
