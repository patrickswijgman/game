import { ItemId } from "@/consts/item.js";
import { items } from "@/data/items.js";

export function getItem(id: ItemId) {
  return items[id];
}
