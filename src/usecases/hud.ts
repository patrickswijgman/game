import { COLOR_HEALTH } from "@/consts/colors.js";
import { game } from "@/data/game.js";
import { drawBar } from "@/usecases/ui.js";
import { resetTransform, translateTransform } from "ridder";

export function renderHud() {
  resetTransform();
  translateTransform(10, 10);
  drawBar(0, 0, game.sheet.stats.health, game.sheet.stats.healthMax, COLOR_HEALTH, game.sheet.stats.healthMax * 2, 5);
}
