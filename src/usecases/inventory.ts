import { SpriteId } from "@/consts/assets.js";
import { INVENTORY_SIZE, INVENTORY_WIDTH } from "@/consts/inventory.js";
import { ItemId } from "@/consts/item.js";
import { game } from "@/data/game.js";
import { Scene } from "@/data/scene.js";
import { getItem } from "@/usecases/item.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { drawSprite, resetTransform, translateTransform } from "ridder";

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

export function renderInventory(scene: Scene) {
  resetTransform();
  translateTransform(20, 30);

  for (let i = 0; i < INVENTORY_SIZE; i++) {
    const x = i % INVENTORY_WIDTH;
    const y = Math.floor(i / INVENTORY_WIDTH);
    const id = i + 1;
    const item = getItem(id);
    const slot = getInventorySlot(id);

    drawSprite(SpriteId.SLOT, x * 18, y * 18);

    if (slot && slot.amount > 0) {
      drawSprite(item.itemSpriteId, x * 18, y * 18);

      if (slot.amount > 1) {
        drawTextOutlined(slot.amount.toString(), x * 18 - 2, y * 18 - 2, "white", "right", "bottom");
      }
    }
  }

  drawSprite(SpriteId.SLOT_SELECT, scene.selected.x * 18 - 1, scene.selected.y * 18 - 1);
}
