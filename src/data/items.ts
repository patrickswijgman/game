import { newStats, Stats } from "@/data/stats.js";
import { ItemId } from "@/enums/item.js";

export type Item = {
  name: string;
  stats: Stats;
};

export const items: Readonly<Record<ItemId, Item>> = {
  [ItemId.NONE]: {} as Item,

  [ItemId.LONGSWORD]: {
    name: "Longsword",
    stats: newStats({
      damage: 3,
      manaCost: 1,
    }),
  },
};
