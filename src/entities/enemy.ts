import { animateWalk } from "@/anims/walk.ts";
import { Enemy, Item, Sprite, Type } from "@/consts.ts";
import { isFlipped, playerId, posX, posY, radius, shadow, speed, sprite, variant, velX, velY } from "@/data.ts";
import { isMoving, move, resetAnimation, setHealth, setHitbox, setupEntity } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { halt, seek, separate } from "@/lib/steering.ts";

export function setupEnemy(x: number, y: number, v: Enemy) {
  const id = setupEntity(Type.ENEMY, x, y);
  variant[id] = v;

  switch (variant[id]) {
    case Enemy.MELEE:
      {
        sprite[id] = Sprite.ENEMY_MELEE;
        shadow[id] = Sprite.ENEMY_MELEE_SHADOW;
        setItem(id, Item.LONGSWORD);
        setHealth(id, 4);
        setHitbox(id, -6, -16, 12, 16);
        speed[id] = 0.8;
        radius[id] = 20;
      }
      break;
  }

  return id;
}

export function updateEnemy(id: number) {
  velX[id] = 0;
  velY[id] = 0;

  switch (variant[id]) {
    case Enemy.MELEE:
      {
        seek(id, posX[playerId], posY[playerId]);
        separate(id);
        halt(id, posX[playerId], posY[playerId]);
        move(id);
        if (isMoving(id)) {
          animateWalk(id);
        } else {
          resetAnimation(id);
        }
      }
      break;
  }

  isFlipped[id] = posX[playerId] < posX[id] ? 1 : 0;
}
