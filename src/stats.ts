import { clamp } from "ridder";

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
  range: number;
  constitution: number;
  endurance: number;
  strength: number;
  strengthScaling: number;
  dexterity: number;
  dexterityScaling: number;
  intelligence: number;
  intelligenceScaling: number;
  movementSpeed: number;
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
    range: 0,
    constitution: 0,
    endurance: 0,
    strength: 0,
    strengthScaling: 0,
    dexterity: 0,
    dexterityScaling: 0,
    intelligence: 0,
    intelligenceScaling: 0,
    movementSpeed: 0,
    experience: 0,
    ...stats,
  };
}

export function clampStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
  stats.stamina = clamp(stats.stamina, 0, stats.staminaMax);
  stats.stun = clamp(stats.stun, 0, stats.stunMax);
}

export function restoreStats(stats: Stats) {
  stats.health = stats.healthMax;
  stats.stamina = stats.staminaMax;
  stats.stun = 0;
}

export function addStats(a: Stats, b: Stats) {
  for (const key in a) {
    a[key] += b[key];
  }
}

export function copyStats(a: Stats, b: Stats) {
  for (const key in a) {
    a[key] = b[key];
  }
}

export function resetStats(stats: Stats) {
  for (const key in stats) {
    stats[key] = 0;
  }
}

export function addDamageScalingToStats(stats: Stats, scaling: Stats) {
  stats.damage += Math.ceil(stats.strength * scaling.strengthScaling);
  stats.damage += Math.ceil(stats.dexterity * scaling.dexterityScaling);
  stats.damage += Math.ceil(stats.intelligence * scaling.intelligenceScaling);
}
