import { SpriteId } from "@/consts/assets.js";
import { ItemId } from "@/consts/item.js";
import { rect, Rectangle, table } from "ridder";

export type Attack = {
  spriteId: SpriteId;
  hitbox: Rectangle;
  range: number;
  reach: number;
  speed: number;
  duration: number;
  recovery: number;
};

export const attacks = table<Attack>(16, (id) => {
  switch (id) {
    case ItemId.LONGSWORD:
      return {
        spriteId: SpriteId.ATTACK_LONGSWORD,
        hitbox: rect(-4, -4, 8, 8),
        range: 12,
        reach: 8,
        speed: 0,
        duration: 100,
        recovery: 250,
      };

    default:
      return {
        spriteId: SpriteId.NONE,
        hitbox: rect(),
        range: 0,
        reach: 0,
        speed: 0,
        duration: 0,
        recovery: 0,
      };
  }
});
