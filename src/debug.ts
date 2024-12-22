import { LINE_HEIGHT } from "consts.js";
import { drawText, getFramePerSecond, resetTransform, scaleTransform, translateTransform } from "ridder";
import { getPlayer, Scene } from "scene.js";

export function renderDebugInfo(scene: Scene) {
  resetTransform();
  translateTransform(2, 2);
  scaleTransform(0.5, 0.5);

  drawText(getFramePerSecond().toString(), 0, 0, "lime");

  translateTransform(0, LINE_HEIGHT);
  const player = getPlayer(scene);
  drawText(player.stateId, 0, 0, "lime");
}
