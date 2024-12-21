import { drawText, getFramePerSecond, resetTransform, scaleTransform, translateTransform } from "ridder";

export function renderDebugInfo() {
  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5, 0.5);
  drawText(getFramePerSecond().toString(), 0, 0, "lime");
}
