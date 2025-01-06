import { newCombatText } from "entities/combat/text.js";
import { newExperienceOrb } from "entities/xp-orb.js";
import { Entity, flash } from "entity.js";
import { getDelta, random } from "ridder";
import { Scene } from "scene.js";
import { clampStats } from "stats.js";

export function doDamage(scene: Scene, caster: Entity, target: Entity) {
  if (target.sheet.conditions.isInvulnerable) {
    return;
  }

  const damage = Math.max(1, caster.sheet.stats.damage);

  target.sheet.stats.health -= damage;
  target.sheet.stats.stun += caster.sheet.stats.stunDamage;
  clampStats(target.sheet.stats);

  if (target.sheet.stats.stun === target.sheet.stats.stunMax) {
    target.sheet.conditions.isStunned = true;
    target.sheet.conditions.stunDuration = 500;
    target.sheet.stats.stun = 0;
    flash(target, 500);
  } else {
    flash(target, 100);
  }

  newCombatText(scene, target.position.x, target.position.y - target.height - 10, damage.toString());

  if (target.isEnemy && target.sheet.stats.health === 0) {
    caster.sheet.stats.experience += target.sheet.stats.experience;

    for (let i = 0; i < target.sheet.stats.experience; i += 5) {
      newExperienceOrb(scene, target.position.x + random(-8, 8), target.position.y + random(-8, 8));
    }
  }
}

export function generateStamina(e: Entity) {
  e.sheet.stats.stamina += e.sheet.stats.staminaRegen * getDelta();
  clampStats(e.sheet.stats);
}

export function depleteStun(e: Entity) {
  e.sheet.stats.stun -= 0.2 * getDelta();
  clampStats(e.sheet.stats);
}
