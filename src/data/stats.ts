export type Stats = {
  health: number;
  healthMax: number;

  damage: number;
  damageScaling: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    damage: 0,
    damageScaling: 0,

    ...stats,
  };
}
