import { SpriteId } from "@/assets.js";
import { setShadow, setSprite } from "@/entity.js";
import { addEntity, Scene } from "@/scene.js";
import { setVector } from "ridder";

export function newPineTree(scene: Scene, x: number, y: number) {
  const e = addEntity(scene);

  setVector(e.position, x, y);

  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 0, 3);

  return e;
}
