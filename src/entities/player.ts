import { isActionValid, spendAction } from "actions.js";
import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { depleteStun, generateStamina } from "combat.js";
import { Entity, lookAt, newEntity, setConstraints, setSprites, updateState } from "entity.js";
import { game } from "game.js";
import { getItem } from "items.js";
import { copyVector, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector, setCameraPosition } from "ridder";
import { addPlayer, Scene } from "scene.js";
import { updateStats } from "stats.js";

export function newPlayer(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "player", x, y);

  setSprites(e, "player", 16, 31, 0, -5, true, 0, 2);
  setConstraints(e, 10, 12);

  e.stats = game.session.stats;
  e.weaponId = game.session.weaponId;
  e.stateStartId = "idle";
  e.stateNextId = "idle";
  e.isPlayer = true;

  addPlayer(scene, e);

  setCameraPosition(scene.camera, x, y);

  return e;
}

export function updatePlayer(e: Entity, scene: Scene) {
  updateState(e, scene, onStateEnter, onStateUpdate, onStateExit);
}

function onStateEnter() {}

function onStateUpdate(e: Entity, scene: Scene, state: string) {
  depleteStun(e);

  switch (state) {
    case "idle":
      {
        if (doAction(e)) {
          return "action";
        }

        if (move(e)) {
          return "move";
        }

        lookAt(e, scene.camera.mousePosition);
        updateBreathAnimation(e);
        generateStamina(e);
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

        lookAt(e, scene.camera.mousePosition);
        updateWalkAnimation(e);
        generateStamina(e);
      }
      break;
  }
}

function onStateExit() {}

function move(e: Entity) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_W)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_S)) {
    e.velocity.y += 1;
  }
  if (isInputDown(InputCode.KEY_A)) {
    e.velocity.x -= 1;
  }
  if (isInputDown(InputCode.KEY_D)) {
    e.velocity.x += 1;
  }

  normalizeVector(e.velocity);
  copyVector(e.direction, e.velocity);
  scaleVector(e.velocity, e.stats.movementSpeed);

  return !!getVectorLength(e.velocity);
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

  if (isInputPressed(InputCode.KEY_SPACE) && e.stats.stamina >= 25 && getVectorLength(e.velocity)) {
    e.actionId = "dodge";
    e.stats.stamina -= 25;
    updateStats(e.stats);
    return true;
  }

  return false;
}
