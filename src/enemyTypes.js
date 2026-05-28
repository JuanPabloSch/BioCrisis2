export const ENEMY_TYPES = {
  zombie: {
    color: 0x9b2f2f,
    hitColor: 0xd86a5f,
    strokeColor: 0x1b0c0c,
    radius: 18,
  },
  runner: {
    color: 0x22e6c7,
    hitColor: 0xb4fff4,
    strokeColor: 0x08322f,
    radius: 17,
  },
  sleeper: {
    color: 0x4f5146,
    hitColor: 0xc8c1a8,
    strokeColor: 0x161812,
    radius: 18,
  },
  tank: {
    color: 0x6c3a8f,
    hitColor: 0xc08be8,
    strokeColor: 0x21102d,
    radius: 25,
  },
};

export function getEnemyType(enemy) {
  return ENEMY_TYPES[enemy.type] ?? ENEMY_TYPES.zombie;
}
