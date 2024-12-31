import { newEnemy, setConstraints, setSprites } from "entity.js";
import { Scene } from "scene.js";

export function newBanditMelee(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "dummy", x, y);

  setSprites(e, "bandit", 15, 31, 0, -4, true, 0, 2);
  setConstraints(e, 10, 12);

  e.stats.health = 10;
  e.stats.healthMax = 10;

  return e;
}
