import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/entity.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { addEntity, setSprites } from "@/usecases/entity.js";
import { setVector } from "ridder";

export function addPlayerPreview(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.PLAYER_PREVIEW, sceneId, x, y);
  setSprites(e, SpriteId.PLAYER, SpriteId.PLAYER_SHADOW, SpriteId.PLAYER_FLASH);
  setVector(e.scale, 4, 4);

  e.sheet = game.sheet;

  return e;
}
