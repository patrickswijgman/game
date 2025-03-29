import { clamp } from "ridder";

export type Stats = {
  level: number;
  experience: number;
  experienceMax: number;
  health: number;
  healthMax: number;
  damage: number;
  critChance: number;
  critDamage: number;
  attackRange: number;
  pickupRange: number;
  movementSpeed: number;
};

export function newStats(stats: Partial<Stats> = {}): Stats {
  return {
    level: 0,
    experience: 0,
    experienceMax: 0,
    health: 0,
    healthMax: 0,
    damage: 0,
    critChance: 0,
    critDamage: 0,
    attackRange: 0,
    pickupRange: 0,
    movementSpeed: 0,
    ...stats,
  };
}

export function clampStats(stats: Stats) {
  stats.health = clamp(stats.health, 0, stats.healthMax);
}

export function addStats(a: Stats, b: Stats) {
  for (const key in b) {
    a[key] += b[key];
  }
}

export function copyStats(a: Stats, b: Stats) {
  for (const key in b) {
    a[key] = b[key];
  }
}
