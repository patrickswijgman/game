import { newCombatText } from "entities/combat/text.js";
import { newExperienceOrb } from "entities/xp-orb.js";
import { Entity, flash } from "entity.js";
import { getItem } from "items.js";
import { getDelta, random } from "ridder";
import { Scene } from "scene.js";
import { addStats, getScalingValue, newStats, updateStats } from "stats.js";

export function doDamage(scene: Scene, caster: Entity, target: Entity) {
  if (target.conditions.isInvulnerable) {
    return;
  }

  const totalStats = newStats(caster.stats);

  let bonusDamage = 0;

  if (caster.weaponId) {
    const weapon = getItem(caster.weaponId);
    addStats(totalStats, weapon.stats);
    bonusDamage += getScalingValue(totalStats, weapon.stats);
  }

  const damage = Math.max(1, totalStats.damage + bonusDamage);

  target.stats.health -= damage;
  target.stats.stun += totalStats.stunDamage;
  updateStats(target.stats);

  if (target.stats.stun === target.stats.stunMax) {
    target.conditions.isStunned = true;
    target.conditions.stunDuration = 500;
    target.stats.stun = 0;
    flash(target, 500);
  } else {
    flash(target, 100);
  }

  newCombatText(scene, target.position.x, target.position.y - target.height - 10, damage.toString());

  if (target.isEnemy && target.stats.health === 0) {
    caster.stats.experience += target.stats.experience;

    for (let i = 0; i < target.stats.experience; i += 5) {
      newExperienceOrb(scene, target.position.x + random(-8, 8), target.position.y + random(-8, 8));
    }
  }
}

export function generateStamina(e: Entity) {
  e.stats.stamina += e.stats.staminaRegen * getDelta();
  updateStats(e.stats);
}

export function depleteStun(e: Entity) {
  e.stats.stun -= 0.2 * getDelta();
  updateStats(e.stats);
}
