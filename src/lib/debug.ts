import { addCameraTransform, drawRect, drawText, fps, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { activeEntities, entities } from "@/data.ts";
import { isRectIntersection } from "@/lib/rect.ts";

export function drawFramesPerSecond() {
  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.5, 0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

export function drawBodies() {
  for (const idx of activeEntities) {
    const e = entities[idx];
    resetTransform();
    addCameraTransform();
    drawRect(e.body.x, e.body.y, e.body.w, e.body.h, "red", false);
  }
}

export function drawHitboxes() {
  for (const idx of activeEntities) {
    const e = entities[idx];

    let color = "yellow";

    for (const idx of activeEntities) {
      const other = entities[idx];

      if (isRectIntersection(e.hitbox, other.hitbox)) {
        color = "purple";
        break;
      }
    }

    resetTransform();
    addCameraTransform();
    drawRect(e.hitbox.x, e.hitbox.y, e.hitbox.w, e.hitbox.h, color, false);
  }
}
