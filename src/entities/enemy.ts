import { isWithinDistance } from "snuggy";
import { Anim, Enemy, Projectile, Sprite, Type } from "@/consts.ts";
import { cooldown, cooldownTime, damage, hitboxH, isFlipped, playerId, posX, posY, projectile, radius, range, recovery, recoveryTime, shadow, speed, sprite, targetX, targetY, variant, velX, velY, weapon, windup, windupTime } from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { setAnimation, setHealth, setHitbox, setupEntity, updatePosition } from "@/lib/entity.ts";
import { halt, seek, separate } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

export function setupEnemy(x: number, y: number, enemyVariant: Enemy) {
  const id = setupEntity(Type.ENEMY, x, y);
  variant[id] = enemyVariant;

  switch (variant[id]) {
    case Enemy.MELEE:
      {
        sprite[id] = Sprite.ENEMY_MELEE;
        shadow[id] = Sprite.ENEMY_MELEE_SHADOW;
        setHealth(id, 50);
        setHitbox(id, -6, -16, 12, 16);
        speed[id] = 0.5;
        radius[id] = 20;
        damage[id] = 20;
        range[id] = 15;
        windup[id] = 300;
        cooldown[id] = 300;
        recovery[id] = 300;
        weapon[id] = Sprite.PLAYER_LONGSWORD;
        projectile[id] = Projectile.LONGSWORD;
      }
      break;
  }

  return id;
}

export function updateEnemy(id: number) {
  if (tickTimer(windupTime, id)) {
    cooldownTime[id] = cooldown[id];
    recoveryTime[id] = recovery[id];
    setupProjectile(projectile[id], id);
  }

  if (windupTime[id] > 0) {
    return;
  }

  velX[id] = 0;
  velY[id] = 0;

  seek(id, posX[playerId], posY[playerId], recoveryTime[id] > 0 ? 0 : 1);
  separate(id);

  if (isWithinDistance(posX[id], posY[id], posX[playerId], posY[playerId], range[id])) {
    setAnimation(id, Anim.NONE);

    if (cooldownTime[id] === 0) {
      targetX[id] = posX[playerId];
      targetY[id] = posY[playerId] - hitboxH[playerId] / 2;
      windupTime[id] = windup[id];
    }
  } else if (velX[id] || velY[id]) {
    setAnimation(id, Anim.WALK);
  } else {
    setAnimation(id, Anim.NONE);
  }

  halt(id, posX[playerId], posY[playerId]);
  updatePosition(id);

  isFlipped[id] = posX[playerId] < posX[id] ? 1 : 0;
}
