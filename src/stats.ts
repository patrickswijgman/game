import { clamp } from "ridder";

export type Stats = {
  health: number;
  healthMax: number;

  stamina: number;
  staminaMax: number;
  staminaRegen: number;

  damage: number;
  damageScaling: number;

  movementSpeed: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    stamina: 0,
    staminaMax: 0,
    staminaRegen: 0,

    damage: 0,
    damageScaling: 0,

    movementSpeed: 0,

    ...stats,
  };
}

export function updateStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
  stats.stamina = clamp(stats.stamina, 0, stats.staminaMax);
}

export function addStats(a: Stats, b: Stats) {
  for (const key in b) {
    a[key] += b[key];
  }
}
