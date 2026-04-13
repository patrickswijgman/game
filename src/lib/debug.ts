import { addCameraTransform, drawRect, drawText, fps, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { activeEntities, entities } from "@/data.ts";

export function drawFramesPerSecond() {
  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.5, 0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

export function drawHitboxes() {
  for (const idx of activeEntities) {
    const e = entities[idx];
    resetTransform();
    addCameraTransform();
    drawRect(e.body.x, e.body.y, e.body.w, e.body.h, "red", false);
  }
}
