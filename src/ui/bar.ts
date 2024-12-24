import { COLOR_BG } from "consts.js";
import { drawRect } from "ridder";

export function drawBar(x: number, y: number, value: number, max: number, color: string, width: number, height: number) {
  drawRect(x, y, width, height, "white", true);
  drawRect(x + 1, y + 1, width - 2, height - 2, COLOR_BG, true);
  drawRect(x + 2, y + 2, (width - 4) * (value / max), height - 4, color, true);
}
