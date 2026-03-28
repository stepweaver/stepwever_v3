import { zorkSession } from './zorkBridge.js';

let adapterPromise = null;

function loadAdapter() {
  if (!adapterPromise) {
    adapterPromise = import('../games/zork/adapters/terminalAdapter');
  }
  return adapterPromise;
}

export function getZorkGameState() {
  return { isActive: zorkSession.isActive };
}

export async function startZorkGame(callback) {
  const m = await loadAdapter();
  m.startZorkGame(callback, zorkSession);
}

export async function handleZorkCommand(command, callback) {
  const m = await loadAdapter();
  m.handleZorkCommand(command, callback, zorkSession);
}
