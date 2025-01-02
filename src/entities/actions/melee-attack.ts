import { destroyIfCasterIsInvalid, doDamageToTargets } from "actions.js";
import { Entity, newEntity, resetState, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, angleVector, copyPolygon, copyVector, getAngle, normalizeVector, tickTimer, tween, Vector } from "ridder";
import { EasingDictionary } from "ridder/lib/easings.js";
import { destroyEntity, getEntity, Scene } from "scene.js";

export function newMeleeAttack(scene: Scene, caster: Entity, target: Vector) {
  const x = caster.position.x + caster.centerOffset.x;
  const y = caster.position.y + caster.centerOffset.y;

  const e = newEntity(scene, "melee_attack", x, y);
  const weapon = getItem(caster.weaponId);

  e.spriteId = weapon.spriteId;
  e.pivot = weapon.pivot;
  e.weaponId = caster.weaponId;
  e.parentId = caster.id;
  e.stateNextId = "windup";

  copyPolygon(e.hitbox, weapon.hitbox);
  copyVector(e.target, target);

  return e;
}

export function updateMeleeAttack(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);

  if (destroyIfCasterIsInvalid(e, scene, caster)) {
    return;
  }

  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity, scene: Scene, state: string) {
  const caster = getEntity(scene, e.parentId);

  switch (state) {
    case "release":
      {
        caster.conditions.isHyperArmor = true;
      }
      break;
  }
}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  const weapon = getItem(e.weaponId);

  switch (state) {
    case "windup":
      {
        if (swing(e, weapon.attackDuration.windup, weapon.attackArc.start, weapon.attackArc.windup, "easeOutCirc")) {
          return "release";
        }
      }
      break;

    case "release":
      {
        const completed = swing(e, weapon.attackDuration.release, weapon.attackArc.windup, weapon.attackArc.release, "linear");
        doDamageToTargets(e, scene);
        if (completed) {
          return "recovery";
        }
      }
      break;

    case "recovery":
      {
        if (swing(e, weapon.attackDuration.recovery, weapon.attackArc.release, weapon.attackArc.recovery, "easeOutCirc")) {
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

  normalizeVector(e.position);
  angleVector(e.position, angle);
  addVector(e.position, e.start);
  e.angle = angle;

  const completed = tickTimer(e.tweenTimer, duration);
  e.tweenAngle = tween(from, to, duration, easing, e.tweenTimer.elapsed);

  return completed;
}

function onStateExit(e: Entity, scene: Scene, state: string) {
  const caster = getEntity(scene, e.parentId);

  switch (state) {
    case "recovery":
      {
        caster.conditions.isHyperArmor = false;
      }
      break;
  }
}
