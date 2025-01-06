import { COLOR_BG, COLOR_HEALTH, COLOR_STAMINA, COLOR_STUN, COLOR_TEXT } from "consts.js";
import { Entity } from "entity.js";
import { game } from "game.js";
import { drawOutlinedText } from "render.js";
import { resetTransform, translateTransform } from "ridder";
import { drawBar } from "ui/bar.js";
import { drawExperience } from "ui/experience.js";

export function drawStatus(e: Entity) {
  resetTransform();
  drawBar(10, 10, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, e.sheet.stats.healthMax, 10);
  drawBar(10, 25, e.sheet.stats.stamina, e.sheet.stats.staminaMax, COLOR_STAMINA, e.sheet.stats.staminaMax, 10);
  drawBar(10, 40, e.sheet.stats.stun, e.sheet.stats.stunMax, COLOR_STUN, e.sheet.stats.stunMax, 5);
  translateTransform(10, 50);
  drawExperience();
  resetTransform();
  translateTransform(12, 70);
  drawOutlinedText(`Room ${game.session.map.level + 1}/${game.session.map.rooms.length}`, 0, 0, COLOR_TEXT, COLOR_BG);
}
