import { SpriteId } from "@/assets.js";
import { Entity, setShadow, setSprite } from "@/entity.js";

export function setupPineTree(e: Entity) {
  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 0, 3);
  return e;
}
