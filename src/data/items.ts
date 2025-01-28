import { SpriteId } from "@/consts/assets.js";
import { ItemId } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";
import { table } from "ridder";

export type Item = {
  name: string;
  spriteId: SpriteId;
  stats: Stats;
};

export const ITEMS = table<Item>(ItemId.MAX, (id) => {
  switch (id) {
    case ItemId.LONGSWORD:
      return {
        name: "Longsword",
        spriteId: SpriteId.EQUIP_LONGSWORD,
        stats: newStats({
          damage: 3,
        }),
      };

    default:
      return {
        name: "",
        spriteId: SpriteId.NONE,
        stats: newStats(),
      };
  }
});
