import { Entity, Type } from "@/core/entity.js";
import { getTimeString } from "@/core/world.js";
import { addWidget } from "@/widgets/widget.js";
import { setVector } from "ridder";

export function addTimeWidget(x: number, y: number) {
  const e = addWidget(Type.UI_TIME, x, y);

  setVector(e.scale, 0.625, 0.625);

  e.textColor = "white";
  e.textAlign = "right";

  return e;
}

export function updateTimeWidget(e: Entity) {
  e.text = getTimeString();
}
