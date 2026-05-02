import { Enemy, Item, Sprite, Type } from "@/consts.ts";
import { isFlipped, playerId, posX, posY, radius, shadow, speed, sprite, variant, velX, velY } from "@/data.ts";
import { animateWalk } from "@/lib/anims.ts";
import { move, setHealth, setHitbox, setupEntity } from "@/lib/entity.ts";
import { setItem } from "@/lib/items.ts";
import { halt, seek, separate } from "@/lib/steering.ts";

export function setupEnemy(x: number, y: number, enemyVariant: Enemy) {
  const id = setupEntity(Type.ENEMY, x, y);
  variant[id] = enemyVariant;

  switch (variant[id]) {
    case Enemy.MELEE:
      {
        sprite[id] = Sprite.ENEMY_MELEE;
        shadow[id] = Sprite.ENEMY_MELEE_SHADOW;
        setItem(id, Item.LONGSWORD);
        setHealth(id, 100);
        setHitbox(id, -6, -16, 12, 16);
        speed[id] = 0.5;
        radius[id] = 20;
      }
      break;
  }

  return id;
}

export function updateEnemy(id: number) {
  velX[id] = 0;
  velY[id] = 0;

  seek(id, posX[playerId], posY[playerId]);
  separate(id);
  halt(id, posX[playerId], posY[playerId]);
  move(id);

  switch (variant[id]) {
    case Enemy.MELEE:
      animateWalk(id);
      break;
  }

  isFlipped[id] = posX[playerId] < posX[id] ? 1 : 0;
}
