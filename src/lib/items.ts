import { ItemEffect, ItemId } from "@/consts.ts";
import { type Item, items } from "@/data.ts";

export function setupItems() {
  let item: Item;

  item = getItem(ItemId.HEALTH_POTION);
  item.name = "Health Potion";
  item.effects.push(ItemEffect.HEALTH_RESTORE);
}

export function getItem(id: ItemId) {
  return items[id];
}
