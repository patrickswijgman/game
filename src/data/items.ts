import { CardId } from "@/enums/card.js";
import { ItemId } from "@/enums/item.js";

export type Item = {
  name: string;
  cards: Array<CardId>;
  cost: number;
};

export const items: Readonly<Record<ItemId, Item>> = {
  [ItemId.LONGSWORD]: {
    name: "Longsword",
    cards: [CardId.SLASH, CardId.SLASH, CardId.SLASH],
    cost: 1,
  },
};
