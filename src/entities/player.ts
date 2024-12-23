import { isActionValid, spendAction } from "actions.js";
import { Entity, newEntity, updateState } from "entity.js";
import { getSession } from "game.js";
import { getItem } from "items.js";
import { getMousePosition, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector, tickTimer, tween } from "ridder";
import { Scene } from "scene.js";

export function newPlayer(scene: Scene, x: number, y: number) {
  const session = getSession();
  const e = newEntity(scene, x, y);
  e.type = "player";
  e.spriteId = "player";
  e.pivot.x = 8;
  e.pivot.y = 15;
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;
  e.stats = session.stats;
  e.weaponId = session.weaponId;
  e.stateNextId = "idle";
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

        look(e);
      }
      break;

    case "move":
      {
        if (doAction(e)) {
          return "action";
        }

        if (!move(e)) {
          return "idle";
        }

        tickTimer(e.tweenTimer, Infinity);
        e.tweenPos.y = tween(0, -2, 100, "easeInOutSine", e.tweenTimer.elapsed);

        look(e);
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
  scaleVector(e.vel, e.stats.movementSpeed);

  return !!getVectorLength(e.vel);
}

function look(e: Entity) {
  const mouse = getMousePosition(true);
  e.isFlipped = mouse.x < e.pos.x;
}

function doAction(e: Entity) {
  if (isInputPressed(InputCode.MOUSE_LEFT)) {
    const weapon = getItem(e.weaponId);

    if (isActionValid(e.stats, weapon.stats)) {
      e.actionId = weapon.actionId;
      spendAction(e.stats, weapon.stats);
      return true;
    }
  }

  return false;
}
