import { ItemId } from "@/consts/item.js";
import { table, Table } from "ridder";

export type EquipmentSlot = {
  itemId: ItemId;
  isUnlocked: boolean;
};

function newEquipmentSlot(): EquipmentSlot {
  return {
    itemId: ItemId.NONE,
    isUnlocked: false,
  };
}

export type Equipment = {
  slots: Table<EquipmentSlot>;
};

export function newEquipment(): Equipment {
  return {
    slots: table(10, newEquipmentSlot),
  };
}
