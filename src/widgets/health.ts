import { Type } from "@/core/entity.js";
import { drawHealthBar } from "@/core/ui.js";
import { getPlayer } from "@/core/game.js";
import { addWidget } from "@/widgets/widget.js";

export function addHealthWidget(x: number, y: number) {
  const e = addWidget(Type.UI_HEALTH, x, y);
  return e;
}

export function renderHealthWidget() {
  const player = getPlayer();
  drawHealthBar(0, 0, player.stats, player.stats.healthMax * 10, 5);
}
