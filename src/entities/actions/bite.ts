import { destroyIfCasterIsInvalid, doDamageToTargets } from "actions.js";
import { Entity, newEntity, resetState, setSprites, updateState } from "entity.js";
import { getItem } from "items.js";
import { polygonFromRect, rect, tickTimer } from "ridder";
import { destroyEntity, getEntity, Scene } from "scene.js";

export function newBite(scene: Scene, caster: Entity, target: Entity) {
  const x = target.center.x;
  const y = target.center.y;

  const e = newEntity(scene, "bite", x, y);

  setSprites(e, "bite", 16, 16);

  e.hitbox = polygonFromRect(x, y, rect(-4, -6, 8, 12));
  e.parentId = caster.id;
  e.depth = target.height;
  e.stateNextId = "windup";

  return e;
}

export function updateBite(e: Entity, scene: Scene) {
  const caster = getEntity(scene, e.parentId);

  if (destroyIfCasterIsInvalid(e, scene, caster)) {
    return;
  }

  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  const weapon = getItem(e.weaponId);

  switch (state) {
    case "windup":
      {
        if (tickTimer(e.stateTimer, 200)) {
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
        if (tickTimer(e.stateTimer, 300)) {
          const caster = getEntity(scene, e.parentId);
          resetState(caster);
          destroyEntity(scene, e);
        }
      }
      break;
  }
}

function onStateExit() {}
