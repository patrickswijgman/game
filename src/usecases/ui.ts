import { COLOR_HEALTH, COLOR_OUTLINE, COLOR_XP } from "@/consts/colors.js";
import { Stats } from "@/data/stats.js";
import { drawRect, drawText, TextAlign, TextBaseline } from "ridder";

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

export function drawTextOutlined(text: string, x: number, y: number, color = "white", align: TextAlign = "left", baseline: TextBaseline = "top") {
  drawText(text, x, y - 1, COLOR_OUTLINE, align, baseline);
  drawText(text, x + 1, y, COLOR_OUTLINE, align, baseline);
  drawText(text, x, y + 1, COLOR_OUTLINE, align, baseline);
  drawText(text, x - 1, y, COLOR_OUTLINE, align, baseline);
  drawText(text, x, y, color, align, baseline);
}
