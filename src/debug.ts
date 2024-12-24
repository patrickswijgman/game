import { LINE_HEIGHT } from "consts.js";
import { drawText, getFramePerSecond, resetTransform, translateTransform } from "ridder";
import { getPlayer, Scene } from "scene.js";

export function renderDebugInfo(scene: Scene) {
  resetTransform();

  translateTransform(2, 2);
  drawText(getFramePerSecond().toString(), 0, 0, "lime");

  const player = getPlayer(scene);

  translateTransform(0, LINE_HEIGHT);
  drawText(player.stateId, 0, 0, "lime");
  translateTransform(0, LINE_HEIGHT);
  drawText(`HP: ${player.stats.health}`, 0, 0, "lime");
  translateTransform(0, LINE_HEIGHT);
  drawText(`SP: ${player.stats.stamina}`, 0, 0, "lime");
  translateTransform(0, LINE_HEIGHT);
  drawText(`MP: ${player.stats.mana}`, 0, 0, "lime");
}
