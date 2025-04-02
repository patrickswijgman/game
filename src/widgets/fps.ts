import { Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { drawText, getFramePerSecond, scaleTransform, setAlpha } from "ridder";

export function addFpsWidget(x: number, y: number) {
  const e = addWidget(Type.WIDGET_FPS, x, y);
  return e;
}

export function renderFpsWidget() {
  scaleTransform(0.5, 0.5);
  setAlpha(0.3);
  drawText(getFramePerSecond().toString(), 0, 0);
  setAlpha(1);
}
