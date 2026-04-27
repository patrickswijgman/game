import { drawText, fps, resetTransform, scaleTransform, translateTransform } from "snuggy";

export function drawFramesPerSecond() {
  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}
