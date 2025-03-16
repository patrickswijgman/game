import { getEntities, getEntity } from "@/data/entities.js";
import { getBodies } from "@/data/world.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, isRectangleValid, resetTransform } from "ridder";

export function debugHitboxes() {
  resetTransform();
  applyCameraTransform();
  for (const id of getEntities()) {
    const e = getEntity(id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

export function debugBodies() {
  resetTransform();
  applyCameraTransform();
  for (const body of getBodies()) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}

export function debugFps() {
  drawText(`FPS: ${getFramePerSecond()}`, 1, 1, "lime");
}
