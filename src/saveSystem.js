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
  worldState.unlockedDoors ??= {};
  worldState.health ??= 100;
  worldState.magazineAmmo ??= 6;
  worldState.reserveAmmo ??= 0;
  
  // --- 🔴 REFUERZO DE OBJETIVOS POR DEFECTO ---
  worldState.objectives ??= {};
  worldState.objectives.generatorOn ??= false;
  worldState.objectives.switchPuzzleSolved ??= false;
  worldState.objectives.pumpSolved ??= false; // 💡 Evita el undefined en la puerta inundada

  // --- ⚡ NUEVAS VARIABLES PARA EL SECTOR ELÉCTRICO ---
  worldState.objectives.phase1On ??= false;
  worldState.objectives.phase2On ??= false;
  worldState.objectives.phase3On ??= false;
  worldState.objectives.coreOverloaded ??= false;

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