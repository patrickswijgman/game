import { ItemType, newItem } from "items.js";

export function newLongswordItem() {
  const item = newItem();

  item.name = "Longsword";
  item.type = ItemType.WEAPON;

  return item;
}
