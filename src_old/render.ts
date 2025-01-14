import { drawText, TextAlign, TextBaseline } from "ridder";

export function drawOutlinedText(text: string, x: number, y: number, color = "white", outlineColor = "black", align: TextAlign = "left", baseline: TextBaseline = "top") {
  drawText(text, x, y - 1, outlineColor, align, baseline);
  drawText(text, x + 1, y, outlineColor, align, baseline);
  drawText(text, x, y + 1, outlineColor, align, baseline);
  drawText(text, x - 1, y, outlineColor, align, baseline);
  drawText(text, x, y, color, align, baseline);
}
