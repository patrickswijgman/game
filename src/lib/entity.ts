import { addCameraTransform, delta, drawSprite, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import { Item, Sprite, Texture, type Type } from "@/consts.ts";
import { animAngle, animScaleX, animScaleY, animX, animY, hitboxH, hitboxOffsetX, hitboxOffsetY, hitboxW, hitboxX, hitboxY, isFlipped, posX, posY, shadowId, spriteId, staggerTime, type, velX, velY, weaponId } from "@/data.ts";
import { nextEntity } from "@/lib/entities.ts";

export function setupEntity(t: Type, x: number, y: number) {
  const i = nextEntity();
  type[i] = t;
  posX[i] = x;
  posY[i] = y;
  animScaleX[i] = 1;
  animScaleY[i] = 1;
  return i;
}

export function setHitbox(id: number, x: number, y: number, w: number, h: number) {
  hitboxOffsetX[id] = x;
  hitboxOffsetY[id] = y;
  hitboxW[id] = w;
  hitboxH[id] = h;
  updateHitbox(id);
}

export function updateHitbox(id: number) {
  hitboxX[id] = posX[id] + hitboxOffsetX[id];
  hitboxY[id] = posY[id] + hitboxOffsetY[id];
}

export function isHitboxIntersection(a: number, b: number) {
  return hitboxX[a] < hitboxX[b] + hitboxW[b] && hitboxX[a] + hitboxW[a] > hitboxX[b] && hitboxY[a] < hitboxY[b] + hitboxH[b] && hitboxY[a] + hitboxH[a] > hitboxY[b];
}

export function move(id: number) {
  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;
  updateHitbox(id);
}

export function isMoving(id: number) {
  return velX[id] !== 0 || velY[id] !== 0;
}

export function isStaggered(id: number) {
  return staggerTime[id] > 0;
}

export function resetAnimation(id: number) {
  animX[id] = 0;
  animY[id] = 0;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  animAngle[id] = 0;
}

export function drawEntity(id: number) {
  resetTransform();
  translateTransform(posX[id], posY[id]);
  addCameraTransform();

  if (isFlipped[id]) {
    scaleTransform(-1, 1);
  }

  switch (shadowId[id]) {
    case Sprite.PLAYER_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
      break;
    case Sprite.ENEMY_MELEE_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 32, 32, 32, 16);
      break;
  }

  translateTransform(animX[id], animY[id]);
  scaleTransform(animScaleX[id], animScaleY[id]);
  rotateTransform(animAngle[id]);

  switch (weaponId[id]) {
    case Item.LONGSWORD:
      drawSprite(Texture.ATLAS, -16, -31, 0, 80, 32, 32);
      break;
  }

  const texture = isStaggered(id) ? Texture.ATLAS_WHITE : Texture.ATLAS;
  switch (spriteId[id]) {
    case Sprite.PLAYER:
      drawSprite(texture, -16, -31, 0, 0, 32, 32);
      break;
    case Sprite.ENEMY_MELEE:
      drawSprite(texture, -16, -31, 32, 0, 32, 32);
      break;
  }
}
