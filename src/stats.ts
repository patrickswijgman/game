import { clamp } from "ridder";

const CUM_STATS: Array<keyof Stats> = ["damage", "healthMax", "staminaMax", "stunMax", "stunDamage", "strength", "dexterity", "intelligence", "movementSpeed"];

export type Stats = {
  health: number;
  healthMax: number;
  healthCost: number;
  stamina: number;
  staminaMax: number;
  staminaRegen: number;
  staminaCost: number;
  stun: number;
  stunMax: number;
  stunDamage: number;
  damage: number;
  strength: number;
  strengthScaling: number;
  dexterity: number;
  dexterityScaling: number;
  intelligence: number;
  intelligenceScaling: number;
  movementSpeed: number;
  cooldown: number;
  cooldownReduction: number;
  experience: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    health: 0,
    healthMax: 0,
    healthCost: 0,
    stamina: 0,
    staminaMax: 0,
    staminaRegen: 0,
    staminaCost: 0,
    stun: 0,
    stunMax: 0,
    stunDamage: 0,
    damage: 0,
    strength: 0,
    strengthScaling: 0,
    dexterity: 0,
    dexterityScaling: 0,
    intelligence: 0,
    intelligenceScaling: 0,
    movementSpeed: 0,
    cooldown: 0,
    cooldownReduction: 0,
    experience: 0,
    ...stats,
  };
}

export function updateStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
  stats.stamina = clamp(stats.stamina, 0, stats.staminaMax);
  stats.stun = clamp(stats.stun, 0, stats.stunMax);
}

export function fillStats(stats: Stats) {
  stats.health = stats.healthMax;
  stats.stamina = stats.staminaMax;
}

export function addStats(a: Stats, b: Stats) {
  for (const key of CUM_STATS) {
    a[key] += b[key];
  }
}

export function getModifier(stats: Stats, key: keyof Stats) {
  return Math.floor((stats[key] - 10) / 2);
}

export function getScalingValue(stats: Stats, scaling: Stats) {
  let value = 0;
  value += Math.ceil(getModifier(stats, "strength") * scaling.strengthScaling);
  value += Math.ceil(getModifier(stats, "dexterity") * scaling.dexterityScaling);
  value += Math.ceil(getModifier(stats, "intelligence") * scaling.intelligenceScaling);
  return value;
}
