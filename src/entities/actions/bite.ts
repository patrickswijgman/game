import { destroyIfCasterIsInvalid, doDamageToTargets } from "actions.js";
import { Entity, newEntity, resetState, setSprites, updateState } from "entity.js";
import { polygonFromRect, rect, tickTimer, tween } from "ridder";
import { destroyEntity, getEntity, getPlayer, Scene } from "scene.js";

export function newBite(scene: Scene, caster: Entity) {
  const target = getPlayer(scene);
  const x = target.center.x;
  const y = target.center.y;

  const e = newEntity(scene, "bite", x, y);

  setSprites(e, "bite", 16, 16);

  e.hitbox = polygonFromRect(x, y, rect(-4, -6, 8, 12));
  e.parentId = caster.id;
  e.depth = target.height;
  e.stateNextId = "windup";
  e.isOutlineDangerVisible = caster.isEnemy;

  return e;
}

export function updateBite(e: Entity, scene: Scene) {
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
  switch (state) {
    case "windup":
      {
        tickTimer(e.tweenTimer, 200);
        e.tweenScale.y = tween(0.5, 1, 200, "easeInOutSine", e.tweenTimer.elapsed);

        if (tickTimer(e.stateTimer, 250)) {
          return "release";
        }
      }
      break;

    case "release":
      {
        doDamageToTargets(e, scene);
        e.isVisible = false;
        return "recovery";
      }
      break;

    case "recovery":
      {
        if (tickTimer(e.stateTimer, 500)) {
          const caster = getEntity(scene, e.parentId);
          resetState(caster);
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function onStateExit() {}
