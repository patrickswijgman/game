import { doDamage } from "combat.js";
import { newMeleeAttack } from "entities/actions/melee-attack.js";
import { Entity } from "entity.js";
import { doPolygonsIntersect } from "ridder";
import { destroyEntity, getEntity, Scene } from "scene.js";
import { Stats, updateStats } from "stats.js";

export function onAction(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "melee_attack":
      newMeleeAttack(scene, e);
      break;
  }
}

export function doDamageToTargets(e: Entity, scene: Scene) {
  for (const id of scene.active) {
    if (id === e.id || id === e.parentId) {
      continue;
    }

    const caster = getEntity(scene, e.parentId);
    const target = getEntity(scene, id);

    if (!target.isDestroyed && !e.blacklist.includes(id) && doPolygonsIntersect(e.hitbox, target.hitbox)) {
      doDamage(scene, caster, target);
      e.blacklist.push(target.id);
    }
  }
}

export function isActionValid(stats: Stats, requiremens: Stats) {
  if (stats.health < requiremens.healthCost + 1) {
    return false;
  }
  if (stats.stamina < requiremens.staminaCost) {
    return false;
  }
  if (stats.mana < requiremens.manaCost) {
    return false;
  }

  return true;
}

export function spendAction(stats: Stats, requirements: Stats) {
  stats.health -= requirements.healthCost;
  stats.stamina -= requirements.staminaCost;
  stats.mana -= requirements.manaCost;
  updateStats(stats);
}

export function destroyActionEntity(e: Entity, scene: Scene) {
  destroyEntity(scene, e);

  const caster = getEntity(scene, e.parentId);
  caster.stateNextId = caster.stateIdleId;
}
