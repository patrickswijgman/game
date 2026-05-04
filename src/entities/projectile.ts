import { getAngle, isWithinDistance } from "snuggy";
import { Projectile, Sprite, Type } from "@/consts.ts";
import {
  angle,
  depth,
  enemies,
  enemiesCount,
  health,
  healthDepleteTime,
  hitboxH,
  hitboxW,
  hitboxX,
  hitboxY,
  immuneTime,
  isEnemyProjectile,
  lastHitBy,
  playerId,
  posX,
  posY,
  projectileDamage,
  projectileRange,
  projectileSpeed,
  serial,
  serialCount,
  setSerialCount,
  sprite,
  staggerTime,
  startX,
  startY,
  targetX,
  targetY,
  type,
  variant,
  velX,
  velY,
  windupTime,
} from "@/data.ts";
import { destroyEntity } from "@/lib/entities.ts";
import { isHitboxIntersection, setOrbitPosition, setupEntity, updatePosition } from "@/lib/entity.ts";
import { seek } from "@/lib/steering.ts";

export function setupProjectile(projectileVariant: Projectile, casterId: number) {
  const casterOffsetX = 0;
  const casterOffsetY = -hitboxH[casterId] / 3;
  const casterX = posX[casterId] + casterOffsetX;
  const casterY = posY[casterId] + casterOffsetY;

  setSerialCount(serialCount + 1);

  const id = setupEntity(Type.PROJECTILE, casterX, casterY);
  variant[id] = projectileVariant;
  serial[id] = serialCount;
  depth[id] = -casterOffsetY;
  projectileDamage[id] = projectileDamage[casterId];
  projectileRange[id] = projectileRange[casterId];
  projectileSpeed[id] = projectileSpeed[casterId];
  isEnemyProjectile[id] = type[casterId] === Type.ENEMY ? 1 : 0;

  switch (variant[id]) {
    case Projectile.LONGSWORD:
      {
        sprite[id] = Sprite.PROJECTILE_LONGSWORD;
        hitboxX[id] = -5;
        hitboxY[id] = -5;
        hitboxW[id] = 10;
        hitboxH[id] = 10;
      }
      break;

    case Projectile.ENEMY_MELEE:
      {
        sprite[id] = Sprite.PROJECTILE_ENEMY_MELEE;
        hitboxX[id] = -4;
        hitboxY[id] = -4;
        hitboxW[id] = 8;
        hitboxH[id] = 8;
      }
      break;
  }

  const x = targetX[casterId];
  const y = targetY[casterId];
  const o = (hitboxW[casterId] + hitboxH[casterId]) / 2;

  seek(id, x, y, projectileSpeed[id]);
  setOrbitPosition(id, casterX, casterY, x, y, o);
  angle[id] = getAngle(0, 0, velX[id], velY[id]);

  return id;
}

export function updateProjectile(id: number) {
  updatePosition(id);

  if (!isWithinDistance(startX[id], startY[id], posX[id], posY[id], projectileRange[id])) {
    destroyEntity(id);
    return;
  }

  if (isEnemyProjectile[id]) {
    hitTarget(id, playerId);
  } else {
    for (let i = 0; i < enemiesCount; i++) {
      const enemyId = enemies[i];
      hitTarget(id, enemyId);
    }
  }
}

function hitTarget(id: number, targetId: number) {
  if (lastHitBy[targetId] !== serial[id] && isHitboxIntersection(id, targetId)) {
    lastHitBy[targetId] = serial[id];

    if (type[targetId] === Type.PLAYER) {
      if (immuneTime[targetId] === 0) {
        immuneTime[targetId] = 500;
      } else {
        return;
      }
    }

    health[targetId] -= Math.min(health[targetId], projectileDamage[id]);

    windupTime[targetId] = 0;
    staggerTime[targetId] = 100;
    healthDepleteTime[targetId] = 200;

    if (health[targetId] === 0) {
      destroyEntity(targetId);
    }
  }
}
