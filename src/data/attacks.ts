import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { rect, Rectangle, table, vec, Vector } from "ridder";

export type Attack = {
  spriteId: SpriteId;
  pivot: Vector;
  hitbox: Rectangle;
  reach: number;
  range: number;
  speed: number;
  duration: number;
  recovery: number;
};

export const attacks = table<Attack>(AttackId.MAX, (id) => {
  switch (id) {
    case AttackId.PLAYER:
      return {
        spriteId: SpriteId.ATTACK_ARROW,
        pivot: vec(8, 8.5),
        hitbox: rect(-2, -2, 4, 4),
        reach: 4,
        range: 40,
        speed: 2,
        duration: 0,
        recovery: 500,
      };

    case AttackId.ENEMY_MELEE:
      return {
        spriteId: SpriteId.ATTACK_LONGSWORD,
        pivot: vec(8, 8),
        hitbox: rect(-3, -3, 6, 6),
        reach: 4,
        range: 10,
        speed: 0,
        duration: 150,
        recovery: 500,
      };

    default:
      return {
        spriteId: SpriteId.NONE,
        hitbox: rect(0, 0, 0, 0),
        pivot: vec(0, 0),
        reach: 0,
        range: 0,
        speed: 0,
        duration: 0,
        recovery: 0,
      };
  }
});
