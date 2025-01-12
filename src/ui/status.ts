import { COLOR_HEALTH, COLOR_STAMINA } from "consts.js";
import { Entity } from "entity.js";
import { resetTransform, translateTransform } from "ridder";
import { drawBar } from "ui/bar.js";
import { drawExperience } from "ui/experience.js";

export function drawStatus(e: Entity) {
  resetTransform();
  drawBar(10, 10, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, e.sheet.stats.healthMax, 10);
  drawBar(10, 25, e.sheet.stats.stamina, e.sheet.stats.staminaMax, COLOR_STAMINA, e.sheet.stats.staminaMax, 10);
  translateTransform(10, 40);
  drawExperience();
}
