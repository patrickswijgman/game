import { getAngle, getDistance, pointerWorldX, pointerWorldY } from "snuggy";
import { Projectile, Sprite, Type } from "@/consts.ts";
import { angle, caster, damage, enemies, enemiesCount, health, healthDepleteTime, hitboxW, lastHitBy, lifeTime, playerId, posX, posY, serial, serialCount, setSerialCount, speed, sprite, staggerTime, type, variant, velX, velY } from "@/data.ts";
import { destroyEntity } from "@/lib/entities.ts";
import { isHitboxIntersection, move, setHitbox, setupEntity } from "@/lib/entity.ts";
import { setTimer } from "@/lib/timer.ts";

export function setupProjectile(x: number, y: number, v: Projectile, casterId: number) {
  const isPlayer = type[casterId] === Type.PLAYER;
  const casterOffsetX = 0;
  const casterOffsetY = -5;
  const targetOffsetX = 0;
  const targetOffsetY = isPlayer ? 0 : -5;
  const rangeOffset = hitboxW[casterId];
  const targetX = (isPlayer ? pointerWorldX : posX[playerId]) + targetOffsetX;
  const targetY = (isPlayer ? pointerWorldY : posY[playerId]) + targetOffsetY;

  const dx = targetX - x;
  const dy = targetY - y;
  const d = getDistance(0, 0, dx, dy);
  if (d) {
    x += (dx / d) * rangeOffset;
    y += (dy / d) * rangeOffset;
  }

  x += casterOffsetX;
  y += casterOffsetY;

  setSerialCount(serialCount + 1);

  const id = setupEntity(Type.PROJECTILE, x, y);
  variant[id] = v;
  caster[id] = casterId;
  serial[id] = serialCount;
  angle[id] = getAngle(x, y, targetX, targetY);

  switch (variant[id]) {
    case Projectile.LONGSWORD:
      {
        sprite[id] = Sprite.PROJECTILE_LONGSWORD;
        setHitbox(id, -8, -8, 16, 16);
        setTimer(lifeTime, id, 100);
        speed[id] = 0.5;
      }
      break;
  }

  if (d) {
    velX[id] = (dx / d) * speed[id];
    velY[id] = (dy / d) * speed[id];
  }

  return id;
}

export function updateProjectile(id: number) {
  move(id);
  hit(id);
}

function hit(id: number) {
  const casterId = caster[id];
  const isPlayer = type[casterId] === Type.PLAYER;

  if (isPlayer) {
    for (let i = 0; i < enemiesCount; i++) {
      const enemyId = enemies[i];
      hitTarget(id, casterId, enemyId);
    }
  } else {
    hitTarget(id, casterId, playerId);
  }
}

function hitTarget(id: number, casterId: number, targetId: number) {
  if (lastHitBy[targetId] !== serial[id] && isHitboxIntersection(id, targetId)) {
    lastHitBy[targetId] = serial[id];
    dealDamage(casterId, targetId);
  }
}

function dealDamage(casterId: number, targetId: number) {
  setTimer(healthDepleteTime, targetId, 250);

  health[targetId] -= Math.min(health[targetId], damage[casterId]);
  setTimer(staggerTime, targetId, 150);

  if (health[targetId] === 0) {
    destroyEntity(targetId);
  }
}
