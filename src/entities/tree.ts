import { SpriteId } from "@/core/assets.js";
import { AnimationId, applyAnimationTransform, drawShadow, Entity, setAnimation, Type } from "@/core/entity.js";
import { addEntity } from "@/entities/entity.js";
import { drawSprite, random } from "ridder";

export function addTree(x: number, y: number) {
  const e = addEntity(Type.TREE, x, y);

  setAnimation(e, AnimationId.WIND, random(2000, 3000));

  return e;
}

export function renderTree(e: Entity) {
  const x = -8;
  const y = -15;
  drawShadow(SpriteId.TREE_SHADOW, x, y + 3);
  applyAnimationTransform(e);
  drawSprite(SpriteId.TREE_PINE, x, y);
}
