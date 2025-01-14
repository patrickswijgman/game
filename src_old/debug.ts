import { WIDTH } from "consts.js";
import { applyCameraTransform, drawCircle, drawPolygonInstance, drawRectInstance, drawText, getFramePerSecond, isPolygonValid, isRectangleValid, resetTransform, translateTransform } from "ridder";
import { getEntity, getPlayer, Scene } from "scene.js";

export function renderDebugInfo(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);

  for (const id of scene.update) {
    const e = getEntity(scene, id);

    if (isPolygonValid(e.hitbox)) {
      drawPolygonInstance(e.hitbox, "yellow", false);
    }

    if (isRectangleValid(e.hitarea)) {
      drawRectInstance(e.hitarea, "blue", false);
    }

    if (e.radius) {
      drawCircle(e.position.x, e.position.y, e.radius, "white", false);
    }
  }

  drawRectInstance(scene.safeArea, "purple");

  for (const body of scene.bodies) {
    drawRectInstance(body, "red", false);
  }

  resetTransform();

  translateTransform(WIDTH - 2, 2);
  drawText(getFramePerSecond().toString(), 0, 0, "lime", "right");

  const player = getPlayer(scene);
  if (player) {
    translateTransform(0, 12);
    drawText(player.stateId, 0, 0, "lime", "right");
  }
}