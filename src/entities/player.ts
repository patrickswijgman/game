import { isActionValid, spendAction } from "actions.js";
import { updateBreathAnimation } from "anims/breath.js";
import { updateWalkAnimation } from "anims/walk.js";
import { generateStamina } from "combat.js";
import { COLOR_BG, COLOR_HEALTH, COLOR_STAMINA, COLOR_TEXT } from "consts.js";
import { Entity, lookAt, newEntity, setBody, setConstraints, setSprites, updateState } from "entity.js";
import { game } from "game.js";
import { getItem } from "items.js";
import { copyVector, drawRect, drawSprite, drawText, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, resetTransform, resetVector, scaleTransform, scaleVector, setAlpha, setCameraPosition, translateTransform } from "ridder";
import { addPlayer, Scene } from "scene.js";
import { clampStats } from "stats.js";
import { drawBar } from "ui/bar.js";

export function newPlayer(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "player", x, y);

  setSprites(e, "player", 16, 31, 0, -5, true, 0, 2);
  setConstraints(e, 10, 12);
  setBody(e, scene, 10, 3);

  e.sheet = game.sheet;
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
  scaleVector(e.velocity, e.sheet.stats.movementSpeed);

  return !!getVectorLength(e.velocity);
}

function doAction(e: Entity) {
  if (isInputDown(InputCode.MOUSE_LEFT)) {
    const weapon = getItem(e.sheet.weaponId);

    if (isActionValid(e.sheet.stats, weapon.stats)) {
      e.actionId = weapon.actionId;
      spendAction(e.sheet.stats, weapon.stats);
      return true;
    }
  }

  if (isInputPressed(InputCode.KEY_SPACE) && e.sheet.stats.stamina >= 20 && getVectorLength(e.velocity)) {
    e.actionId = "dodge";
    e.sheet.stats.stamina -= 20;
    clampStats(e.sheet.stats);
    return true;
  }

  return false;
}

export function drawPlayerStatus(e: Entity) {
  resetTransform();
  drawBar(10, 10, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, e.sheet.stats.healthMax, 10);
  drawBar(10, 25, e.sheet.stats.stamina, e.sheet.stats.staminaMax, COLOR_STAMINA, e.sheet.stats.staminaMax, 10);
  translateTransform(10, 40);
  drawSprite("icon_experience", -2, -2);
  setAlpha(0.25);
  drawRect(12, 0, 50, 13, COLOR_BG, true);
  setAlpha(1);
  drawRect(12 + 1, 1, 50 - 2, 13 - 2, COLOR_BG, true);
  translateTransform(16, 3);
  scaleTransform(0.75, 0.75);
  drawText(game.sheet.stats.experience.toString(), 0, 0, COLOR_TEXT);
}
