import { updateWindAnimation } from "@/anims/wind.js";
import { Entity } from "@/data/entity.js";
import { SpriteId } from "@/enums/assets.js";
import { EntityType } from "@/enums/entity.js";
import { addEntity, setShadow, setSprite } from "@/usecases/entity.js";
import { random } from "ridder";

export function addTree(sceneId: number, x: number, y: number) {
  const e = addEntity(EntityType.TREE, sceneId, x, y);
  setSprite(e, SpriteId.TREE_PINE, 8, 15);
  setShadow(e, SpriteId.TREE_SHADOW, 8, 12);
  e.tweenTime = random(1500, 2000);
  return e;
}

export function updateTree(e: Entity) {
  updateWindAnimation(e);
}
