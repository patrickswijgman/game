import { addCameraTransform, drawRect, isWithinDistance, resetTransform, translateTransform } from "snuggy";
import { Anim, Color, Enemy, Projectile, Sprite, Type } from "@/consts.ts";
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
  isFlipped,
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
  shadow,
  sprite,
  targetX,
  targetY,
  variant,
  velX,
  velY,
  weapon,
  windup,
  windupTime,
} from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { setAnimation, setupEntity, updatePosition } from "@/lib/entity.ts";
import { halt, seek } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

export function setupEnemy(x: number, y: number, enemyVariant: Enemy) {
  const id = setupEntity(Type.ENEMY, x, y);
  variant[id] = enemyVariant;

  switch (variant[id]) {
    case Enemy.MELEE:
      {
        sprite[id] = Sprite.ENEMY_MELEE;
        shadow[id] = Sprite.ENEMY_MELEE_SHADOW;
        weapon[id] = Sprite.ENEMY_MELEE_WEAPON;
        hitboxX[id] = -5;
        hitboxY[id] = -15;
        hitboxW[id] = 10;
        hitboxH[id] = 15;
        health[id] = 50;
        healthMax[id] = 50;
        movementSpeed[id] = 0.5;
        radius[id] = 20;
        projectile[id] = Projectile.ENEMY_MELEE;
        projectileDamage[id] = 10;
        projectileRange[id] = 20;
        projectileSpeed[id] = 1;
        windup[id] = 300;
        recovery[id] = 250;
        cooldown[id] = 500;
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

  if (recoveryTime[id] === 0) {
    seek(id, posX[playerId], posY[playerId], movementSpeed[id]);
    halt(id, posX[playerId], posY[playerId], projectileRange[id]);
    updatePosition(id);
    isFlipped[id] = posX[playerId] < posX[id] ? 1 : 0;
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

export function drawEnemyHealthBar(id: number) {
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
