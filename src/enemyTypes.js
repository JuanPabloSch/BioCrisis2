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
};

export function getEnemyType(enemy) {
  return ENEMY_TYPES[enemy.type] ?? ENEMY_TYPES.zombie;
}
