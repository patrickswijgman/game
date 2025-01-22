import { Scene } from "@/data/scene.js";
import { drawRectInstance, isRectangleValid, resetTransform } from "ridder";

export function debugHitareas(scene: Scene) {
  resetTransform();

  for (const id of scene.render) {
    const e = scene.entities[id];
    if (isRectangleValid(e.hitarea)) {
      drawRectInstance(e.hitarea, "blue", false);
    }
  }
}
