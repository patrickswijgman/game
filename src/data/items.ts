import { newStats, Stats } from "data/stats.js";
import { vec, Vector } from "ridder";

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
  pivot: Vector;

  actionId: string;
  stats: Stats;
};

const items: Record<string, Item> = {};

export function newItem(options: Partial<Item> = {}): Item {
  return {
    type: ItemType.NONE,
    name: "",
    description: "",

    spriteId: "",
    pivot: vec(),

    actionId: "",
    stats: newStats(),

    ...options,
  };
}

export function addItem(id: string, item: Item) {
  items[id] = item;
}

export function getItem(id: string) {
  return items[id];
}
