import { newStats, Stats } from "data/stats.js";

export const enum ItemType {
  NONE = "",
  WEAPON = "weapon",
  ARMOR = "armor",
}

export type Item = {
  type: ItemType;
  name: string;
  description: string;
  spriteId: string;
  stats: Stats;
};

const items: Record<string, Item> = {};

export function newItem(): Item {
  return {
    type: ItemType.NONE,
    name: "",
    description: "",
    spriteId: "",
    stats: newStats(),
  };
}

export function addItem(id: string, item: Item) {
  items[id] = item;
}

export function getItem(id: string) {
  return items[id];
}
