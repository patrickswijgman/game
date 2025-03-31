import { Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { drawRect, getHeight, getWidth, setAlpha } from "ridder";

export function addBackdropWidget() {
  const e = addWidget(Type.WIDGET_BACKDROP, 0, 0);
  return e;
}

export function renderBackdropWidget() {
  setAlpha(0.5);
  drawRect(0, 0, getWidth(), getHeight(), "black", true);
  setAlpha(1);
}
