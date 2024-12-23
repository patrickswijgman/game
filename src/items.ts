import { newStats, Stats } from "stats.js";

export const enum ItemType {
  NONE = "none",
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

export function newItem(options: Partial<Item> = {}, stats: Partial<Stats> = {}): Item {
  return {
    type: ItemType.NONE,
    name: "",
    description: "",
    spriteId: "",
    stats: newStats(stats),
    ...options,
  };
}

export function addItem(id: string, item: Item) {
  items[id] = item;
}

export function getItem(id: string) {
  return items[id];
}
