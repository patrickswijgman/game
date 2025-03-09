import { game } from "@/data/game.js";
import { getEntity } from "@/usecases/entity.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, isRectangleValid, resetTransform, translateTransform } from "ridder";

export function debugHitboxes() {
  resetTransform();
  applyCameraTransform(game.camera);
  for (const id of game.update) {
    const e = getEntity(id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

export function debugBodies() {
  resetTransform();
  applyCameraTransform(game.camera);
  for (const body of game.bodies) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}

export function debugFps() {
  drawText(`FPS: ${getFramePerSecond()}`, 1, 1, "lime");
}

export function debugEntities() {
  const all = game.entities.reduce((prev, e) => (prev += e.isAllocated ? 1 : 0), 0);
  const max = game.entities.length;
  drawText(`entities: ${all} / ${max}`, 1, 1, "lime");
  translateTransform(0, 11);
  drawText(`entity ID: ${game.nextId}`, 1, 1, "lime");
}
