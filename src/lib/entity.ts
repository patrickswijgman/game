import { addCameraTransform, delta, drawSprite, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import { Sprite, Texture, Item, type Type } from "@/consts.ts";
import { animAngle, animScaleX, animScaleY, animX, animY, frameH, frameW, frameX, frameY, hitboxH, hitboxOffsetX, hitboxOffsetY, hitboxW, hitboxX, hitboxY, isFlipped, itemSpriteId, pivotX, pivotY, posX, posY, shadowId, spriteId, staggerTime, type, velX, velY, weaponId } from "@/data.ts";
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

  drawEntitySprite(Texture.ATLAS, shadowId[id]);

  translateTransform(animX[id], animY[id]);
  scaleTransform(animScaleX[id], animScaleY[id]);
  rotateTransform(animAngle[id]);

  if (weaponId[id]) {
    drawEntitySprite(Texture.ATLAS, itemSpriteId[weaponId[id]]);
  }

  if (isStaggered(id)) {
    drawEntitySprite(Texture.ATLAS_WHITE, spriteId[id]);
  } else {
    drawEntitySprite(Texture.ATLAS, spriteId[id]);
  }
}

function drawEntitySprite(texture: Texture, id: number) {
  if (id) {
    drawSprite(texture, pivotX[id], pivotY[id], frameX[id], frameY[id], frameW[id], frameH[id]);
  }
}
