import { ItemId } from "@/consts/item.js";
import { game } from "@/data/game.js";
import { InventorySlot } from "@/data/inventory.js";

export function getInventorySlot(id: number) {
  return game.inventory.all[id];
}

export function addItemToInventory(itemId: ItemId, amount = 1) {
  let slot: InventorySlot;

  slot = game.inventory.all.find((slot) => slot.itemId === itemId);
  if (slot) {
    slot.itemId = itemId;
    slot.amount += amount;
    return slot.id;
  }

  slot = game.inventory.all.find((slot) => slot.itemId === ItemId.NONE);
  if (slot) {
    slot.itemId = itemId;
    slot.amount = amount;
    return slot.id;
  }

  return -1;
}
