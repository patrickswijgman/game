import { onDodgeEnter, onDodgeExit, onDodgeUpdate } from "actions/dodge.js";
import { doDamage } from "combat.js";
import { newMeleeAttack } from "entities/actions/melee-attack.js";
import { Entity, resetState } from "entity.js";
import { doPolygonsIntersect } from "ridder";
import { destroyEntity, getEntity, Scene } from "scene.js";
import { Stats, updateStats } from "stats.js";

export function onActionEnter(e: Entity, scene: Scene) {
  const player = getEntity(scene, scene.playerId);
  const target = e.isPlayer ? scene.camera.mousePosition : player.position;

  switch (e.actionId) {
    case "melee_attack":
      newMeleeAttack(scene, e, target);
      break;

    case "dodge":
      onDodgeEnter(e);
      break;
  }
}

export function onActionUpdate(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "dodge":
      onDodgeUpdate(e);
      break;
  }
}

export function onActionExit(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "dodge":
      onDodgeExit(e);
      break;
  }
}

export function doDamageToTargets(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);
  const targets = e.isPlayer || caster.isPlayer ? scene.enemies : scene.allies;

  for (const id of targets) {
    if (id === e.id || id === e.parentId) {
      continue;
    }

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

  return true;
}

export function spendAction(stats: Stats, requirements: Stats) {
  stats.health -= requirements.healthCost;
  stats.stamina -= requirements.staminaCost;
  updateStats(stats);
}

export function destroyIfCasterIsInvalid(e: Entity, scene: Scene, caster: Entity) {
  if (caster.conditions.isStaggered) {
    destroyEntity(scene, e);
    return true;
  }

  if (caster.isDestroyed) {
    resetState(caster);
    destroyEntity(scene, e);
    return true;
  }

  return false;
}
