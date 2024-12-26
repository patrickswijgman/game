import { newEntity } from "entity.js";
import { polygonFromRect, rect } from "ridder";
import { Scene } from "scene.js";

export function newDummy(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, x, y);
  e.type = "dummy";
  e.spriteId = "player";
  e.pivot.x = 8;
  e.pivot.y = 15;
  e.shadowId = "player_shadow";
  e.shadowOffset.x = 0;
  e.shadowOffset.y = 2;
  e.centerOffset.x = 0;
  e.centerOffset.y = -4;
  e.height = 10;
  e.hitbox = polygonFromRect(x, y, rect(-4, -10, 8, 10));
  e.stats.health = 100;
  e.stats.healthMax = 100;
  e.isEnemy = true;
  return e;
}
