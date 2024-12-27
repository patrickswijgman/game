import { newEntity, setSprites } from "entity.js";
import { polygonFromRect, rect } from "ridder";
import { Scene } from "scene.js";

export function newDummy(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "dummy", x, y);
  setSprites(e, "player", 8, 15, 0, -4, true, 0, 2, true);
  e.height = 10;
  e.hitbox = polygonFromRect(x, y, rect(-4, -10, 8, 10));
  e.radius = 8;
  e.stats.health = 100;
  e.stats.healthMax = 100;
  e.isEnemy = true;
  return e;
}
