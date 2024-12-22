import { Stats, newStats, addStats, updateStats } from "stats.js";

export function doDamage(self: Stats, target: Stats, bonus: Array<Stats>) {
  const totalStats = newStats(self);

  for (const stats of bonus) {
    addStats(totalStats, stats);
  }

  target.health -= totalStats.damage * totalStats.damageScaling;

  updateStats(target);
}
