import { Stats, addStats, newStats, updateStats } from "data/stats.js";

export function doDamage(self: Stats, target: Stats, weapon: Stats) {
  const totalStats = newStats(self);
  addStats(totalStats, weapon);

  let bonus = 0;

  if (weapon.damageScalingStat) {
    bonus += Math.ceil(self[weapon.damageScalingStat] * weapon.damageScalingFactor);
  }

  const damage = totalStats.damage + bonus;

  target.health -= damage;

  updateStats(target);
}
