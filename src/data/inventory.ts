import { ItemId } from "@/consts/item.js";
import { table, Table } from "ridder";

export type InventorySlot = {
  id: number;
  itemId: ItemId;
  amount: number;
};

function newInventorySlot(id: number): InventorySlot {
  return {
    id,
    itemId: ItemId.NONE,
    amount: 0,
  };
}

export type Inventory = {
  all: Table<InventorySlot>;

  // Filters
  weapons: Array<number>;
  armors: Array<number>;
};

export function newInventory(): Inventory {
  return {
    all: table(99, newInventorySlot),

    // Filters
    weapons: [],
    armors: [],
  };
}
