import { delta, drawSprite, ease, elapsed, getDistance, isInputDown, pointerWorldX } from "snuggy";
import { Input, Texture, Type } from "@/consts.ts";
import { animScaleX, animScaleY, animY, isFlipped, posX, posY, setPlayer, velX, velY } from "@/data.ts";
import { addEntityAnimationTransform, resetEntityAnimation, setEntityTransform, setupEntity } from "@/lib/entity.ts";

export function setupPlayer(x: number, y: number) {
  const i = setupEntity(Type.PLAYER, x, y);
  setPlayer(i);
}

export function updatePlayer(id: number) {
  velX[id] = 0;
  velY[id] = 0;

  if (isInputDown(Input.UP)) {
    velY[id] -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    velY[id] += 1;
  }
  if (isInputDown(Input.LEFT)) {
    velX[id] -= 1;
  }
  if (isInputDown(Input.RIGHT)) {
    velX[id] += 1;
  }

  const v = getDistance(0, 0, velX[id], velY[id]);
  if (v) {
    velX[id] /= v;
    velY[id] /= v;
  }

  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;

  isFlipped[id] = pointerWorldX < posX[id];

  resetEntityAnimation(id);

  if (v) {
    const d = 200;
    const t = (elapsed % d) / d;
    animY[id] = -4 * ease(t) * delta;
  } else {
    const d = 2000;
    const t = (elapsed % d) / d;
    animScaleX[id] = 1 + 0.1 * ease(t) * delta;
    animScaleY[id] = 1 + 0.1 * ease(t) * delta;
  }

  setEntityTransform(id, true);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
  addEntityAnimationTransform(id);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
}
