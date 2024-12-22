import { clamp } from "ridder";

type StatsBase = {
  health: number;
  healthMax: number;

  stamina: number;
  staminaMax: number;
  staminaRegen: number;

  damage: number;
  damageScalingFactor: number;

  strength: number;
  dexterity: number;
  intelligence: number;

  movementSpeed: number;
};

export type Stats = StatsBase & {
  damageScalingStat: keyof StatsBase;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,

    stamina: 0,
    staminaMax: 0,
    staminaRegen: 0,

    damage: 0,
    damageScalingStat: "strength",
    damageScalingFactor: 0,

    strength: 0,
    dexterity: 0,
    intelligence: 0,

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
    const value = b[key];

    if (typeof value === "number") {
      a[key] += value;
    }
  }
}
