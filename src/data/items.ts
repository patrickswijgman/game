import { newStats, Stats } from "@/data/stats.js";
import { SpriteId } from "@/enums/assets.js";
import { ItemId } from "@/enums/item.js";

export type Item = {
  name: string;
  stats: Stats;
  spriteId: SpriteId;
};

export const ITEMS: Readonly<Record<ItemId, Item>> = {
  [ItemId.NONE]: {
    name: "",
    stats: newStats(),
    spriteId: SpriteId.NONE,
  },

  [ItemId.LONGSWORD]: {
    name: "Longsword",
    spriteId: SpriteId.EQUIP_LONGSWORD,
    stats: newStats({
      damage: 3,
      damageScaling: 1,
    }),
  },
};
