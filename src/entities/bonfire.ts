import { COLOR_BG, COLOR_TEXT } from "consts.js";
import { Entity, newEntity, setSprites } from "entity.js";
import { game, switchScene } from "game.js";
import { drawOutlinedText } from "render.js";
import { getVectorDistance, InputCode, isInputPressed, scaleTransform } from "ridder";
import { getPlayer, Scene } from "scene.js";
import { fillStats } from "stats.js";

export function newBonfire(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "bonfire", x, y);

  setSprites(e, "bonfire", 15.5, 31, 0, 0, true, 0, 4);

  return e;
}

export function updateBonfire(e: Entity, scene: Scene) {
  const player = getPlayer(scene);
  const distance = getVectorDistance(e.position, player.position);

  if (distance < 20 && isInputPressed(InputCode.KEY_E)) {
    fillStats(game.session.stats);
    switchScene(game.sceneMapId);
  }
}

export function renderBonfire(e: Entity, scene: Scene) {
  const player = getPlayer(scene);
  const distance = getVectorDistance(e.position, player.position);

  if (distance < 20) {
    scaleTransform(0.75, 0.75);
    drawOutlinedText("Press [E] to embrace the warmth of the bonfire", 0, -50, COLOR_TEXT, COLOR_BG, "center", "middle");
  }
}
