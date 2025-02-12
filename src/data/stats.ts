export type Stats = {
  health: number;
  healthMax: number;

  mana: number;
  manaMax: number;
  manaCost: number;

  damage: number;
  armor: number;

  critChance: number;
  critDamage: number;

  movementSpeed: number;
  movementSpeedMax: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    mana: 0,
    manaMax: 0,
    manaCost: 0,

    damage: 0,
    armor: 0,

    critChance: 0,
    critDamage: 0,

    movementSpeed: 0,
    movementSpeedMax: 0,

    ...stats,
  };
}
