import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { rect, Rectangle, table } from "ridder";

export type Attack = {
  spriteId: SpriteId;
  hitbox: Rectangle;
  reach: number;
  range: number;
  speed: number;
  duration: number;
  recovery: number;
};

export const attacks = table<Attack>(AttackId.MAX, (id) => {
  switch (id) {
    case AttackId.LONGSWORD:
      return {
        spriteId: SpriteId.ATTACK_LONGSWORD,
        hitbox: rect(-4, -4, 8, 8),
        reach: 8,
        range: 12,
        speed: 0,
        duration: 150,
        recovery: 400,
      };

    case AttackId.SHORTBOW:
      return {
        spriteId: SpriteId.ATTACK_ARROW,
        hitbox: rect(-4, -1, 8, 2),
        reach: 4,
        range: 50,
        speed: 2,
        duration: 0,
        recovery: 500,
      };

    default:
      return {
        spriteId: SpriteId.NONE,
        hitbox: rect(0, 0, 0, 0),
        reach: 0,
        range: 0,
        speed: 0,
        duration: 0,
        recovery: 0,
      };
  }
});
