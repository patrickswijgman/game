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
  actionId: string;
  stats: Stats;
};

const items: Record<string, Item> = {};

export function newItem(item: Partial<Item> = {}, stats: Partial<Stats> = {}): Item {
  return {
    type: ItemType.NONE,
    name: "",
    description: "",
    spriteId: "",
    actionId: "",
    stats: newStats(stats),
    ...item,
  };
}

export function addItem(id: string, item: Item) {
  items[id] = item;
}

export function getItem(id: string) {
  return items[id];
}
