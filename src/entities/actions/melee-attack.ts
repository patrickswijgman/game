import { doDamageToTargets } from "actions.js";
import { Entity, newEntity, resetState, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, angleVector, copyPolygon, copyVector, getAngle, getMousePosition, normalizeVector, tickTimer, tween } from "ridder";
import { EasingDictionary } from "ridder/lib/easings.js";
import { destroyEntity, getEntity, Scene } from "scene.js";

export function newMeleeAttack(scene: Scene, caster: Entity) {
  const weapon = getItem(caster.weaponId);
  const mouse = getMousePosition(true);

  const x = caster.pos.x + caster.centerOffset.x;
  const y = caster.pos.y + caster.centerOffset.y;

  const e = newEntity(scene, "melee_attack", x, y);
  e.spriteId = weapon.spriteId;
  e.pivot = weapon.pivot;
  e.weaponId = caster.weaponId;
  e.parentId = caster.id;
  e.stateNextId = "windup";

  copyPolygon(e.hitbox, weapon.hitbox);
  copyVector(e.target, mouse);

  return e;
}

export function updateMeleeAttack(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);

  if (caster.isDestroyed) {
    resetState(caster);
    destroyEntity(scene, e);
    return;
  }

  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  const weapon = getItem(e.weaponId);
  const [start, windup, release, recovery] = weapon.arc;

  switch (state) {
    case "windup":
      {
        if (swing(e, weapon.stats.windupDuration, start, windup, "easeOutCirc")) {
          return "release";
        }
      }
      break;
    case "release":
      {
        const completed = swing(e, weapon.stats.releaseDuration, windup, release, "linear");
        doDamageToTargets(e, scene);
        if (completed) {
          return "recovery";
        }
      }
      break;
    case "recovery":
      {
        if (swing(e, weapon.stats.recoveryDuration, release, recovery, "easeOutCirc")) {
          const caster = getEntity(scene, e.parentId);
          resetState(caster);
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function swing(e: Entity, duration: number, from: number, to: number, easing: keyof EasingDictionary) {
  const angle = getAngle(e.start.x, e.start.y, e.target.x, e.target.y);

  angleVector(e.pos, angle);
  normalizeVector(e.pos);
  addVector(e.pos, e.start);
  e.angle = angle;

  const completed = tickTimer(e.tweenTimer, duration);
  e.tweenAngle = tween(from, to, duration, easing, e.tweenTimer.elapsed);

  return completed;
}

function onStateExit() {}
