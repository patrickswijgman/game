import { Scene } from "@/data/scene.js";
import { getEntity } from "@/usecases/scene.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, isRectangleValid, resetTransform, scaleTransform } from "ridder";

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

export function debugFps() {
  resetTransform();
  scaleTransform(0.5, 0.5);
  drawText(getFramePerSecond().toString(), 1, 1, "lime");
}
