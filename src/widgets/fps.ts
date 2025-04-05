import { Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { drawText, getFramePerSecond, scaleTransform, setAlpha } from "ridder";

export function addFpsWidget() {
  const e = addWidget(Type.WIDGET_FPS, 2, 2);
  return e;
}

export function renderFpsWidget() {
  scaleTransform(0.5, 0.5);
  setAlpha(0.3);
  drawText(getFramePerSecond().toString(), 0, 0);
  setAlpha(1);
}
