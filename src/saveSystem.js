const SAVE_KEY = "secuela-save";

export function createInitialWorldState() {
  return normalizeWorldState({
    health: 100,
    magazineAmmo: 6,
    reserveAmmo: 0,
    collectedItems: {},
    enemies: {},
    inventory: [],
    objectives: {},
    unlockedDoors: {},
  });
}

export function normalizeWorldState(worldState = {}) {
  worldState.collectedItems ??= {};
  worldState.enemies ??= {};
  worldState.inventory ??= [];
  worldState.objectives ??= {};
  worldState.unlockedDoors ??= {};
  worldState.health ??= 100;
  worldState.magazineAmmo ??= 6;
  worldState.reserveAmmo ??= 0;
  return worldState;
}

export function saveGameData(saveData) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

export function loadGameData() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  if (!rawSave) return null;

  const saveData = JSON.parse(rawSave);
  saveData.worldState = normalizeWorldState(saveData.worldState);
  return saveData;
}
