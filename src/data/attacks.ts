import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { newStats, Stats } from "@/data/stats.js";
import { rect, Rectangle, table, vec, Vector } from "ridder";

export type Attack = {
  spriteId: SpriteId;
  pivot: Vector;
  hitbox: Rectangle;
  reach: number;
  speed: number;
  delay: number;
  duration: number;
  recovery: number;
  stats: Stats;
};

const attacks = table<Attack>(AttackId.MAX, (id) => {
  switch (id) {
    case AttackId.PLAYER:
      return {
        spriteId: SpriteId.ATTACK_ARROW,
        pivot: vec(8, 8.5),
        hitbox: rect(-2, -2, 4, 4),
        reach: 4,
        speed: 2,
        delay: 0,
        duration: 0,
        recovery: 500,
        stats: newStats(),
      };

    case AttackId.ENEMY_MELEE:
      return {
        spriteId: SpriteId.ATTACK_ENEMY_MELEE,
        pivot: vec(8, 8),
        hitbox: rect(-4, -4, 8, 8),
        reach: 4,
        speed: 0,
        delay: 500,
        duration: 150,
        recovery: 250,
        stats: newStats({
          attackRange: 10,
        }),
      };

    default:
      return {
        spriteId: SpriteId.NONE,
        hitbox: rect(0, 0, 0, 0),
        pivot: vec(0, 0),
        reach: 0,
        speed: 0,
        delay: 0,
        duration: 0,
        recovery: 0,
        stats: newStats(),
      };
  }
});

export function getAttack(id: AttackId) {
  return attacks[id];
}
