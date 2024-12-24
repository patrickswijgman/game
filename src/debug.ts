import { LINE_HEIGHT } from "consts.js";
import { applyCameraTransform, drawPolygonInstance, drawText, getFramePerSecond, isPolygonValid, resetTransform, translateTransform } from "ridder";
import { getEntity, getPlayer, Scene } from "scene.js";

export function renderDebugInfo(scene: Scene) {
  return;

  resetTransform();
  applyCameraTransform();
  for (const id of scene.active) {
    const e = getEntity(scene, id);

    if (isPolygonValid(e.hitbox)) {
      drawPolygonInstance(e.hitbox, "yellow", false);
    }
  }

  resetTransform();

  translateTransform(2, 2);
  drawText(getFramePerSecond().toString(), 0, 0, "lime");

  const player = getPlayer(scene);

  translateTransform(0, LINE_HEIGHT);
  drawText(player.stateId, 0, 0, "lime");
}
