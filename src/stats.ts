import { clamp } from "ridder";

type StatsBase = {
  health: number;
  healthMax: number;
  healthCost: number;
  stamina: number;
  staminaMax: number;
  staminaRegen: number;
  staminaCost: number;
  mana: number;
  manaMax: number;
  manaCost: number;
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

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 1,
    healthMax: 1,
    healthCost: 0,
    stamina: 0,
    staminaMax: 0,
    staminaRegen: 0,
    staminaCost: 0,
    mana: 0,
    manaMax: 0,
    manaCost: 0,
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
    ...stats,
  };
}

export function updateStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
  stats.stamina = clamp(stats.stamina, 0, stats.staminaMax);
  stats.mana = clamp(stats.mana, 0, stats.manaMax);
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
