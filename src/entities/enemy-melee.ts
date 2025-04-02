import { SpriteId } from "@/core/assets.js";
import { AttackId } from "@/core/attacks.js";
import { applyAnimationTransform, drawShadow, Entity, setCenter, setHitbox, Type } from "@/core/entity.js";
import { addEnemy } from "@/entities/enemy.js";
import { drawSprite, setVector } from "ridder";

export function addMeleeEnemy(x: number, y: number) {
  const e = addEnemy(Type.ENEMY_MELEE, x, y);

  setHitbox(e, -3, -8, 6, 8);
  setCenter(e, 0, -3);
  setVector(e.direction, 1, 0);

  e.radius = 8;

  e.stats.health = 20;
  e.stats.healthMax = 20;
  e.stats.damage = 1;
  e.stats.movementSpeed = 0.5;
  e.stats.experience = 50;
  e.attackId = AttackId.ENEMY_MELEE;

  e.isPhysicsEnabled = true;

  return e;
}

export function renderMeleeEnemy(e: Entity) {
  const x = -8;
  const y = -15;

  drawShadow(SpriteId.ENEMY_MELEE_SHADOW, x, y + 2);

  applyAnimationTransform(e);

  if (e.isFlashing) {
    drawSprite(SpriteId.ENEMY_MELEE_FLASH, x, y);
  } else {
    drawSprite(SpriteId.ENEMY_MELEE, x, y);
  }
}
