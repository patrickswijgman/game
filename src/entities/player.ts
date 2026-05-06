import { drawRect, drawSprite, isInputDown, pointerWorldX, pointerWorldY, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { Anim, Color, Input, Item, Texture, Type } from "@/consts.ts";
import { cooldown, cooldownTime, health, healthDeplete, healthMax, hitboxH, hitboxW, hitboxX, hitboxY, movementSpeed, playerId, posX, posY, projectile, recovery, recoveryTime, setPlayerId, staggerTime, targetX, targetY, type, velX, velY, weapon, windup, windupTime } from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { updateAnimation } from "@/lib/anims.ts";
import { addAnimationTransform, addEntityTransform, setAnimation, setupEntity, updateHealthBar, updatePosition, updateTimers } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { seek } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

export function setupPlayer(x: number, y: number) {
  const id = setupEntity(Type.PLAYER, x, y);
  hitboxX[id] = -5;
  hitboxY[id] = -15;
  hitboxW[id] = 10;
  hitboxH[id] = 15;
  health[id] = 100;
  healthMax[id] = 100;
  movementSpeed[id] = 1;
  setItem(id, Item.LONGSWORD);
  setPlayerId(id);
}

export function updatePlayer(id: number) {
  updateTimers(id);
  updateAnimation(id);
  updateHealthBar(id);

  if (staggerTime[id] === 0) {
    velX[id] = 0;
    velY[id] = 0;

    let x = posX[id];
    let y = posY[id];
    if (isInputDown(Input.UP)) {
      y -= 1;
    }
    if (isInputDown(Input.DOWN)) {
      y += 1;
    }
    if (isInputDown(Input.LEFT)) {
      x -= 1;
    }
    if (isInputDown(Input.RIGHT)) {
      x += 1;
    }

    let speed = movementSpeed[id];
    if (windupTime[id] > 0) {
      speed *= 0.25;
    }

    seek(id, x, y, speed);
    updatePosition(id);

    if (velX[id] || velY[id]) {
      setAnimation(id, Anim.WALK);
    } else {
      setAnimation(id, Anim.BREATHE);
    }

    if (tickTimer(windupTime, id)) {
      cooldownTime[id] = cooldown[id];
      recoveryTime[id] = recovery[id];
      targetX[id] = pointerWorldX;
      targetY[id] = pointerWorldY;
      setupProjectile(projectile[id], id);
    }

    if (isInputDown(Input.ATTACK) && cooldownTime[id] === 0 && windupTime[id] === 0) {
      windupTime[id] = windup[id];
    }
  }

  const texture = getTexture(id);
  const isFlipped = pointerWorldX < posX[id];

  resetTransform();
  addEntityTransform(id, true, isFlipped);
  drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
  addAnimationTransform(id);
  drawWeapon(texture, id);
  drawSprite(texture, -16, -31, 0, 0, 32, 32);
}

function drawWeapon(texture: Texture, id: number) {
  switch (weapon[id]) {
    case Item.LONGSWORD:
      drawSprite(texture, -16, -31, 0, 80, 32, 32);
      break;
  }
}

function getTexture(id: number) {
  if (staggerTime[id] > 0) {
    return Texture.ATLAS_FLASH;
  }
  if (windupTime[id] > 0) {
    return Texture.ATLAS_OUTLINED;
  }
  return Texture.ATLAS;
}

export function drawPlayerHealthBar() {
  const width = 40;
  const height = 3;
  const hp = (health[playerId] / healthMax[playerId]) * width;
  const hd = (healthDeplete[playerId] / healthMax[playerId]) * width;

  resetTransform();
  translateTransform(20, 20);
  scaleTransform(2);

  drawRect(-1, -1, width + 2, height + 2, Color.BORDER, true);
  drawRect(0, 0, hd, height, Color.DEPLETE, true);
  drawRect(0, 0, hp, height, Color.HEALTH_DARK, true);
  drawRect(0, 0, hp, height - 1, Color.HEALTH, true);
}
