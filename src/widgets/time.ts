import { COLOR_OUTLINE } from "@/consts.js";
import { Type } from "@/core/entity.js";
import { getTimeString } from "@/core/game.js";
import { addWidget } from "@/widgets/widget.js";
import { drawTextOutlined, getWidth, scaleTransform } from "ridder";

export function addTimeWidget() {
  const x = getWidth() - 10;
  const y = 10;
  const e = addWidget(Type.WIDGET_TIME, x, y);
  return e;
}

export function renderTimeWidget() {
  scaleTransform(0.625, 0.625);
  drawTextOutlined(getTimeString(), 0, 0, "white", COLOR_OUTLINE, "circle", "right");
}
