import { SpriteId } from "@/consts/assets.js";
import { sprites } from "@/data/sprites.js";

export function getSprite(id: SpriteId) {
  return sprites[id];
}
