import { Stats, addStats, newStats, updateStats } from "stats.js";

export function doDamage(self: Stats, target: Stats, weapon: Stats) {
  const totalStats = newStats(self);
  addStats(totalStats, weapon);

  target.health -= Math.ceil(totalStats.damage + self[weapon.damageScalingStat] * weapon.damageScalingFactor);

  updateStats(target);
}
