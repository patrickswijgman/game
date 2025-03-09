import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { setState } from "@/usecases/entity.js";
import { InputCode, copyVector, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector, subtractVector } from "ridder";

export function onPlayerStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.PLAYER_IDLE);
      break;
  }
}

export function onPlayerStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER_IDLE:
      {
        updateBreathAnimation(e);
        aim(e);
        if (move(e)) {
          setState(e, StateId.PLAYER_WALK);
        }
        if (attack()) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.PLAYER_WALK:
      {
        updateWalkAnimation(e);
        aim(e);
        if (!move(e)) {
          setState(e, StateId.PLAYER_IDLE);
        }
        if (attack()) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.ATTACK:
      {
        move(e, 0.5);
      }
      break;
  }
}

export function onPlayerStateExit() {}

function move(e: Entity, mod = 1) {
  resetVector(e.velocity);

  if (isInputDown(InputCode.KEY_A)) {
    e.velocity.x -= 1;
  }
  if (isInputDown(InputCode.KEY_D)) {
    e.velocity.x += 1;
  }
  if (isInputDown(InputCode.KEY_W)) {
    e.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_S)) {
    e.velocity.y += 1;
  }

  const isMoving = !!getVectorLength(e.velocity);

  if (isMoving) {
    normalizeVector(e.velocity);
    scaleVector(e.velocity, e.stats.movementSpeed * mod);
  }

  return isMoving;
}

function aim(e: Entity) {
  copyVector(e.direction, game.camera.mousePosition);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = e.direction.x < 0;
}

function attack() {
  return isInputDown(InputCode.MOUSE_LEFT);
}
