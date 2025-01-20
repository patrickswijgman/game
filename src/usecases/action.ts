import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { ActionId } from "@/enums/action.js";
import { performPlayerPickCardAction } from "@/scenes/world.js";
import { doesRectangleContain, InputCode, isInputPressed } from "ridder";

export function performAction(scene: Scene, e: Entity) {
  if (e.actionId) {
    if (doesRectangleContain(e.hitarea, scene.camera.mousePosition.x, scene.camera.mousePosition.y)) {
      e.isOutlineVisible = true;

      if (isInputPressed(InputCode.MOUSE_LEFT)) {
        switch (e.actionId) {
          case ActionId.PLAYER_PICK_CARD:
            performPlayerPickCardAction(scene, e);
            break;
        }
      }
    } else {
      e.isOutlineVisible = false;
    }
  }
}
