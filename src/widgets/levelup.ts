import { COLOR_OUTLINE, MAX_LEVEL } from "@/consts.js";
import { Type } from "@/core/entity.js";
import { getPlayer } from "@/core/game.js";
import { addWidget } from "@/widgets/widget.js";
import { drawTextOutlined, getWidth, scaleTransform, translateTransform } from "ridder";

export function addLevelUpWidget() {
  const x = getWidth() / 2;
  const y = 20;
  const e = addWidget(Type.WIDGET_LEVEL_UP, x, y);
  return e;
}

export function renderLevelupWidget() {
  const player = getPlayer();
  scaleTransform(1.25, 1.25);
  drawTextOutlined("Level up!", 0, 0, "white", COLOR_OUTLINE, "circle", "center", "middle");
  translateTransform(0, 10);
  scaleTransform(0.75, 0.75);
  drawTextOutlined(`(${player.stats.level} / ${MAX_LEVEL})`, 0, 0, "white", COLOR_OUTLINE, "circle", "center", "middle");
}
