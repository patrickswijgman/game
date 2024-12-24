import { Entity, newEntity, updateState } from "entity.js";
import { getItem } from "items.js";
import { tickTimer } from "ridder";
import { destroyEntity, Scene } from "scene.js";

export function newMeleeAttack(scene: Scene, x: number, y: number, weaponId: string) {
  const weapon = getItem(weaponId);
  const e = newEntity(scene, x, y);
  e.type = "melee_attack";
  e.spriteId = weapon.spriteId;
  e.pivot = weapon.pivot;
  e.stats = weapon.stats;
  e.stateNextId = "windup";
  return e;
}

export function updateMeleeAttack(e: Entity, scene: Scene) {
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "windup":
      {
        if (tickTimer(e.stateTimer, e.stats.windupDuration)) {
          e.stateNextId = "release";
        }
      }
      break;
    case "release":
      {
        if (tickTimer(e.stateTimer, e.stats.releaseDuration)) {
          e.stateNextId = "recovery";
        }
      }
      break;
    case "recovery":
      {
        if (tickTimer(e.stateTimer, e.stats.recoveryDuration)) {
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function onStateExit() {}
