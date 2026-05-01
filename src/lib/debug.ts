import { addCameraTransform, drawRect, drawText, fps, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { active, activeCount, hitboxH, hitboxW, hitboxX, hitboxY } from "@/data.ts";

export function drawFramesPerSecond() {
  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

export function drawHitboxes() {
  for (let i = 0; i < activeCount; i++) {
    const id = active[i];
    resetTransform();
    addCameraTransform();
    drawRect(hitboxX[id], hitboxY[id], hitboxW[id], hitboxH[id], "yellow", false);
  }
}
