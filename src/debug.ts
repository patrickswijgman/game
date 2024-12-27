import { DEBUG, LINE_HEIGHT, WIDTH } from "consts.js";
import { applyCameraTransform, drawCircle, drawPolygonInstance, drawText, getFramePerSecond, isPolygonValid, resetTransform, translateTransform } from "ridder";
import { getEntity, getPlayer, Scene } from "scene.js";

export function renderDebugInfo(scene: Scene) {
  if (!DEBUG) return;

  resetTransform();
  applyCameraTransform();
  for (const id of scene.active) {
    const e = getEntity(scene, id);

    if (isPolygonValid(e.hitbox)) {
      drawPolygonInstance(e.hitbox, "yellow", false);
    }

    if (e.radius) {
      drawCircle(e.pos.x, e.pos.y, e.radius, "red", false);
    }
  }

  resetTransform();

  translateTransform(WIDTH - 2, 2);
  drawText(getFramePerSecond().toString(), 0, 0, "lime", "right");

  const player = getPlayer(scene);

  translateTransform(0, LINE_HEIGHT);
  drawText(player.stateId, 0, 0, "lime", "right");
}
