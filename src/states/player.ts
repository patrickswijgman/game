import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { InputCode, copyVector, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";

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
  }
}

export function onPlayerStateExit(e: Entity) {}

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

  if (isMoving) {
    normalizeVector(e.velocity);
    copyVector(e.direction, e.velocity);
    scaleVector(e.velocity, 0.75 * e.stats.movementSpeed);
  }

  return isMoving;
}

function attack(e: Entity) {
  if (isInputDown(InputCode.KEY_Z)) {
    return true;
  }

  return false;
}
