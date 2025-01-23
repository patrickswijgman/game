import { Stats } from "@/data/stats.js";
import { clamp } from "ridder";

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

export function getStatsTotal(key: keyof Stats, a: Stats, b: Stats) {
  return a[key] + b[key];
}
