import { COLOR_HEALTH, COLOR_MANA } from "@/consts/colors.js";
import { game } from "@/data/game.js";
import { drawBar } from "@/usecases/ui.js";
import { resetTransform, translateTransform } from "ridder";

export function renderHud() {
  resetTransform();
  translateTransform(10, 10);
  drawBar(0, 0, game.sheet.stats.health, game.sheet.stats.healthMax, COLOR_HEALTH, game.sheet.stats.healthMax * 2, 5);
  translateTransform(0, 6);
  drawBar(0, 0, game.sheet.stats.mana, game.sheet.stats.manaMax, COLOR_MANA, game.sheet.stats.manaMax * 2, 5);
}
