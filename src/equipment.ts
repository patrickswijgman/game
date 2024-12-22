import { Item, Slot } from "items.js";

export type Equipment = Record<Slot, Item>;

export function newEquipment(): Equipment {
  return {
    [Slot.NONE]: Item.NONE,
    [Slot.WEAPON]: Item.NONE,
    [Slot.ARMOR]: Item.NONE,
  };
}
