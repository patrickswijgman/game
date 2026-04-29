import { drawRect } from "snuggy";
import { EnemyVariant, Type } from "@/consts.ts";
import { isFlipped, player, posX, posY, radius, speed, variant } from "@/data.ts";
import { setEntityTransform, setHitbox, setupEntity, updateHitbox } from "@/lib/entity.ts";
import { seek, separate } from "@/lib/steering.ts";

export function setupEnemy(x: number, y: number, variant: EnemyVariant) {
  const id = setupEntity(Type.ENEMY, x, y);

  switch (variant) {
    case EnemyVariant.MELEE:
      setHitbox(id, -6, -16, 12, 16);
      speed[id] = 0.8;
      radius[id] = 20;
      break;
  }

  return id;
}

export function updateEnemy(id: number) {
  switch (variant[id]) {
    case EnemyVariant.MELEE:
      seek(id, posX[player], posY[player]);
      separate(id);
      break;
  }

  isFlipped[id] = posX[player] < posX[id];

  updateHitbox(id);

  setEntityTransform(id, true);
  drawRect(-6, -16, 12, 16, "crimson", true);
}
