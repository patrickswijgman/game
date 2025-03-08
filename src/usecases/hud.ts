import { COLOR_HEALTH, COLOR_MANA } from "@/consts/colors.js";
import { world } from "@/data/world.js";
import { getEntity } from "@/usecases/entity.js";
import { drawBar } from "@/usecases/ui.js";
import { resetTransform, translateTransform } from "ridder";

export function renderHud() {
  const e = getEntity(world.playerId);

  if (e.isPlayer) {
    resetTransform();
    translateTransform(10, 10);
    drawBar(0, 0, e.stats.health, e.stats.healthMax, COLOR_HEALTH, e.stats.healthMax * 10, 5);
    translateTransform(0, 6);
    drawBar(0, 0, e.stats.mana, e.stats.manaMax, COLOR_MANA, e.stats.manaMax * 10, 5);
  }
}
