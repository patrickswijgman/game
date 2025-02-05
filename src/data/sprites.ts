import { SpriteId } from "@/consts/assets.js";
import { table, vec, Vector } from "ridder";

export type Sprite = {
  pivot: Vector;
};

export const sprites = table<Sprite>(SpriteId.MAX, (id) => {
  switch (id) {
    case SpriteId.PLAYER:
      return {
        pivot: vec(8, 15),
      };

    case SpriteId.PLAYER_SHADOW:
      return {
        pivot: vec(8, 13),
      };

    case SpriteId.TREE_PINE:
      return {
        pivot: vec(8, 15),
      };

    case SpriteId.TREE_SHADOW:
      return {
        pivot: vec(8, 12),
      };

    case SpriteId.ATTACK_LONGSWORD:
      return {
        pivot: vec(8, 8),
      };

    case SpriteId.ATTACK_ARROW:
      return {
        pivot: vec(8, 8.5),
      };

    default:
      return {
        pivot: vec(0, 0),
      };
  }
});
