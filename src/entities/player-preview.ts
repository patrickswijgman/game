import { SpriteId } from "@/consts/assets.js";
import { SceneId } from "@/consts/scene.js";
import { Type } from "@/consts/type.js";
import { game } from "@/data/game.js";
import { addEntity, setShadow, setSprite } from "@/usecases/entity.js";
import { setVector } from "ridder";

export function addPlayerPreview(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER_PREVIEW, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER);
  setShadow(e, SpriteId.PLAYER_SHADOW);
  setVector(e.scale, 4, 4);

  e.sheet = game.sheet;

  return e;
}
