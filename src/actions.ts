import { doDamage } from "combat.js";
import { updateDodge } from "entities/actions/dodge.js";
import { newMeleeAttack } from "entities/actions/melee-attack.js";
import { Entity } from "entity.js";
import { doPolygonsIntersect } from "ridder";
import { getEntity, Scene } from "scene.js";
import { Stats, updateStats } from "stats.js";

export function onActionEnter(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "melee_attack":
      newMeleeAttack(scene, e);
      break;
  }
}

export function onActionUpdate(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "dodge":
      updateDodge(e);
      break;
  }
}

export function onActionExit(e: Entity, scene: Scene) {}

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
