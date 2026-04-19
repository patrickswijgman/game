import { drawText, fps, resetTransform, scaleTransform, translateTransform } from "snuggy";

export function drawFramesPerSecond() {
  resetTransform();
  translateTransform(1, 1);
  scaleTransform(0.25, 0.25);
  drawText(fps.toString(), 0, 0, "#ffffff7f", "left", "top");
}
