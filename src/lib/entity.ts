import { addCameraTransform, delta, drawSprite, getDistance, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import { Sprite, Texture, Type } from "@/consts.ts";
import { angle, anim, animAngle, animScaleX, animScaleY, animX, animY, health, healthDeplete, healthDepleteTime, hitboxH, hitboxW, hitboxX, hitboxY, isEnemyProjectile, isFlipped, posX, posY, shadow, sprite, staggerTime, startX, startY, type, velX, velY, weapon, windupTime } from "@/data.ts";
import { nextEntity } from "@/lib/entities.ts";

export function setupEntity(t: Type, x: number, y: number) {
  const id = nextEntity();
  type[id] = t;
  posX[id] = x;
  posY[id] = y;
  startX[id] = x;
  startY[id] = y;
  animScaleX[id] = 1;
  animScaleY[id] = 1;
  return id;
}

export function isHitboxIntersection(a: number, b: number) {
  const x1 = hitboxX[a] + posX[a];
  const y1 = hitboxY[a] + posY[a];
  const x2 = x1 + hitboxW[a];
  const y2 = y1 + hitboxH[a];
  const x3 = hitboxX[b] + posX[b];
  const y3 = hitboxY[b] + posY[b];
  const x4 = x3 + hitboxW[b];
  const y4 = y3 + hitboxH[b];
  return x1 < x4 && x2 > x3 && y1 < y4 && y2 > y3;
}

export function updatePosition(id: number) {
  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;
}

export function setOrbitPosition(id: number, anchorX: number, anchorY: number, targetX: number, targetY: number, distance: number) {
  posX[id] = anchorX;
  posY[id] = anchorY;
  const dx = targetX - anchorX;
  const dy = targetY - anchorY;
  const d = getDistance(0, 0, dx, dy);
  if (d) {
    posX[id] += (dx / d) * distance;
    posY[id] += (dy / d) * distance;
  }
}

export function setAnimation(id: number, a: number) {
  if (anim[id] !== a) {
    anim[id] = a;
    animX[id] = 0;
    animY[id] = 0;
    animScaleX[id] = 1;
    animScaleY[id] = 1;
    animAngle[id] = 0;
  }
}

export function updateHealthBar(id: number) {
  if (healthDepleteTime[id] === 0) {
    healthDeplete[id] = Math.max(health[id], healthDeplete[id] - (healthDeplete[id] / health[id]) * 2 * delta);
  }
}

export function drawEntity(id: number) {
  resetTransform();
  translateTransform(posX[id], posY[id]);
  addCameraTransform();

  if (isFlipped[id]) {
    scaleTransform(-1, 1);
  }

  scaleTransform(animScaleX[id], animScaleY[id]);

  switch (shadow[id]) {
    case Sprite.PLAYER_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
      break;
    case Sprite.ENEMY_MELEE_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 64, 32, 32, 16);
      break;
    case Sprite.SOUL_SHADOW:
      drawSprite(Texture.ATLAS, -8, -2, 0, 160, 16, 16);
      break;
  }

  rotateTransform(angle[id]);
  translateTransform(animX[id], animY[id]);
  rotateTransform(animAngle[id]);

  const texture = getTexture(id);

  switch (weapon[id]) {
    case Sprite.PLAYER_LONGSWORD:
      drawSprite(texture, -16, -31, 0, 80, 32, 32);
      break;
    case Sprite.ENEMY_MELEE_WEAPON:
      drawSprite(texture, -16, -31, 32, 80, 32, 32);
      break;
  }

  switch (sprite[id]) {
    case Sprite.PLAYER:
      drawSprite(texture, -16, -31, 0, 0, 32, 32);
      break;
    case Sprite.ENEMY_MELEE:
      drawSprite(texture, -16, -31, 64, 0, 32, 32);
      break;
    case Sprite.PROJECTILE_LONGSWORD:
      drawSprite(texture, -16, -16, 0, 112, 32, 32);
      break;
    case Sprite.PROJECTILE_ENEMY_MELEE:
      drawSprite(texture, -16, -16, 32, 112, 32, 32);
      break;
    case Sprite.SOUL:
      drawSprite(Texture.ATLAS, -8, -15, 0, 144, 16, 16);
  }
}

function getTexture(id: number) {
  if (windupTime[id] > 0) {
    if (type[id] === Type.PLAYER) {
      return Texture.ATLAS_OUTLINED;
    } else {
      return Texture.ATLAS_OUTLINED_DANGER;
    }
  }
  if (staggerTime[id] > 0) {
    return Texture.ATLAS_FLASH;
  }
  if (isEnemyProjectile[id]) {
    return Texture.ATLAS_FLASH_DANGER;
  }
  return Texture.ATLAS;
}
