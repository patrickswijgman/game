import { SpriteId } from "@/consts/assets.js";
import { ItemId } from "@/consts/item.js";
import { SLOT_SIZE } from "@/consts/render.js";
import { game } from "@/data/game.js";
import { getItem } from "@/usecases/item.js";
import { equipItem, isEquipped, unequipItem } from "@/usecases/sheet.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { drawSprite, getHeight, getWidth, resetTransform, scaleTransform, translateTransform } from "ridder";

export function getEquipmentSlot(id: number) {
  return game.equipment.slots[id];
}

export function getEquipmentSlotId(itemId: ItemId) {
  return game.equipment.slots.findIndex((slot) => slot.itemId === itemId);
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

export function assignEquipmentSlot(id: number, itemId: ItemId) {
  const slot = getEquipmentSlot(id);

  if (slot.isUnlocked) {
    removeItemFromEquipment(itemId);
    unequipItem(game.sheet, slot.itemId);
    slot.itemId = itemId;
  }
}

export function removeItemFromEquipment(itemId: ItemId) {
  for (let id = 0; id < game.equipment.slots.length; id++) {
    const slot = getEquipmentSlot(id);

    if (slot.itemId === itemId) {
      slot.itemId = ItemId.NONE;
    }
  }
}

export function useEquipmentSlot(id: number) {
  const slot = getEquipmentSlot(id);

  if (slot.itemId) {
    equipItem(game.sheet, slot.itemId);
  }
}

export function isEquipmentSlotActive(id: number) {
  const slot = getEquipmentSlot(id);

  if (slot.itemId) {
    return isEquipped(game.sheet, slot.itemId);
  }

  return false;
}

export function isEquipmentAssigned(itemId: ItemId) {
  return game.equipment.slots.some((slot) => slot.itemId === itemId);
}

export function renderEquipment() {
  const count = countUnlockedEquipmentSlots();

  resetTransform();
  translateTransform(getWidth() / 2 - (SLOT_SIZE * count) / 2, getHeight() - 25);

  for (let i = 0; i < count; i++) {
    const slot = getEquipmentSlot(i);

    drawSprite(SpriteId.SLOT, i * SLOT_SIZE, 0);

    if (slot.itemId) {
      const item = getItem(slot.itemId);
      drawSprite(item.itemSpriteId, i * SLOT_SIZE, 0);

      if (isEquipmentSlotActive(i)) {
        drawSprite(SpriteId.SLOT_ACTIVE, i * SLOT_SIZE, 0);
      }
    }

    scaleTransform(0.5, 0.5);
    drawTextOutlined((i + 1).toString(), i * (SLOT_SIZE * 2) + 16, SLOT_SIZE * 2, "white", "center");
    scaleTransform(2, 2);
  }
}
