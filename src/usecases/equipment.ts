import { SpriteId } from "@/consts/assets.js";
import { ItemId, ItemType } from "@/consts/item.js";
import { game } from "@/data/game.js";
import { getItem } from "@/usecases/item.js";
import { updateSheet } from "@/usecases/sheet.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { drawSprite, getHeight, getWidth, resetTransform, scaleTransform, translateTransform } from "ridder";

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

export function assignEquipmentSlot(id: number, itemId: number) {
  const slot = getEquipmentSlot(id);

  if (slot.isUnlocked) {
    for (let id = 0; id < game.equipment.slots.length; id++) {
      const other = getEquipmentSlot(id);

      if (other.itemId === itemId) {
        other.itemId = ItemId.NONE;
      }
    }

    if (slot.itemId) {
      const item = getItem(slot.itemId);

      switch (item.type) {
        case ItemType.WEAPON:
          game.sheet.weaponId = ItemId.NONE;
          break;
        case ItemType.ARMOR:
          game.sheet.armorId = ItemId.NONE;
          break;
      }
    }

    slot.itemId = itemId;
  }
}

export function useEquipmentSlot(id: number) {
  const slot = getEquipmentSlot(id);

  if (slot.itemId) {
    const item = getItem(slot.itemId);

    switch (item.type) {
      case ItemType.WEAPON:
        {
          game.sheet.weaponId = slot.itemId;
          updateSheet(game.sheet);
        }
        break;
      case ItemType.ARMOR:
        {
          game.sheet.armorId = slot.itemId;
          updateSheet(game.sheet);
        }
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

export function isEquipmentAssigned(itemId: number) {
  return game.equipment.slots.some((slot) => slot.itemId === itemId);
}

export function getEquipmentSlotId(itemId: number) {
  return game.equipment.slots.findIndex((slot) => slot.itemId === itemId);
}

export function renderEquipment() {
  const count = countUnlockedEquipmentSlots();

  resetTransform();
  translateTransform(getWidth() / 2 - (18 * count) / 2, getHeight() - 25);

  for (let i = 0; i < count; i++) {
    const slot = getEquipmentSlot(i);

    drawSprite(SpriteId.SLOT, i * 18, 0);

    if (slot.itemId) {
      const item = getItem(slot.itemId);
      drawSprite(item.itemSpriteId, i * 18, 0);

      if (isEquipmentSlotActive(i)) {
        drawSprite(SpriteId.SLOT_ACTIVE, i * 18, 0);
      }
    }

    scaleTransform(0.5, 0.5);
    drawTextOutlined((i + 1).toString(), i * 36 + 16, 36, "white", "center");
    scaleTransform(2, 2);
  }
}
