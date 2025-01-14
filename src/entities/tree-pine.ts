import { SpriteId } from "@/assets.js";
import { addEntity, Scene } from "@/scene.js";
import { setVector } from "ridder";

export function newPineTree(scene: Scene, x: number, y: number) {
  const e = addEntity(scene);

  setVector(e.position, x, y);

  e.spriteId = SpriteId.TREE_PINE;
  setVector(e.pivot, 8, 15);

  return e;
}
