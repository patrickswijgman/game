import { Type } from "@/core/entity.js";
import { addWidget } from "@/widgets/widget.js";
import { setVector } from "ridder";

export function addVersionWidget(x: number, y: number) {
  const e = addWidget(Type.WIDGET_VERSION, x, y);

  setVector(e.scale, 0.5, 0.5);

  e.text = __VERSION__;
  e.textColor = "white";
  e.textAlign = "right";
  e.textBaseline = "bottom";
  e.alpha = 0.3;

  return e;
}
