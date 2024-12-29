import { isActionValid, spendAction } from "actions.js";
import { generateStamina } from "combat.js";
import { Entity, newEntity, setSprites, updateState } from "entity.js";
import { getSession } from "game.js";
import { getItem } from "items.js";
import { copyVector, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, polygonFromRect, rect, resetVector, scaleVector, tickTimer, tween } from "ridder";
import { Scene } from "scene.js";
import { updateStats } from "stats.js";

export function newPlayer(scene: Scene, x: number, y: number) {
  const session = getSession();
  const e = newEntity(scene, "player", x, y);
  setSprites(e, "player", 8, 15, 0, -4, true, 0, 2, true);
  e.hitbox = polygonFromRect(x, y, rect(-4, -10, 8, 10));
  e.radius = 8;
  e.stats = session.stats;
  e.weaponId = session.weaponId;
  e.stateIdleId = "idle";
  e.stateNextId = "idle";
  e.isPlayer = true;
  scene.playerId = e.id;
  return e;
}

export function updatePlayer(e: Entity, scene: Scene) {
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "idle":
      {
        if (doAction(e)) {
          return "action";
        }

        if (move(e)) {
          return "move";
        }

        tickTimer(e.tweenTimer, Infinity);
        e.tweenScale.x = tween(1, 1.2, 2000, "easeInOutSine", e.tweenTimer.elapsed);
        e.tweenScale.y = tween(1, 1.2, 2000, "easeInOutSine", e.tweenTimer.elapsed);

        look(e, scene);
        generateStamina(e);
      }
      break;

    case "move":
      {
        if (doAction(e)) {
          return "action";
        }

        if (doDodgeAction(e)) {
          return "action";
        }

        if (!move(e)) {
          return "idle";
        }

        tickTimer(e.tweenTimer, Infinity);
        e.tweenPos.y = tween(0, -2, 100, "easeInOutSine", e.tweenTimer.elapsed);

        look(e, scene);
        generateStamina(e);
      }
      break;
  }
}

function onStateExit() {}

function move(e: Entity) {
  resetVector(e.vel);

  if (isInputDown(InputCode.KEY_W)) {
    e.vel.y -= 1;
  }
  if (isInputDown(InputCode.KEY_S)) {
    e.vel.y += 1;
  }
  if (isInputDown(InputCode.KEY_A)) {
    e.vel.x -= 1;
  }
  if (isInputDown(InputCode.KEY_D)) {
    e.vel.x += 1;
  }

  normalizeVector(e.vel);
  copyVector(e.direction, e.vel);
  scaleVector(e.vel, e.stats.movementSpeed);

  return !!getVectorLength(e.vel);
}

function look(e: Entity, scene: Scene) {
  e.isFlipped = scene.camera.mousePosition.x < e.pos.x;
}

function doAction(e: Entity) {
  if (isInputDown(InputCode.MOUSE_LEFT)) {
    const weapon = getItem(e.weaponId);

    if (isActionValid(e.stats, weapon.stats)) {
      e.actionId = weapon.actionId;
      spendAction(e.stats, weapon.stats);
      return true;
    }
  }

  return false;
}

function doDodgeAction(e: Entity) {
  if (isInputPressed(InputCode.KEY_SPACE) && e.stats.stamina >= 20) {
    e.stats.stamina -= 20;
    updateStats(e.stats);
    e.actionId = "dodge";
    return true;
  }

  return false;
}
