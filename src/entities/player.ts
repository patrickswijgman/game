import { isInputDown, isInputPressed, pointerWorldX } from "snuggy";
import { animateBreathe } from "@/anims/breathe.ts";
import { animateWalk } from "@/anims/walk.ts";
import { Input, Item, Sprite, Type } from "@/consts.ts";
import { isFlipped, posX, posY, projectile, setPlayerId, shadow, speed, sprite, velX, velY } from "@/data.ts";
import { setupProjectile } from "@/entities/projectile.ts";
import { isMoving, move, setHealth, setHitbox, setupEntity } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { seek } from "@/lib/steering.ts";

export function setupPlayer(x: number, y: number) {
  const id = setupEntity(Type.PLAYER, x, y);
  sprite[id] = Sprite.PLAYER;
  shadow[id] = Sprite.PLAYER_SHADOW;
  setItem(id, Item.LONGSWORD);
  setHealth(id, 10);
  setHitbox(id, -5, -15, 10, 15);
  speed[id] = 1;
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

  if (isMoving(id)) {
    animateWalk(id);
  } else {
    animateBreathe(id);
  }

  if (isInputPressed(Input.ATTACK)) {
    setupProjectile(posX[id], posY[id], projectile[id], id);
  }
}
