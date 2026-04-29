import { animateWalk } from "@/anims/walk.ts";
import { EnemyVariant, Sprite, Type } from "@/consts.ts";
import { isFlipped, playerId, posX, posY, radius, speed, spriteId, variant, velX, velY } from "@/data.ts";
import { drawEntity, isMoving, move, setHitbox, setupEntity } from "@/lib/entity.ts";
import { seek, separate } from "@/lib/steering.ts";

export function setupEnemy(x: number, y: number, v: EnemyVariant) {
  const id = setupEntity(Type.ENEMY, x, y);

  variant[id] = v;

  switch (variant[id]) {
    case EnemyVariant.MELEE:
      {
        spriteId[id] = Sprite.ENEMY_MELEE;
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
    case EnemyVariant.MELEE:
      {
        seek(id, posX[playerId], posY[playerId]);
        separate(id);
        move(id);
        if (isMoving(id)) {
          animateWalk(id);
        }
      }
      break;
  }

  isFlipped[id] = posX[playerId] < posX[id];

  drawEntity(id);
}
