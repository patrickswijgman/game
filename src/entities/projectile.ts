import { getAngle, getDistance, pointerWorldX, pointerWorldY } from "snuggy";
import { Projectile, Sprite, Type } from "@/consts.ts";
import { angle, caster, damage, enemies, enemiesCount, health, hitboxW, lifeTime, playerId, posX, posY, speed, sprite, staggerTime, type, variant, velX, velY } from "@/data.ts";
import { destroyEntity } from "@/lib/entities.ts";
import { isHitboxIntersection, move, setHitbox, setupEntity } from "@/lib/entity.ts";

export function setupProjectile(x: number, y: number, v: Projectile, casterId: number) {
  const isPlayer = type[casterId] === Type.PLAYER;

  const casterOffsetX = 0;
  const casterOffsetY = -5;
  const targetOffsetX = 0;
  const targetOffsetY = isPlayer ? 0 : -5;
  const rangeOffset = hitboxW[casterId] + 2;

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

  const id = setupEntity(Type.PROJECTILE, x, y);
  variant[id] = v;
  caster[id] = casterId;
  angle[id] = getAngle(x, y, targetX, targetY);

  if (d) {
    velX[id] = (dx / d) * speed[id];
    velY[id] = (dy / d) * speed[id];
  }

  switch (variant[id]) {
    case Projectile.LONGSWORD:
      {
        sprite[id] = Sprite.PROJECTILE_LONGSWORD;
        setHitbox(id, -8, -8, 16, 16);
        lifeTime[id] = 100;
      }
      break;
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

  let destroy = false;

  if (isPlayer) {
    for (let i = 0; i < enemiesCount; i++) {
      const targetId = enemies[i];

      if (isHitboxIntersection(id, targetId)) {
        dealDamage(casterId, targetId);
        destroy = true;
      }
    }
  } else if (isHitboxIntersection(id, playerId)) {
    dealDamage(casterId, playerId);
    destroy = true;
  }

  if (destroy) {
    destroyEntity(id);
  }
}

function dealDamage(casterId: number, targetId: number) {
  health[targetId] -= Math.min(health[targetId], damage[casterId]);
  staggerTime[targetId] = 150;

  if (health[targetId] === 0) {
    destroyEntity(targetId);
  }
}
