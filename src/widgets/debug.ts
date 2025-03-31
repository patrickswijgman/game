import { Type } from "@/core/entity.js";
import { getBodies, getEntity, getObjectsGroup } from "@/core/game.js";
import { addWidget } from "@/widgets/widget.js";
import { applyCameraTransform, drawRectInstance, isRectangleValid, resetTransform } from "ridder";

export function addDebugWidget() {
  const e = addWidget(Type.WIDGET_DEBUG, 0, 0);
  return e;
}

export function renderDebugWidget() {
  resetTransform();
  applyCameraTransform();

  for (const id of getObjectsGroup()) {
    const e = getEntity(id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }

  for (const body of getBodies()) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}
