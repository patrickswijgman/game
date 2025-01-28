import { ItemId } from "@/consts/item.js";
import { ITEMS } from "@/data/items.js";

export function getItem(id: ItemId) {
  return ITEMS[id];
}
