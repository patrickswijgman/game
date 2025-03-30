import { COLOR_HEALTH, COLOR_OUTLINE, COLOR_XP } from "@/consts.js";
import { Stats } from "@/core/stats.js";
import { getPlayer } from "@/core/game.js";
import { drawRect, getWidth, resetTransform, translateTransform } from "ridder";

export function drawHealthBar(x: number, y: number, stats: Stats, width: number, height: number) {
  const w = (width - 2) * (stats.health / stats.healthMax);
  drawRect(x, y, width, height, COLOR_OUTLINE, true);
  drawRect(x + 1, y + 1, w, height - 2, COLOR_HEALTH, true);
  if (stats.health > 0) {
    drawRect(x + w, y + 1, 1, height - 2, "white", true);
  }
}

export function drawExperienceBar(x: number, y: number, stats: Stats, width: number, height: number) {
  const w = width * (stats.experience / stats.experienceMax);
  drawRect(x, y, width, height, COLOR_OUTLINE, true);
  drawRect(x, y, w, height, COLOR_XP, true);
}

export function renderHud() {
  const player = getPlayer();
  resetTransform();
  translateTransform(10, 10);
  drawHealthBar(0, 0, player.stats, player.stats.healthMax * 10, 5);
  resetTransform();
  drawExperienceBar(0, 0, player.stats, getWidth(), 1);
}
