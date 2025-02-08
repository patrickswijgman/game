import { SpriteId } from "@/consts/assets.js";
import { COLOR_LINE, COLOR_PRIMARY, COLOR_SURFACE } from "@/consts/colors.js";
import { INVENTORY_HEIGHT, INVENTORY_SIZE, INVENTORY_WIDTH } from "@/consts/inventory.js";
import { ItemId, ItemSubtype, ItemType } from "@/consts/item.js";
import { FONT_HEIGHT, SLOT_SIZE } from "@/consts/render.js";
import { game } from "@/data/game.js";
import { Scene } from "@/data/scene.js";
import { getEquipmentSlotId } from "@/usecases/equipment.js";
import { getItem } from "@/usecases/item.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { clamp, drawRect, drawSprite, drawText, getWidth, InputCode, isInputPressed, resetTransform, scaleTransform, translateTransform } from "ridder";

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

export function updateInventorySelect(scene: Scene) {
  if (isInputPressed(InputCode.KEY_LEFT)) {
    scene.selected.x -= 1;
  }
  if (isInputPressed(InputCode.KEY_RIGHT)) {
    scene.selected.x += 1;
  }
  if (isInputPressed(InputCode.KEY_UP)) {
    scene.selected.y -= 1;
  }
  if (isInputPressed(InputCode.KEY_DOWN)) {
    scene.selected.y += 1;
  }

  scene.selected.x = clamp(scene.selected.x, 0, INVENTORY_WIDTH - 1);
  scene.selected.y = clamp(scene.selected.y, 0, INVENTORY_HEIGHT - 1);
}

export function getSelectedSlotId(scene: Scene) {
  return 1 + scene.selected.x + scene.selected.y * INVENTORY_WIDTH;
}

export function renderInventory(scene: Scene) {
  for (let i = 0; i < INVENTORY_SIZE; i++) {
    const x = i % INVENTORY_WIDTH;
    const y = Math.floor(i / INVENTORY_WIDTH);
    const id = i + 1;
    const item = getItem(id);
    const slot = getInventorySlot(id);

    resetTransform();
    translateTransform(20, 30);
    translateTransform(x * SLOT_SIZE, y * SLOT_SIZE);

    drawSprite(SpriteId.SLOT, 0, 0);

    if (slot && slot.amount > 0) {
      drawSprite(item.itemSpriteId, 0, 0);

      if (slot.amount > 1) {
        scaleTransform(0.5, 0.5);
        drawTextOutlined(`x${slot.amount}`, (SLOT_SIZE - 4) * 2, (SLOT_SIZE - 4) * 2, "white", "right", "bottom");
        scaleTransform(2, 2);
      }

      const slotId = getEquipmentSlotId(id);
      if (slotId !== -1) {
        scaleTransform(0.5, 0.5);
        drawTextOutlined((slotId + 1).toString(), 2, 2);
        scaleTransform(2, 2);
      }
    }
  }

  resetTransform();
  translateTransform(20, 30);
  drawSprite(SpriteId.SLOT_SELECT, scene.selected.x * SLOT_SIZE - 1, scene.selected.y * SLOT_SIZE - 1);
}

export function renderTooltip(scene: Scene) {
  resetTransform();
  translateTransform(getWidth() - 150, 30);

  const id = getSelectedSlotId(scene);
  const slot = getInventorySlot(id);
  const item = getItem(id);

  if (slot && slot.amount > 0) {
    drawRect(0, 0, 100, INVENTORY_HEIGHT * SLOT_SIZE - 2, COLOR_SURFACE, true);
    drawRect(0, 0, 100, 1, COLOR_PRIMARY, true);

    translateTransform(50, 10);
    scaleTransform(0.625, 0.625);
    drawText(item.name, 0, 0, "white", "center");
    scaleTransform(1.6, 1.6);

    scaleTransform(2, 2);
    drawSprite(item.itemSpriteId, -8, 5);
    scaleTransform(0.5, 0.5);

    translateTransform(-40, 45);
    scaleTransform(0.5, 0.5);

    switch (item.type) {
      case ItemType.WEAPON:
        switch (item.subtype) {
          case ItemSubtype.ONE_HANDED:
            drawText("One-Handed Weapon", 80, 0, "white", "center");
            break;
          case ItemSubtype.TWO_HANDED:
            drawText("Two-Handed Weapon", 80, 0, "white", "center");
            break;
        }
        break;
      case ItemType.ARMOR:
        drawText("Armor", 80, 0, "white", "center");
        break;
      case ItemType.OFFHAND:
        drawText("Offhand", 80, 0, "white", "center");
        break;
    }
    translateTransform(0, FONT_HEIGHT * 2);

    renderStat("Health", item.stats.healthMax);
    renderStat("Mana", item.stats.manaMax);
    renderStat("Damage", item.stats.damage);
    renderStat("Armor", item.stats.armor);
    renderStat("Movement Speed", item.stats.movementSpeed, true);
    renderStat("Mana Cost", item.stats.manaCost);
  }
}

function renderStat(label: string, value: number, percentile = false) {
  if (value) {
    drawText(label, 0, 0, "white");
    if (percentile) {
      drawText(`${value * 100}%`, 160, 0, "white", "right");
    } else {
      drawText(value.toString(), 160, 0, "white", "right");
    }
    drawRect(0, FONT_HEIGHT, 160, 2, COLOR_LINE, true);
    translateTransform(0, FONT_HEIGHT + 5);
  }
}
