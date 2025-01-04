import { COLOR_BG, COLOR_TEXT } from "consts.js";
import { game } from "game.js";
import { drawRect, drawSprite, drawText, scaleTransform, setAlpha, translateTransform } from "ridder";

export function drawExperience() {
  drawSprite("icon_experience", -2, -2);
  setAlpha(0.25);
  drawRect(12, 0, 50, 13, COLOR_BG, true);
  setAlpha(1);
  drawRect(12 + 1, 1, 50 - 2, 13 - 2, COLOR_BG, true);
  translateTransform(16, 3);
  scaleTransform(0.75, 0.75);
  drawText(game.session.stats.experience.toString(), 0, 0, COLOR_TEXT);
}
