import { items } from "@/data/items.js";
import { ItemId } from "@/enums/item.js";

export function getItem(id: ItemId) {
  return items[id];
}
