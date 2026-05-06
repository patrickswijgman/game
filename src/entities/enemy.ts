import { addCameraTransform, drawRect, drawSprite, isWithinDistance, resetTransform, translateTransform } from "snuggy";
import { Anim, Color, Texture, Type } from "@/consts.ts";
import {
  cooldown,
  cooldownTime,
  health,
  healthDeplete,
  healthMax,
  hitboxH,
  hitboxW,
  hitboxX,
  hitboxY,
  isEnemy,
  movementSpeed,
  playerId,
  posX,
  posY,
  projectile,
  projectileDamage,
  projectileRange,
  projectileSpeed,
  radius,
  recovery,
  recoveryTime,
  staggerTime,
  targetX,
  targetY,
  type,
  velX,
  velY,
  windup,
  windupTime,
} from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { updateAnimation } from "@/lib/anims.ts";
import { addAnimationTransform, addEntityTransform, setAnimation, setupEntity, updateHealthBar, updatePosition, updateTimers } from "@/lib/entity.ts";
import { halt, seek } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

export function setupEnemy(t: Type, x: number, y: number) {
  const id = setupEntity(t, x, y);
  isEnemy[id] = 1;

  switch (type[id]) {
    case Type.ENEMY_MELEE:
      hitboxX[id] = -5;
      hitboxY[id] = -15;
      hitboxW[id] = 10;
      hitboxH[id] = 15;
      radius[id] = 20;
      health[id] = 50;
      healthMax[id] = 50;
      movementSpeed[id] = 0.5;
      projectile[id] = Type.PROJECTILE_ENEMY_MELEE;
      projectileDamage[id] = 10;
      projectileRange[id] = 20;
      projectileSpeed[id] = 1;
      windup[id] = 300;
      recovery[id] = 250;
      cooldown[id] = 500;
      break;
  }

  return id;
}

export function updateEnemy(id: number) {
  updateTimers(id);
  updateAnimation(id);
  updateHealthBar(id);

  if (staggerTime[id] === 0) {
    if (tickTimer(windupTime, id)) {
      cooldownTime[id] = cooldown[id];
      recoveryTime[id] = recovery[id];
      setupProjectile(projectile[id], id);
    }

    if (windupTime[id] === 0) {
      if (recoveryTime[id] === 0) {
        seek(id, posX[playerId], posY[playerId], movementSpeed[id]);
        halt(id, posX[playerId], posY[playerId], projectileRange[id]);
        updatePosition(id);
      }

      if (isWithinDistance(posX[id], posY[id], posX[playerId], posY[playerId], projectileRange[id])) {
        if (cooldownTime[id] === 0) {
          targetX[id] = posX[playerId];
          targetY[id] = posY[playerId] - hitboxH[playerId] / 2;
          windupTime[id] = windup[id];
        }
        setAnimation(id, Anim.NONE);
      } else if (velX[id] || velY[id]) {
        setAnimation(id, Anim.WALK);
      } else {
        setAnimation(id, Anim.NONE);
      }
    }
  }

  const texture = getTexture(id);
  const isFlipped = posX[playerId] < posX[id];

  resetTransform();
  addEntityTransform(id, true, isFlipped);

  switch (type[id]) {
    case Type.ENEMY_MELEE:
      drawSprite(Texture.ATLAS, -16, -3, 64, 32, 32, 16);
      addAnimationTransform(id);
      drawSprite(texture, -16, -31, 32, 80, 32, 32);
      drawSprite(texture, -16, -31, 64, 0, 32, 32);
      break;
  }

  drawHealthBar(id);
}

function getTexture(id: number) {
  if (staggerTime[id] > 0) {
    return Texture.ATLAS_FLASH;
  }
  if (windupTime[id] > 0) {
    return Texture.ATLAS_OUTLINED_DANGER;
  }
  return Texture.ATLAS;
}

function drawHealthBar(id: number) {
  if (health[id] === healthMax[id]) {
    return;
  }

  const width = hitboxW[id];
  const height = 2;
  const hp = (health[id] / healthMax[id]) * width;
  const hd = (healthDeplete[id] / healthMax[id]) * width;
  const x = posX[id] - width / 2;
  const y = posY[id] - hitboxH[id] - 5;

  resetTransform();
  translateTransform(x, y);
  addCameraTransform();

  drawRect(-1, -1, width + 2, height + 2, Color.BORDER, true);
  drawRect(0, 0, hd, height, Color.DEPLETE, true);
  drawRect(0, 0, hp, height, Color.HEALTH_DARK, true);
  drawRect(0, 0, hp, height - 1, Color.HEALTH, true);
}
