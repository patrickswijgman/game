import { newEntity, setSprites } from "entity.js";
import { random } from "ridder";
import { Scene } from "scene.js";

export function newPineTree(scene: Scene, x: number, y: number) {
  const e = newEntity(scene, "tree", x, y);

  setSprites(e, "tree_pine", 15, 31, 0, 0, true, 0, 6);

  e.tweenDuration = random(15, 20) * 100;

  return e;
}
