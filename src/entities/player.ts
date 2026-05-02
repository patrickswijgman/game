import { isInputDown, pointerWorldX } from "snuggy";
import { Input, Item, Sprite, Type } from "@/consts.ts";
import { cooldown, cooldownTime, isFlipped, posX, posY, projectile, recovery, recoveryTime, setPlayerId, shadow, speed, sprite, velX, velY } from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { animateBreathe, animateWalk } from "@/lib/anims.ts";
import { move, setHealth, setHitbox, setupEntity } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { seek } from "@/lib/steering.ts";
import { setTimer } from "@/lib/timer.ts";

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

  seek(id, x, y);
  move(id);

  isFlipped[id] = pointerWorldX < posX[id] ? 1 : 0;

  if (velX[id] || velY[id]) {
    animateWalk(id);
  } else {
    animateBreathe(id);
  }

  if (isInputDown(Input.ATTACK) && cooldownTime[id] === 0) {
    setTimer(cooldownTime, id, cooldown[id]);
    setTimer(recoveryTime, id, recovery[id]);
    setupProjectile(projectile[id], id);
  }
}
