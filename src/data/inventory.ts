import { ItemId } from "@/consts/item.js";
import { table, Table } from "ridder";

export type InventoryItem = {
  id: ItemId;
  amount: number;
  level: number;
};

function newInventoryItem(): InventoryItem {
  return {
    id: ItemId.NONE,
    amount: 0,
    level: 0,
  };
}

export type Inventory = {
  all: Table<InventoryItem>;
  weapons: Array<number>;
  armors: Array<number>;
};

export function newInventory(): Inventory {
  return {
    all: table(99, newInventoryItem),
    weapons: [],
    armors: [],
  };
}
