import { Type } from "@/core/entity.js";
import { getPlayer } from "@/core/game.js";
import { drawHealthBar } from "@/core/ui.js";
import { addWidget } from "@/widgets/widget.js";

export function addHealthWidget() {
  const e = addWidget(Type.WIDGET_HEALTH, 10, 10);
  return e;
}

export function renderHealthWidget() {
  const player = getPlayer();
  drawHealthBar(0, 0, player.stats, player.stats.healthMax * 10, 5);
}
