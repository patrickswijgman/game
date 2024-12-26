import { destroyActionEntity, doDamageToTargets } from "actions.js";
import { Entity, newEntity, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, angleVector, copyPolygon, copyVector, getAngle, getMousePosition, normalizeVector, tickTimer, tween } from "ridder";
import { EasingDictionary } from "ridder/lib/easings.js";
import { getEntity, Scene } from "scene.js";

export function newMeleeAttack(scene: Scene, caster: Entity) {
  const weapon = getItem(caster.weaponId);
  const mouse = getMousePosition(true);

  const x = caster.pos.x + caster.centerOffset.x;
  const y = caster.pos.y + caster.centerOffset.y;

  const e = newEntity(scene, x, y);
  e.type = "melee_attack";
  e.spriteId = weapon.spriteId;
  e.pivot = weapon.pivot;
  e.stats = weapon.stats;
  e.weaponId = caster.weaponId;
  e.parentId = caster.id;
  e.stateNextId = "windup";

  copyPolygon(e.hitbox, weapon.hitbox);
  copyVector(e.target, mouse);
  updatePosition(e);

  return e;
}

export function updateMeleeAttack(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);

  if (caster.isDestroyed) {
    destroyActionEntity(e, scene);
    return;
  }

  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
  updatePosition(e);
}

function updatePosition(e: Entity) {
  const angle = getAngle(e.start.x, e.start.y, e.target.x, e.target.y);
  angleVector(e.pos, angle);
  normalizeVector(e.pos);
  addVector(e.pos, e.start);
  e.angle = angle;
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "windup":
      {
        if (swing(e, e.stats.windupDuration, -40, -120, "easeOutCirc")) {
          return "release";
        }
      }
      break;
    case "release":
      {
        doDamageToTargets(e, scene);
        if (swing(e, e.stats.releaseDuration, -120, 120, "linear")) {
          return "recovery";
        }
      }
      break;
    case "recovery":
      {
        if (swing(e, e.stats.recoveryDuration, 120, 40, "easeOutCirc")) {
          destroyActionEntity(e, scene);
        }
      }
      break;
  }
}

function swing(e: Entity, duration: number, from: number, to: number, easing: keyof EasingDictionary) {
  tickTimer(e.tweenTimer, duration);
  e.tweenAngle = tween(from, to, duration, easing, e.tweenTimer.elapsed);
  return tickTimer(e.stateTimer, duration);
}

function onStateExit() {}
