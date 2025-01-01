import { newCombatText } from "entities/combat/text.js";
import { Entity } from "entity.js";
import { getItem } from "items.js";
import { getDelta } from "ridder";
import { Scene } from "scene.js";
import { addStats, getScalingValue, newStats, updateStats } from "stats.js";

export function doDamage(scene: Scene, self: Entity, target: Entity) {
  if (target.conditions.isInvulnerable) {
    return;
  }

  const totalStats = newStats(self.stats);

  let bonusDamage = 0;

  if (self.weaponId) {
    const weapon = getItem(self.weaponId);
    addStats(totalStats, weapon.stats);
    bonusDamage += getScalingValue(totalStats, weapon.stats);
  }

  const damage = Math.max(1, totalStats.damage + bonusDamage);
  const stagger = 100;

  target.stats.health -= damage;
  target.conditions.isStaggered = true;
  target.conditions.staggerDuration = stagger;
  target.isFlashing = true;
  target.flashDuration = stagger;

  updateStats(target.stats);

  newCombatText(scene, target.position.x, target.position.y - target.height - 10, damage.toString());
}

export function generateStamina(e: Entity) {
  e.stats.stamina += e.stats.staminaRegen * getDelta();
  updateStats(e.stats);
}
