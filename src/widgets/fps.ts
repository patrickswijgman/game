import { Entity, Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { getFramePerSecond, setVector } from "ridder";

export function addFpsWidget(x: number, y: number) {
  const e = addWidget(Type.WIDGET_FPS, x, y);

  setVector(e.scale, 0.5, 0.5);

  e.textColor = "white";
  e.alpha = 0.3;

  return e;
}

export function updateFpsWidget(e: Entity) {
  e.text = getFramePerSecond().toString();
}
