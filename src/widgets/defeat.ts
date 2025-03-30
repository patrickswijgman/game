import { COLOR_OUTLINE } from "@/consts.js";
import { Type } from "@/core/entity.js";
import { getTimeString } from "@/core/game.js";
import { addWidget } from "@/widgets/widget.js";
import { drawTextOutlined, getHeight, getWidth, scaleTransform, translateTransform } from "ridder";

export function addDefeatWidget() {
  const x = getWidth() / 2;
  const y = getHeight() / 2;
  const e = addWidget(Type.UI_DEFEAT, x, y);
  return e;
}

export function renderDefeatWidget() {
  translateTransform(0, -30);
  scaleTransform(2, 2);
  drawTextOutlined("You died", 0, 0, "red", COLOR_OUTLINE, "circle", "center");
  translateTransform(0, 15);
  scaleTransform(0.5, 0.5);
  drawTextOutlined(`Time survived: ${getTimeString()}`, 0, 0, "white", COLOR_OUTLINE, "circle", "center");
  translateTransform(0, 20);
  scaleTransform(0.75, 0.75);
  drawTextOutlined("- Press R to restart -", 0, 0, "lightgray", COLOR_OUTLINE, "circle", "center");
}
