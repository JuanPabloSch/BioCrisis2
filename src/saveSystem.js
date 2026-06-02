const SAVE_KEY = "secuela-save";

export function createInitialWorldState() {
  return normalizeWorldState({
    health: 100,
    weaponId: "pistol",
    weaponAmmo: {
      pistol: { magazine: 6, reserve: 0 },
      shotgun: { magazine: 2, reserve: 0 },
      rocket: { magazine: 1, reserve: 0 },
    },
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
  worldState.weaponId ??= "pistol";
  worldState.weaponAmmo ??= {};
  worldState.weaponAmmo.pistol ??= { magazine: worldState.magazineAmmo ?? 6, reserve: worldState.reserveAmmo ?? 0 };
  worldState.weaponAmmo.shotgun ??= { magazine: 2, reserve: 0 };
  worldState.weaponAmmo.rocket ??= { magazine: 1, reserve: 0 };
  worldState.weaponAmmo.pistol.magazine ??= 6;
  worldState.weaponAmmo.pistol.reserve ??= 0;
  worldState.weaponAmmo.shotgun.magazine ??= 2;
  worldState.weaponAmmo.shotgun.reserve ??= 0;
  worldState.weaponAmmo.rocket.magazine ??= 1;
  worldState.weaponAmmo.rocket.reserve ??= 0;
  worldState.magazineAmmo = worldState.weaponAmmo.pistol.magazine;
  worldState.reserveAmmo = worldState.weaponAmmo.pistol.reserve;
  
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
