import { newMeleeAttack } from "entities/melee-attack.js";
import { Entity } from "entity.js";
import { Scene } from "scene.js";
import { Stats, updateStats } from "stats.js";

export function onAction(e: Entity, scene: Scene) {
  switch (e.actionId) {
    case "melee_attack":
      newMeleeAttack(scene, e.pos.x, e.pos.y, e.weaponId);
      break;
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
