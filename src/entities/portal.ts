import { COLOR_BG, COLOR_TEXT } from "consts.js";
import { Entity, newEntity, setSprites } from "entity.js";
import { game, switchScene } from "game.js";
import { drawOutlinedText } from "render.js";
import { getVectorDistance, InputCode, isInputPressed, scaleTransform } from "ridder";
import { getPlayer, Scene } from "scene.js";

export function newPortal(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "portal", x, y);

  setSprites(e, "portal", 15, 31, 0, 0, true, 0, 6);

  return e;
}

export function updatePortal(e: Entity, scene: Scene) {
  const player = getPlayer(scene);
  const distance = getVectorDistance(e.position, player.position);

  if (distance < 20 && isInputPressed(InputCode.KEY_E)) {
    switchScene(game.sceneMapId);
  }
}

export function renderPortal(e: Entity, scene: Scene) {
  const player = getPlayer(scene);
  const distance = getVectorDistance(e.position, player.position);

  if (distance < 20) {
    scaleTransform(0.75, 0.75);
    drawOutlinedText("Press [E] to go through the portal", 0, -50, COLOR_TEXT, COLOR_BG, "center", "middle");
  }
}
