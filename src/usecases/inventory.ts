import { ItemId } from "@/consts/item.js";
import { game } from "@/data/game.js";
import { getItem } from "@/usecases/item.js";

export function getInventorySlot(id: ItemId) {
  return game.inventory.slots[id];
}

export function addItemToInventory(itemId: ItemId, amount = 1) {
  const item = getItem(itemId);
  const slot = getInventorySlot(itemId);

  if (item.isStackable) {
    slot.amount += amount;
  } else {
    slot.amount = 1;
  }
}
