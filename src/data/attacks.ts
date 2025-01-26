import { SpriteId } from "@/enums/assets.js";
import { ItemId } from "@/enums/item.js";
import { rect, Rectangle } from "ridder";

export type Attack = {
  spriteId: SpriteId;
  hitbox: Rectangle;
  range: number;
  speed: number;
  duration: number;
  recovery: number;
};

export const attacks: Readonly<Record<number, Attack>> = {
  [ItemId.LONGSWORD]: {
    spriteId: SpriteId.ATTACK_LONGSWORD,
    hitbox: rect(-4, -4, 8, 8),
    range: 0,
    speed: 0,
    duration: 100,
    recovery: 250,
  },
};
