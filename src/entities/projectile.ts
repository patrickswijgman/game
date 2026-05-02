import { getAngle } from "snuggy";
import { Projectile, Sprite, Type } from "@/consts.ts";
import { angle, caster, damage, depth, enemies, enemiesCount, health, healthDepleteTime, hitboxH, hitboxW, immuneTime, lastHitBy, lifeTime, playerId, posX, posY, serial, serialCount, setSerialCount, speed, sprite, staggerTime, targetX, targetY, type, variant, velX, velY } from "@/data.ts";
import { destroyEntity } from "@/lib/entities.ts";
import { isHitboxIntersection, move, orbit, setHitbox, setupEntity } from "@/lib/entity.ts";
import { seek } from "@/lib/steering.ts";

export function setupProjectile(projectileVariant: Projectile, casterId: number) {
  const casterOffsetX = 0;
  const casterOffsetY = -5;
  const casterX = posX[casterId] + casterOffsetX;
  const casterY = posY[casterId] + casterOffsetY;

  setSerialCount(serialCount + 1);

  const id = setupEntity(Type.PROJECTILE, casterX, casterY);
  variant[id] = projectileVariant;
  caster[id] = casterId;
  serial[id] = serialCount;
  depth[id] = -casterOffsetY;

  switch (variant[id]) {
    case Projectile.LONGSWORD:
      {
        sprite[id] = Sprite.PROJECTILE_LONGSWORD;
        setHitbox(id, -5, -5, 10, 10);
        lifeTime[id] = 100;
        speed[id] = 1;
      }
      break;
  }

  const x = targetX[casterId];
  const y = targetY[casterId];
  const o = (hitboxW[casterId] + hitboxH[casterId]) / 2;

  seek(id, x, y);
  orbit(id, casterX, casterY, x, y, o);
  angle[id] = getAngle(0, 0, velX[id], velY[id]);

  return id;
}

export function updateProjectile(id: number) {
  move(id);
  hit(id);
}

function hit(id: number) {
  const casterId = caster[id];

  if (type[casterId] === Type.PLAYER) {
    for (let i = 0; i < enemiesCount; i++) {
      const enemyId = enemies[i];
      dealDamageToTarget(id, casterId, enemyId);
    }
  } else {
    dealDamageToTarget(id, casterId, playerId);
  }
}

function dealDamageToTarget(id: number, casterId: number, targetId: number) {
  if (lastHitBy[targetId] !== serial[id] && isHitboxIntersection(id, targetId)) {
    lastHitBy[targetId] = serial[id];

    if (type[targetId] === Type.PLAYER) {
      if (immuneTime[targetId] === 0) {
        immuneTime[targetId] = 500;
      } else {
        return;
      }
    }

    health[targetId] -= Math.min(health[targetId], damage[casterId]);

    staggerTime[targetId] = 100;
    healthDepleteTime[targetId] = 200;

    if (health[targetId] === 0) {
      destroyEntity(targetId);
    }
  }
}
