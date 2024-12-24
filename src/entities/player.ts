import { Entity, newEntity, updateState } from "data/entity.js";
import { getSession } from "data/game.js";
import { getItem } from "data/items.js";
import { Scene } from "data/scene.js";
import { newMeleeAttack } from "entities/melee-attack.js";
import { getMousePosition, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector, tickTimer, tween } from "ridder";

export function newPlayer(scene: Scene, x: number, y: number) {
  const session = getSession();
  const e = newEntity(scene, x, y);
  e.type = "player";
  e.spriteId = "player";
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;
  e.pivot.x = 8;
  e.pivot.y = 15;
  e.stats = session.stats;
  e.stateNextId = "idle";
  scene.playerId = e.id;
  return e;
}

export function updatePlayer(e: Entity, scene: Scene) {
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter(e: Entity, scene: Scene, state: string) {
  switch (state) {
    case "action":
      {
        switch (e.actionId) {
          case "melee_attack":
            {
              const session = getSession();
              newMeleeAttack(scene, e.pos.x, e.pos.y, session.weaponId);
            }
            break;
        }
      }
      break;
  }
}

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
    const session = getSession();
    const weapon = getItem(session.weaponId);
    e.actionId = weapon.actionId;
    return true;
  }

  return false;
}
