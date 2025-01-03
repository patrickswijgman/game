import { COLOR_BG } from "consts.js";
import { drawRect, setAlpha } from "ridder";

export function drawBar(x: number, y: number, value: number, max: number, color: string, width: number, height: number) {
  setAlpha(0.25);
  drawRect(x, y, width, height, "black", true);
  setAlpha(1);

  drawRect(x + 1, y + 1, width - 2, height - 2, COLOR_BG, true);
  drawRect(x + 2, y + 2, (width - 4) * (value / max), height - 4, color, true);

  if (value > 0) {
    drawRect(x + (width - 4) * (value / max), y + 2, 2, height - 4, "white", true);
  }
}
