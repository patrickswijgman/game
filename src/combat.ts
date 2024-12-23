import { Entity } from "entity.js";
import { getItem } from "items.js";
import { addStats, getScalingValue, newStats, updateStats } from "stats.js";

export function doDamage(self: Entity, target: Entity) {
  const totalStats = newStats(self.stats);

  let bonusDamage = 0;

  if (self.weaponId) {
    const weapon = getItem(self.weaponId);
    addStats(totalStats, weapon.stats);
    bonusDamage += getScalingValue(totalStats, weapon.stats);
  }

  const damage = totalStats.damage + bonusDamage;

  target.stats.health -= damage;

  updateStats(target.stats);
}
