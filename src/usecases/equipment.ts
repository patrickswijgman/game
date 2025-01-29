import { ItemType } from "@/consts/item.js";
import { game } from "@/data/game.js";
import { getInventorySlot } from "@/usecases/inventory.js";
import { getItem } from "@/usecases/item.js";

export function getEquipmentSlot(id: number) {
  return game.equipment.slots[id];
}

export function countUnlockedEquipmentSlots() {
  return game.equipment.slots.reduce((prev, slot) => (prev += slot.isUnlocked ? 1 : 0), 0);
}

export function unlockEquipmentSlot() {
  const slot = game.equipment.slots.find((slot) => !slot.isUnlocked);

  if (slot) {
    slot.isUnlocked = true;
  }
}

export function assignEquipmentSlot(id: number, inventoryId: number) {
  const slot = getEquipmentSlot(id);
  const item = getInventorySlot(inventoryId);

  if (slot.isUnlocked) {
    slot.itemId = item.itemId;
  }
}

export function useEquipmentSlot(id: number) {
  const slot = getEquipmentSlot(id);

  if (slot.itemId) {
    const item = getItem(slot.itemId);

    switch (item.type) {
      case ItemType.WEAPON:
        game.sheet.weaponId = slot.itemId;
        break;
      case ItemType.ARMOR:
        game.sheet.armorId = slot.itemId;
        break;
    }
  }
}

export function isEquipmentSlotActive(id: number) {
  const slot = getEquipmentSlot(id);

  if (slot.itemId) {
    const item = getItem(slot.itemId);

    switch (item.type) {
      case ItemType.WEAPON:
        return game.sheet.weaponId === slot.itemId;
      case ItemType.ARMOR:
        return game.sheet.armorId === slot.itemId;
    }
  }

  return false;
}
