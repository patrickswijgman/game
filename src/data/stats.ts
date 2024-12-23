import { clamp } from "ridder";

type StatsBase = {
  health: number;
  healthMax: number;
  stamina: number;
  staminaMax: number;
  staminaRegen: number;
  damage: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  movementSpeed: number;
  windupDuration: number;
  releaseDuration: number;
  recoveryDuration: number;
};

type StatsScaling = {
  damageScalingStat: keyof StatsBase | None;
  damageScalingFactor: number;
};

export type Stats = StatsBase & StatsScaling;

export function newStats(options: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,
    stamina: 0,
    staminaMax: 0,
    staminaRegen: 0,
    damage: 0,
    damageScalingStat: "",
    damageScalingFactor: 0,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    movementSpeed: 0,
    windupDuration: 0,
    releaseDuration: 0,
    recoveryDuration: 0,
    ...options,
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

export function getScalingValue(stats: Stats, scaling: Stats) {
  if (scaling.damageScalingStat) {
    return Math.ceil(stats[scaling.damageScalingStat] * scaling.damageScalingFactor);
  }

  return 0;
}
