import { Entity } from "@/data/entity.js";
import { getScene } from "@/usecases/game.js";
import { InputCode, copyVector, getVectorLength, isInputDown, normalizeVector, resetVector, scaleVector, subtractVector } from "ridder";

export function move(e: Entity) {
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
    scaleVector(e.velocity, 0.75 * e.stats.movementSpeed);
  }

  return isMoving;
}

export function aim(e: Entity) {
  const scene = getScene(e.sceneId);

  copyVector(e.direction, scene.camera.mousePosition);
  subtractVector(e.direction, e.position);
  normalizeVector(e.direction);

  e.isFlipped = e.direction.x < 0;
}

export function attack() {
  if (isInputDown(InputCode.MOUSE_LEFT)) {
    return true;
  }

  return false;
}
