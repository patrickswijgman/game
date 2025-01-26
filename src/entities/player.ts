import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { addAttack } from "@/entities/attack.js";
import { SpriteId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { StateId } from "@/enums/state.js";
import { Type } from "@/enums/type.js";
import { getAttack } from "@/usecases/attack.js";
import { addEntity, setCenter, setHitbox, setShadow, setSprite, setState, updateState } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { updateSheet } from "@/usecases/sheet.js";
import { copyVector, getVectorLength, InputCode, isInputDown, isInputPressed, normalizeVector, resetVector, scaleVector, setCameraPosition, tickTimer } from "ridder";

export function addPlayer(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 8, 13);
  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  e.sheet = game.sheet;
  e.isPlayer = true;
  e.isPhysicsEnabled = true;
  setState(e, StateId.PLAYER_IDLE);

  const scene = getScene(e.sceneId);
  scene.playerId = e.id;
  setCameraPosition(scene.camera, e.position.x, e.position.y);

  updateSheet(e.sheet);

  return e;
}

export function updatePlayer(e: Entity) {
  updateState(e, onEnter, onUpdate, onExit);
}

function onEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.PLAYER_IDLE);
      break;

    case StateId.ATTACK:
      addAttack(e.sceneId, e, e.sheet.weaponId);
      break;
  }
}

function onUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER_IDLE:
      {
        updateBreathAnimation(e);
        if (move(e)) {
          setState(e, StateId.PLAYER_WALK);
        }
        if (attack(e)) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.PLAYER_WALK:
      {
        updateWalkAnimation(e);
        if (!move(e)) {
          setState(e, StateId.PLAYER_IDLE);
        }
        if (attack(e)) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.ATTACK:
      {
        const attack = getAttack(e.sheet.weaponId);
        if (tickTimer(e.stateTimer, attack.recovery)) {
          setState(e, StateId.PLAYER_IDLE);
        }
      }
      break;
  }
}

function move(e: Entity) {
  resetVector(e.velocity);
  if (isInputDown(InputCode.KEY_LEFT)) {
    e.velocity.x -= 1;
    e.isFlipped = true;
  }
  if (isInputDown(InputCode.KEY_RIGHT)) {
    e.velocity.x += 1;
    e.isFlipped = false;
  }
  if (isInputDown(InputCode.KEY_UP)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_DOWN)) {
    e.velocity.y += 1;
  }
  const isMoving = !!getVectorLength(e.velocity);
  normalizeVector(e.velocity);
  if (isMoving) {
    copyVector(e.direction, e.velocity);
  }
  scaleVector(e.velocity, 1);
  return isMoving;
}

function attack(e: Entity) {
  if (isInputPressed(InputCode.KEY_Z)) {
    return true;
  } else {
    return false;
  }
}

function onExit(e: Entity) {}
