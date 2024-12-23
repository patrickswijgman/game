import { Entity } from "data/entity.js";
import { newState } from "data/states.js";
import { getMousePosition, InputCode, isInputDown, normalizeVector, resetVector, scaleVector } from "ridder";

export function newPlayerIdleState() {
  return newState({
    update: (e) => {
      move(e);
    },
  });
}

export function move(e: Entity) {
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

  const mouse = getMousePosition(true);

  e.isFlipped = mouse.x < e.pos.x;
}
