import { Entity } from "data/entity.js";
import { getSession } from "data/game.js";
import { getItem } from "data/items.js";
import { addStats, getScalingValue, newStats, updateStats } from "data/stats.js";

export function doDamage(self: Entity, target: Entity) {
  const totalStats = newStats(self.stats);

  let bonus = 0;

  if (self.type === "player") {
    const session = getSession();
    const weapon = getItem(session.weaponId);
    addStats(totalStats, weapon.stats);
    bonus += getScalingValue(totalStats, weapon.stats);
  }

  const damage = totalStats.damage + bonus;

  target.stats.health -= damage;

  updateStats(target.stats);
}
