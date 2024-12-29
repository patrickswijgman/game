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
  movementSpeed: number;
  cooldown: number;
  cooldownReduction: number;
};

type StatsAttributes = {
  strength: number;
  dexterity: number;
  intelligence: number;
};

type StatsScaling = {
  damageScalingStat: keyof StatsAttributes | None;
  damageScalingFactor: number;
};

export type Stats = StatsBase & StatsAttributes & StatsScaling;

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
    cooldown: 0,
    cooldownReduction: 0,
    ...stats,
  };
}

export function updateStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
  stats.stamina = clamp(stats.stamina, 0, stats.staminaMax);
  stats.mana = clamp(stats.mana, 0, stats.manaMax);
}

export function addStats(a: Stats, b: Stats) {
  a.damage += b.damage;
  a.movementSpeed += b.movementSpeed;
}

export function getScalingValue(stats: Stats, scaling: Stats) {
  if (scaling.damageScalingStat) {
    return Math.ceil(stats[scaling.damageScalingStat] * scaling.damageScalingFactor);
  }

  return 0;
}
