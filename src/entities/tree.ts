import { updateWindAnimation } from "@/anims/wind.js";
import { SpriteId } from "@/consts/assets.js";
import { SceneId } from "@/consts/scene.js";
import { Type } from "@/consts/type.js";
import { Entity } from "@/data/entity.js";
import { addEntity, setShadow, setSprite } from "@/usecases/entity.js";
import { random } from "ridder";

export function addTree(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.TREE, sceneId, x, y);
  setSprite(e, SpriteId.TREE_PINE);
  setShadow(e, SpriteId.TREE_SHADOW);
  e.tweenTime = random(2000, 3000);
  return e;
}

export function updateTree(e: Entity) {
  updateWindAnimation(e);
}
