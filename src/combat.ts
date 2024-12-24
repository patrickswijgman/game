import { Entity } from "entity.js";
import { getSession } from "game.js";
import { getItem } from "items.js";
import { addStats, getScalingValue, newStats, updateStats } from "stats.js";

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
