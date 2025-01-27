export type Stats = {
  health: number;
  healthMax: number;

  movementSpeed: number;

  damage: number;
  damageScaling: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    movementSpeed: 0,

    damage: 0,
    damageScaling: 0,

    ...stats,
  };
}
