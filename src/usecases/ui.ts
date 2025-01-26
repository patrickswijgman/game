import { COLOR_BG, COLOR_OUTLINE } from "@/consts.js";
import { drawRect, drawText, TextAlign, TextBaseline } from "ridder";

export function drawBar(x: number, y: number, value: number, max: number, color: string, width: number, height: number) {
  drawRect(x, y, width, height, COLOR_BG, true);
  drawRect(x + 1, y + 1, (width - 2) * (value / max), height - 2, color, true);

  if (value > 0) {
    drawRect(x + (width - 2) * (value / max), y + 1, 1, height - 2, "white", true);
  }
}

export function drawTextOutlined(text: string, x: number, y: number, color: string, align: TextAlign = "left", baseline: TextBaseline = "top") {
  drawText(text, x, y - 1, COLOR_OUTLINE, align, baseline);
  drawText(text, x + 1, y, COLOR_OUTLINE, align, baseline);
  drawText(text, x, y + 1, COLOR_OUTLINE, align, baseline);
  drawText(text, x - 1, y, COLOR_OUTLINE, align, baseline);
  drawText(text, x, y, color, align, baseline);
}
