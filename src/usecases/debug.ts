import { FONT_HEIGHT } from "@/consts/render.js";
import { Scene } from "@/data/scene.js";
import { getEntity } from "@/usecases/scene.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, isRectangleValid, resetTransform, translateTransform } from "ridder";

export function debugHitboxes(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  for (const id of scene.update) {
    const e = getEntity(scene, id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

export function debugBodies(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  for (const body of scene.bodies) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}

export function debugFps() {
  drawText(`FPS: ${getFramePerSecond()}`, 1, 1, "lime");
}

export function debugEntities(scene: Scene) {
  const all = scene.entities.reduce((prev, e) => (prev += e.isAllocated ? 1 : 0), 0);
  const max = scene.entities.length;
  drawText(`entities: ${all} / ${max}`, 1, 1, "lime");
  translateTransform(0, FONT_HEIGHT);
  drawText(`entity ID: ${scene.entityId}`, 1, 1, "lime");
}
