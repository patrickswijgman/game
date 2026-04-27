import { delta, drawSprite, getDistance, isInputDown, pointerWorldX } from "snuggy";
import { Input, Texture, Type } from "@/consts.ts";
import { isFlipped, posX, posY, setPlayer, velX, velY } from "@/data.ts";
import { addAnimationTransform, setEntityTransform, setupEntity } from "@/lib/entity.ts";

export function setupPlayer(x: number, y: number) {
  const i = setupEntity(Type.PLAYER, x, y);
  setPlayer(i);
}

export function updatePlayer(i: number) {
  velX[i] = 0;
  velY[i] = 0;

  if (isInputDown(Input.UP)) {
    velY[i] -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    velY[i] += 1;
  }
  if (isInputDown(Input.LEFT)) {
    velX[i] -= 1;
  }
  if (isInputDown(Input.RIGHT)) {
    velX[i] += 1;
  }

  const v = getDistance(0, 0, velX[i], velY[i]);
  if (v) {
    velX[i] /= v;
    velY[i] /= v;
  }

  posX[i] += velX[i] * delta;
  posY[i] += velY[i] * delta;

  isFlipped[i] = pointerWorldX < posX[i];
}

export function drawPlayer(i: number) {
  setEntityTransform(i, true);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 32);
  addAnimationTransform(i);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
}
