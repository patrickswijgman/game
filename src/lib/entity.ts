import { addCameraTransform, delta, drawSprite, getDistance, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import { Sprite, Texture, Type } from "@/consts.ts";
import { angle, anim, animAngle, animScaleX, animScaleY, animX, animY, caster, health, healthDeplete, healthDepleteTime, healthMax, hitboxH, hitboxOffsetX, hitboxOffsetY, hitboxW, hitboxX, hitboxY, isFlipped, posX, posY, shadow, sprite, staggerTime, type, velX, velY, weapon, windupTime } from "@/data.ts";
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
  hitboxX[id] = posX[id] + x;
  hitboxY[id] = posY[id] + y;
  hitboxW[id] = w;
  hitboxH[id] = h;
  hitboxOffsetX[id] = x;
  hitboxOffsetY[id] = y;
}

export function isHitboxIntersection(a: number, b: number) {
  return hitboxX[a] < hitboxX[b] + hitboxW[b] && hitboxX[a] + hitboxW[a] > hitboxX[b] && hitboxY[a] < hitboxY[b] + hitboxH[b] && hitboxY[a] + hitboxH[a] > hitboxY[b];
}

export function setHealth(id: number, hp: number) {
  health[id] = hp;
  healthMax[id] = hp;
}

export function updatePosition(id: number) {
  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;
  hitboxX[id] = posX[id] + hitboxOffsetX[id];
  hitboxY[id] = posY[id] + hitboxOffsetY[id];
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
  }
}

function getTexture(id: number) {
  if (windupTime[id] > 0) {
    return Texture.ATLAS_OUTLINED_DANGER;
  }
  if (staggerTime[id] > 0) {
    return Texture.ATLAS_FLASH;
  }
  if (type[caster[id]] === Type.ENEMY) {
    return Texture.ATLAS_FLASH_DANGER;
  }
  return Texture.ATLAS;
}
