import { SpriteId } from "@/assets.js";
import { setPhysics, setShadow, setSprite } from "@/entity.js";
import { addEntity, Scene } from "@/scene.js";

export function newPineTree(scene: Scene, x: number, y: number) {
  const e = addEntity(scene);

  setPhysics(e, x, y, false);
  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 0, 3);

  return e;
}
