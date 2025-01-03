import { newEnemy, setConstraints, setSprites } from "entity.js";
import { Scene } from "scene.js";

export function newDummy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "dummy", x, y);

  setSprites(e, "player", 16, 31, 0, -4, true, 0, 2);
  setConstraints(e, 10, 12);

  e.stats.health = 100;
  e.stats.healthMax = 100;

  return e;
}
