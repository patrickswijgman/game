import { destroyActionEntity } from "actions.js";
import { Entity, newEntity, updateState } from "entity.js";
import { getItem } from "items.js";
import { addVector, angleVector, copyPolygon, copyVector, getAngle, getMousePosition, normalizeVector, setPolygonAngle, tickTimer, tween } from "ridder";
import { Scene } from "scene.js";

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
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
  updatePosition(e);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "windup":
      {
        tickTimer(e.tweenTimer, e.stats.windupDuration);
        e.tweenAngle = tween(-40, -120, e.stats.windupDuration, "easeOutCirc", e.tweenTimer.elapsed);

        if (tickTimer(e.stateTimer, e.stats.windupDuration)) {
          return "release";
        }
      }
      break;

    case "release":
      {
        tickTimer(e.tweenTimer, e.stats.releaseDuration);
        e.tweenAngle = tween(-120, 120, e.stats.releaseDuration, "linear", e.tweenTimer.elapsed);

        if (tickTimer(e.stateTimer, e.stats.releaseDuration)) {
          return "recovery";
        }
      }
      break;

    case "recovery":
      {
        tickTimer(e.tweenTimer, e.stats.recoveryDuration);
        e.tweenAngle = tween(120, 40, e.stats.recoveryDuration, "easeOutCirc", e.tweenTimer.elapsed);

        if (tickTimer(e.stateTimer, e.stats.recoveryDuration)) {
          destroyActionEntity(e, scene);
        }
      }
      break;
  }
}

function onStateExit() {}

function updatePosition(e: Entity) {
  const angle = getAngle(e.start.x, e.start.y, e.target.x, e.target.y);
  angleVector(e.pos, angle);
  normalizeVector(e.pos);
  addVector(e.pos, e.start);
  e.angle = angle + 90;
  setPolygonAngle(e.hitbox, angle + e.tweenAngle);
}
