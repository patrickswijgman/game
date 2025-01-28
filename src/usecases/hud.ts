import { COLOR_HEALTH } from "@/consts/colors.js";
import { Entity } from "@/data/entity.js";
import { drawBar } from "@/usecases/ui.js";
import { resetTransform, translateTransform } from "ridder";

export function renderHud(player: Entity) {
  resetTransform();
  translateTransform(10, 10);
  drawBar(0, 0, player.sheet.stats.health, player.sheet.stats.healthMax, COLOR_HEALTH, player.sheet.stats.healthMax * 2, 5);
}
