import { addCameraTransform, drawRect, isWithinDistance, resetTransform, translateTransform } from "snuggy";
import { Anim, Color, Enemy, Projectile, Sprite, Type } from "@/consts.ts";
import { cooldown, cooldownTime, damage, health, healthDeplete, healthMax, hitboxH, hitboxW, isFlipped, playerId, posX, posY, projectile, radius, range, recovery, recoveryTime, shadow, speed, sprite, targetX, targetY, variant, velX, velY, weapon, windup, windupTime } from "@/data.ts";
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
        weapon[id] = Sprite.ENEMY_MELEE_WEAPON;
        projectile[id] = Projectile.ENEMY_MELEE;
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

export function drawEnemyHealthBar(id: number) {
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
  drawRect(0, 0, hp, height, Color.HEALTH_DARK, true);
  drawRect(0, 0, hp, height - 1, Color.HEALTH, true);
}
