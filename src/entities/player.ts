import { drawRect, isInputDown, pointerWorldX, pointerWorldY, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { Anim, Color, Input, Item, Sprite, Type } from "@/consts.ts";
import { cooldown, cooldownTime, health, healthDeplete, healthMax, isFlipped, posX, posY, projectile, recovery, recoveryTime, setPlayerId, shadow, speed, sprite, targetX, targetY, velX, velY } from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { setAnimation, setHealth, setHitbox, setupEntity, updatePosition } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { seek } from "@/lib/steering.ts";

export function setupPlayer(x: number, y: number) {
  const id = setupEntity(Type.PLAYER, x, y);
  sprite[id] = Sprite.PLAYER;
  shadow[id] = Sprite.PLAYER_SHADOW;
  setHealth(id, 100);
  setHitbox(id, -5, -15, 10, 15);
  speed[id] = 1;
  setItem(id, Item.LONGSWORD);
  setPlayerId(id);
}

export function updatePlayer(id: number) {
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

  seek(id, x, y, recoveryTime[id] > 0 ? 0.5 : 1);
  updatePosition(id);

  isFlipped[id] = pointerWorldX < posX[id] ? 1 : 0;

  if (velX[id] || velY[id]) {
    setAnimation(id, Anim.WALK);
  } else {
    setAnimation(id, Anim.BREATHE);
  }

  if (isInputDown(Input.ATTACK) && cooldownTime[id] === 0) {
    targetX[id] = pointerWorldX;
    targetY[id] = pointerWorldY;
    cooldownTime[id] = cooldown[id];
    recoveryTime[id] = recovery[id];
    setupProjectile(projectile[id], id);
  }
}

export function drawPlayerHealthBar(id: number) {
  const width = 40;
  const height = 3;
  const hp = (health[id] / healthMax[id]) * width;
  const hd = (healthDeplete[id] / healthMax[id]) * width;
  const x = 20;
  const y = 20;

  resetTransform();
  translateTransform(x, y);
  scaleTransform(2);

  drawRect(-1, -1, width + 2, height + 2, Color.BORDER, true);
  drawRect(0, 0, hd, height, Color.DEPLETE, true);
  drawRect(0, 0, hp, height, Color.HEALTH_DARK, true);
  drawRect(0, 0, hp, height - 1, Color.HEALTH, true);
}
