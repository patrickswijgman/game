import { clamp } from "ridder";

export type Stats = {
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
  strengthScaling: number;
  dexterity: number;
  dexterityScaling: number;
  intelligence: number;
  intelligenceScaling: number;
  movementSpeed: number;
  cooldown: number;
  cooldownReduction: number;
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
    mana: 0,
    manaMax: 0,
    manaCost: 0,
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
  a.strength += b.strength;
  a.dexterity += b.dexterity;
  a.intelligence += b.intelligence;
  a.movementSpeed += b.movementSpeed;
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
