import { destroyIfCasterIsInvalid, doDamageToTargets } from "actions.js";
import { Entity, newEntity, resetState, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, angleVector, copyPolygon, copyVector, getAngle, normalizeVector, scaleVector, subtractVector, tickTimer, tween } from "ridder";
import { EasingDictionary } from "ridder/lib/easings.js";
import { destroyEntity, getEntity, getPlayer, Scene } from "scene.js";

export function newMeleeAttack(scene: Scene, caster: Entity) {
  const x = caster.center.x;
  const y = caster.center.y;
  const weapon = getItem(caster.sheet.weaponId);
  const player = getPlayer(scene);
  const target = caster.isEnemy ? player.center : scene.camera.mousePosition;

  const e = newEntity(scene, "melee_attack", x, y);

  setSprites(e, weapon.spriteId, weapon.pivot.x, weapon.pivot.y);

  e.sheet.stats = caster.sheet.stats;
  e.sheet.weaponId = caster.sheet.weaponId;
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
    case "recovery":
      caster.isOutlineDangerVisible = false;
      break;
  }
}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  const weapon = getItem(e.sheet.weaponId);

  switch (state) {
    case "windup":
      {
        if (swing(e, scene, weapon.attackDuration.windup, weapon.attackArc.start, weapon.attackArc.windup, "easeOutCirc")) {
          return "release";
        }
      }
      break;

    case "release":
      {
        const completed = swing(e, scene, weapon.attackDuration.release, weapon.attackArc.windup, weapon.attackArc.release, "linear");
        doDamageToTargets(e, scene);
        if (completed) {
          return "recovery";
        }
      }
      break;

    case "recovery":
      {
        if (swing(e, scene, weapon.attackDuration.recovery, weapon.attackArc.release, weapon.attackArc.recovery, "easeOutCirc")) {
          const caster = getEntity(scene, e.parentId);
          resetState(caster);
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function onStateExit() {}

function swing(e: Entity, scene: Scene, duration: number, from: number, to: number, easing: keyof EasingDictionary) {
  const caster = getEntity(scene, e.parentId);

  const completed = tickTimer(e.tweenTimer, duration);
  const tweenAngle = tween(from, to, duration, easing, e.tweenTimer.elapsed);
  const baseAngle = getAngle(caster.center.x, caster.center.y, e.target.x, e.target.y);
  const angle = baseAngle + tweenAngle;

  copyVector(e.direction, e.target);
  subtractVector(e.direction, caster.center);
  normalizeVector(e.direction);
  scaleVector(e.direction, caster.radius);
  angleVector(e.direction, angle);

  copyVector(e.position, caster.center);
  addVector(e.position, e.direction);

  e.angle = angle;

  return completed;
}
