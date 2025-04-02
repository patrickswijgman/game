import { Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { drawText, scaleTransform, setAlpha } from "ridder";

export function addVersionWidget(x: number, y: number) {
  const e = addWidget(Type.WIDGET_VERSION, x, y);
  return e;
}

export function renderVersionWidget() {
  scaleTransform(0.5, 0.5);
  setAlpha(0.3);
  drawText(__VERSION__, 0, 0, "white", "right", "bottom");
  setAlpha(1);
}
