import { updateWindAnimation } from "@/anims/wind.js";
import { SpriteId } from "@/core/assets.js";
import { Type } from "@/core/entity.js";
import { Entity } from "@/core/entity.js";
import { addEntity, setShadow, setSprite } from "@/core/entity.js";
import { random } from "ridder";

export function addTree(x: number, y: number) {
  const e = addEntity(Type.TREE, x, y);

  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 0, 3);

  e.tweenTime = random(2000, 3000);

  return e;
}

export function updateTree(e: Entity) {
  updateWindAnimation(e);
}
