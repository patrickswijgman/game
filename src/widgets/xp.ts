import { Type } from "@/core/entity.js";
import { getPlayer } from "@/core/game.js";
import { drawExperienceBar } from "@/core/ui.js";
import { addWidget } from "@/widgets/widget.js";
import { getWidth } from "ridder";

export function addExperienceWidget(x: number, y: number) {
  const e = addWidget(Type.WIDGET_XP, x, y);
  return e;
}

export function renderExperienceWidget() {
  const player = getPlayer();
  drawExperienceBar(0, 0, player.stats, getWidth(), 1);
}
