import { SpriteId } from "@/core/assets.js";
import { AnimationId, setAnimation, setShadow, setSprite, Type } from "@/core/entity.js";
import { addEntity } from "@/entities/entity.js";
import { random } from "ridder";

export function addTree(x: number, y: number) {
  const e = addEntity(Type.TREE, x, y);

  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 0, 3);
  setAnimation(e, AnimationId.WIND, random(2000, 3000));

  return e;
}
