import { newCombatText } from "entities/combat/text.js";
import { newExperienceOrb } from "entities/xp-orb.js";
import { Entity } from "entity.js";
import { getItem } from "items.js";
import { getDelta, random } from "ridder";
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
  const duration = totalStats.staggerDuration;

  target.stats.health -= damage;
  updateStats(target.stats);

  target.isFlashing = true;
  target.flashDuration = duration;

  if (!target.conditions.isHyperArmor) {
    target.conditions.isStaggered = true;
    target.conditions.staggerDuration = duration;
  }

  newCombatText(scene, target.position.x, target.position.y - target.height - 10, damage.toString());

  if (target.isEnemy && target.stats.health === 0) {
    for (let i = 0; i < target.stats.experience; i += 5) {
      newExperienceOrb(scene, target.position.x + random(-8, 8), target.position.y + random(-8, 8), 5);
    }
  }
}

export function generateStamina(e: Entity) {
  e.stats.stamina += e.stats.staminaRegen * getDelta();
  updateStats(e.stats);
}
