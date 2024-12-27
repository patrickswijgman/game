import { newCombatText } from "entities/combat/combat-text.js";
import { Entity } from "entity.js";
import { getItem } from "items.js";
import { getDelta, setCameraShakeIntensity } from "ridder";
import { Scene } from "scene.js";
import { addStats, getScalingValue, newStats, updateStats } from "stats.js";

export function doDamage(scene: Scene, self: Entity, target: Entity) {
  const totalStats = newStats(self.stats);

  let bonusDamage = 0;

  if (self.weaponId) {
    const weapon = getItem(self.weaponId);
    addStats(totalStats, weapon.stats);
    bonusDamage += getScalingValue(totalStats, weapon.stats);
  }

  const damage = totalStats.damage + bonusDamage;

  target.stats.health -= damage;
  target.isFlashing = true;
  updateStats(target.stats);

  newCombatText(scene, target.pos.x, target.pos.y - target.height - 10, damage.toString());

  setCameraShakeIntensity(1);
}

export function generateStamina(e: Entity) {
  e.stats.stamina += e.stats.staminaRegen * getDelta();
  updateStats(e.stats);
}
