import { Entity } from "@/data/entity.js";
import { world } from "@/data/world.js";
import { InputCode, copyVector, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector, subtractVector } from "ridder";

export function move(e: Entity, mod = 1) {
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
    scaleVector(e.velocity, 0.6 * e.stats.movementSpeed * mod);
  }

  return isMoving;
}

export function aim(e: Entity) {
  copyVector(e.direction, world.camera.mousePosition);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);
  e.isFlipped = e.direction.x < 0;
}

export function attack() {
  return isInputDown(InputCode.MOUSE_LEFT);
}
