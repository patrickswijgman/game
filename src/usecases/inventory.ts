import { SpriteId } from "@/consts/assets.js";
import { COLOR_OUTLINE } from "@/consts/colors.js";
import { INVENTORY_HEIGHT, INVENTORY_SIZE, INVENTORY_WIDTH } from "@/consts/inventory.js";
import { ItemId } from "@/consts/item.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { game } from "@/data/game.js";
import { Scene } from "@/data/scene.js";
import { Stats } from "@/data/stats.js";
import { getItem } from "@/usecases/item.js";
import { drawTextOutlined } from "@/usecases/ui.js";
import { drawLine, drawRect, drawSprite, drawText, getWidth, resetTransform, scaleTransform, setAlpha, translateTransform } from "ridder";

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

export function renderTooltip(scene: Scene) {
  resetTransform();
  translateTransform(getWidth() - 140, 30);

  const id = 1 + scene.selected.x + scene.selected.y * INVENTORY_WIDTH;
  const slot = getInventorySlot(id);
  const item = getItem(id);

  if (slot && slot.amount > 0) {
    setAlpha(0.25);
    drawRect(0, 0, 120, INVENTORY_HEIGHT * 18, "black", true);
    setAlpha(1);

    translateTransform(60, 10);
    scaleTransform(0.625, 0.625);
    drawText(item.name, 0, 0, "white", "center");
    scaleTransform(1.6, 1.6);

    scaleTransform(2, 2);
    drawSprite(item.itemSpriteId, -8, 5);
    scaleTransform(0.5, 0.5);

    translateTransform(0, 45);
    translateTransform(-30, 0);
    scaleTransform(0.5, 0.5);
    renderStat(item.stats, "Health", "healthMax");
    renderStat(item.stats, "Damage", "damage");
    renderStat(item.stats, "Armor", "armor");
  }
}

function renderStat(stats: Stats, label: string, key: keyof Stats) {
  const value = stats[key];
  if (value) {
    drawText(label, 0, 0, "white");
    drawText(value.toString(), 120, 0, "white", "right");
    drawLine(0, FONT_HEIGHT, 120, FONT_HEIGHT + 1, COLOR_OUTLINE);
    translateTransform(0, FONT_HEIGHT + 1);
  }
}
