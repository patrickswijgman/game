import { ItemId } from "@/consts/item.js";
import { table, Table } from "ridder";

export type InventorySlot = {
  amount: number;
};

function newInventorySlot(): InventorySlot {
  return {
    amount: 0,
  };
}

export type Inventory = {
  slots: Table<InventorySlot>;
};

export function newInventory(): Inventory {
  return {
    slots: table(ItemId.MAX, newInventorySlot),
  };
}
