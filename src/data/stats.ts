export type Stats = {
  health: number;
  healthMax: number;

  mana: number;
  manaMax: number;
  manaCost: number;

  damage: number;
  damageScaling: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    mana: 0,
    manaMax: 0,
    manaCost: 0,

    damage: 0,
    damageScaling: 0,

    ...stats,
  };
}
