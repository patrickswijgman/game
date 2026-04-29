import { Sprite } from "@/consts.ts";
import { frameH, frameW, frameX, frameY, pivotX, pivotY } from "@/data.ts";

export function setupSprites() {
  setSprite(Sprite.PLAYER, 16, 31, 0, 0, 32, 32);
  setSprite(Sprite.PLAYER_SHADOW, 16, 3, 0, 0, 32, 16);
  setSprite(Sprite.PLAYER_LONGSWORD, 16, 31, 0, 80, 32, 32);
  setSprite(Sprite.ENEMY_MELEE, 16, 31, 32, 0, 32, 32);
}

function setSprite(id: Sprite, px: number, py: number, fx: number, fy: number, fw: number, fh: number) {
  pivotX[id] = -px;
  pivotY[id] = -py;
  frameX[id] = fx;
  frameY[id] = fy;
  frameW[id] = fw;
  frameH[id] = fh;
}
