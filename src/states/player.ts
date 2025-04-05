import { AnimationId, Entity, StateId, setAnimation, setState } from "@/core/entity.js";
import { InputCode, copyVector, getMousePosition, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector, subtractVector } from "ridder";

export function onPlayerStateEnter() {}

export function onPlayerStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER:
      aim(e);
      move(e);
      attack(e);
      break;

    case StateId.ATTACK:
      aim(e);
      move(e, 0.5);
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
    setAnimation(e, AnimationId.WALK, 100);
  } else {
    setAnimation(e, AnimationId.BREATH, 2000);
  }

  return isMoving;
}

function aim(e: Entity) {
  copyVector(e.direction, getMousePosition(true));
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = e.direction.x < 0;
}

function attack(e: Entity) {
  if (isInputDown(InputCode.MOUSE_LEFT)) {
    setState(e, StateId.ATTACK);
  }
}
