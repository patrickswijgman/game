import { addCameraTransform, delta, drawRect, drawSprite, getDistance, resetTransform, rotateTransform, scaleTransform, translateTransform } from "snuggy";
import { Color, Sprite, Texture, Type } from "@/consts.ts";
import { angle, animAngle, animScaleX, animScaleY, animX, animY, caster, health, healthDeplete, healthDepleteTime, healthMax, hitboxH, hitboxOffsetX, hitboxOffsetY, hitboxW, hitboxX, hitboxY, isFlipped, posX, posY, shadow, sprite, staggerTime, type, velX, velY, weapon } from "@/data.ts";
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
  healthDeplete[id] = hp;
}

export function move(id: number) {
  posX[id] += velX[id] * delta;
  posY[id] += velY[id] * delta;
  hitboxX[id] = posX[id] + hitboxOffsetX[id];
  hitboxY[id] = posY[id] + hitboxOffsetY[id];
}

export function orbit(id: number, anchorX: number, anchorY: number, targetX: number, targetY: number, distance: number) {
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

  switch (shadow[id]) {
    case Sprite.PLAYER_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
      break;
    case Sprite.ENEMY_MELEE_SHADOW:
      drawSprite(Texture.ATLAS, -16, -3, 32, 32, 32, 16);
      break;
  }

  rotateTransform(angle[id]);

  translateTransform(animX[id], animY[id]);
  scaleTransform(animScaleX[id], animScaleY[id]);
  rotateTransform(animAngle[id]);

  let texture = Texture.ATLAS;
  if (staggerTime[id] > 0) {
    texture = Texture.FLASH;
  } else if (type[caster[id]] === Type.ENEMY) {
    texture = Texture.DANGER;
  }

  switch (weapon[id]) {
    case Sprite.PLAYER_LONGSWORD:
      drawSprite(texture, -16, -31, 0, 80, 32, 32);
      break;
  }

  switch (sprite[id]) {
    case Sprite.PLAYER:
      drawSprite(texture, -16, -31, 0, 0, 32, 32);
      break;
    case Sprite.ENEMY_MELEE:
      drawSprite(texture, -16, -31, 32, 0, 32, 32);
      break;
    case Sprite.PROJECTILE_LONGSWORD:
      drawSprite(texture, -16, -16, 0, 112, 32, 32);
      break;
  }
}

export function updateHealthBar(id: number) {
  if (healthDepleteTime[id] === 0) {
    healthDeplete[id] = Math.max(health[id], healthDeplete[id] - (healthDeplete[id] / health[id]) * 2 * delta);
  }
}

export function drawHealthBar(id: number) {
  if (health[id] === healthMax[id]) {
    return;
  }

  const width = hitboxW[id];
  const height = 2;
  const hp = (health[id] / healthMax[id]) * width;
  const hd = (healthDeplete[id] / healthMax[id]) * width;
  const x = posX[id] + -width / 2;
  const y = posY[id] - hitboxH[id] - 5;

  resetTransform();
  translateTransform(x, y);
  addCameraTransform();

  drawRect(-1, -1, width + 2, height + 2, Color.BORDER, true);
  drawRect(0, 0, hd, height, Color.DEPLETE, true);
  drawRect(0, 0, hp, height, Color.HEALTH, true);
}
