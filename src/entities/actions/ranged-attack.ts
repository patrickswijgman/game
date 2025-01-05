import { destroyIfCasterIsInvalid } from "actions.js";
import { newArrow } from "entities/actions/arrow.js";
import { Entity, newEntity, resetState, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, copyVector, getAngle, normalizeVector, scaleVector, subtractVector, tickTimer, tween } from "ridder";
import { destroyEntity, getEntity, getPlayer, Scene } from "scene.js";

export function newRangedAttack(scene: Scene, caster: Entity) {
  const x = caster.center.x;
  const y = caster.center.y;
  const weapon = getItem(caster.weaponId);
  const player = getPlayer(scene);

  const e = newEntity(scene, "ranged_attack", x, y);

  setSprites(e, weapon.spriteId, weapon.pivot.x, weapon.pivot.y);

  e.stats = caster.stats;
  e.weaponId = caster.weaponId;
  e.parentId = caster.id;
  e.stateNextId = "windup";

  if (caster.isEnemy) {
    e.targetId = player.id;
  } else {
    copyVector(e.target, scene.camera.mousePosition);
  }

  return e;
}

export function updateRangedAttack(e: Entity, scene: Scene) {
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
  const weapon = getItem(e.weaponId);

  switch (state) {
    case "windup":
      {
        aim(e, scene);

        if (tickTimer(e.stateTimer, weapon.attackDuration.windup)) {
          return "release";
        }
      }
      break;

    case "release":
      {
        const completed = tickTimer(e.tweenTimer, weapon.attackDuration.release);
        const shootDuration = weapon.attackDuration.release / 2;

        e.tweenScale.x = tween(1, 1.5, shootDuration, "easeInOutSine", e.tweenTimer.elapsed);
        e.tweenScale.y = tween(1, 1.5, shootDuration, "easeInOutSine", e.tweenTimer.elapsed);

        if (tickTimer(e.stateTimer, shootDuration)) {
          const target = getEntity(scene, e.targetId);

          if (target) {
            newArrow(scene, e, target.center);
          } else {
            newArrow(scene, e, e.target);
          }
        }

        if (completed) {
          return "recovery";
        }
      }
      break;

    case "recovery":
      {
        if (tickTimer(e.stateTimer, weapon.attackDuration.recovery)) {
          const caster = getEntity(scene, e.parentId);
          resetState(caster);
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function onStateExit() {}

function aim(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);

  if (e.targetId) {
    const target = getEntity(scene, e.targetId);
    e.target = target.center;
  }

  copyVector(e.direction, e.target);
  subtractVector(e.direction, caster.center);
  normalizeVector(e.direction);
  scaleVector(e.direction, caster.radius);

  copyVector(e.position, caster.center);
  addVector(e.position, e.direction);

  const angle = getAngle(e.position.x, e.position.y, e.target.x, e.target.y);
  const isFlipped = e.target.x < e.position.x;

  e.angle = angle;
  e.isMirrored = isFlipped;
  caster.isFlipped = isFlipped;
}
