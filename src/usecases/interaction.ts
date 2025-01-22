import { Entity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { InteractionId } from "@/enums/interaction.js";
import { doPlayerPickCardInteraction } from "@/scenes/world.js";
import { doesRectangleContain, getMousePosition, InputCode, isInputPressed } from "ridder";

export function onClick(scene: Scene, e: Entity) {
  if (e.interactionId) {
    const mouse = getMousePosition();

    if (doesRectangleContain(e.hitarea, mouse.x, mouse.y)) {
      e.isOutlineVisible = true;

      if (isInputPressed(InputCode.MOUSE_LEFT, true)) {
        switch (e.interactionId) {
          case InteractionId.PLAYER_PICK_CARD:
            doPlayerPickCardInteraction(scene, e);
            break;
        }
      }
    } else {
      e.isOutlineVisible = false;
    }
  }
}
