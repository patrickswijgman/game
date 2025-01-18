import { newStats, Stats } from "@/data/stats.js";
import { CardId } from "@/enums/card.js";
import { ItemId } from "@/enums/item.js";

export type Item = {
  name: string;
  cards: Array<CardId>;
  stats: Stats;
};

export const items: Readonly<Record<ItemId, Item>> = {
  [ItemId.NONE]: {} as Item,

  [ItemId.LONGSWORD]: {
    name: "Longsword",
    cards: [CardId.SLASH, CardId.SLASH, CardId.SLASH],
    stats: newStats({
      damage: 3,
      manaCost: 1,
    }),
  },
};
