import { COLOR_BG, COLOR_TEXT } from "consts.js";
import { Entity, newEntity, setSprites } from "entity.js";
import { game, switchScene } from "game.js";
import { newPortalParticle } from "particles/portal.js";
import { drawOutlinedText } from "render.js";
import { getVectorDistance, InputCode, isInputPressed, random, resetTimer, scaleTransform, tickTimer } from "ridder";
import { getPlayer, Scene } from "scene.js";

export function newPortal(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "portal", x, y);

  setSprites(e, "portal", 16, 31, 0, 0, true, 0, 6);

  return e;
}

export function updatePortal(e: Entity, scene: Scene) {
  const player = getPlayer(scene);
  const distance = getVectorDistance(e.position, player.position);

  if (tickTimer(e.timer, 100)) {
    newPortalParticle(scene, e.position.x + random(-10, 10), e.position.y + random(-1, 1));
    resetTimer(e.timer);
  }

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
