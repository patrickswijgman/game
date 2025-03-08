import { isPlayerAlive } from "@/usecases/player.js";
import { drawExperienceBar, drawHealthBar } from "@/usecases/ui.js";
import { getPlayer } from "@/usecases/world.js";
import { getWidth, resetTransform, translateTransform } from "ridder";

export function renderHud() {
  if (isPlayerAlive()) {
    const player = getPlayer();
    resetTransform();
    translateTransform(10, 10);
    drawHealthBar(0, 0, player.stats, player.stats.healthMax * 10, 5);
    resetTransform();
    drawExperienceBar(0, 0, player.stats, getWidth(), 1);
  }
}
