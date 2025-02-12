import { COLOR_HEALTH } from "@/consts/colors.js";
import { EnemyId } from "@/consts/enemy.js";
import { enemies } from "@/data/enemies.js";
import { Entity } from "@/data/entity.js";
import { getScene } from "@/usecases/game.js";
import { drawBar } from "@/usecases/ui.js";
import { applyCameraTransform, resetTransform, translateTransform } from "ridder";

export function getEnemy(id: EnemyId) {
  return enemies[id];
}

export function renderEnemyStatus(e: Entity) {
  if (e.isEnemy && e.sheet.stats.health < e.sheet.stats.healthMax) {
    const scene = getScene(e.sceneId);
    resetTransform();
    applyCameraTransform(scene.camera);
    translateTransform(e.position.x, e.position.y - e.hitbox.h - 5);
    drawBar(-5, 0, e.sheet.stats.health, e.sheet.stats.healthMax, COLOR_HEALTH, 10, 3);
  }
}
