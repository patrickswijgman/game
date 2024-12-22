import { newStats, Stats } from "stats.js";

export const enum Item {
  NONE = "",
  LONGSWORD = "longsword",
}

export const enum Slot {
  NONE = "",
  WEAPON = "weapon",
  ARMOR = "armor",
}

export type ItemData = {
  name: string;
  description: string;
  spriteId: string;
  stats: Stats;
  slot: Slot;
};

const items: Record<string, ItemData> = {};

export function addItems() {
  addItem(Item.LONGSWORD, (item) => {
    item.name = "Longsword";
    item.slot = Slot.WEAPON;
    item.stats.damage = 10;
    item.stats.damageScalingStat = "strength";
    item.stats.damageScalingFactor = 0.2;
  });
}

function newItem(): ItemData {
  return {
    name: "",
    description: "",
    spriteId: "",
    stats: newStats(),
    slot: Slot.NONE,
  };
}

function addItem(id: string, setup: (item: ItemData) => void): ItemData {
  const item = newItem();

  items[id] = item;

  setup(item);

  return item;
}

export function getItem(id: Item) {
  return items[id];
}
