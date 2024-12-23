import { ItemType, newItem } from "data/items.js";

export function newLongswordItem() {
  const item = newItem();

  item.name = "Longsword";
  item.type = ItemType.WEAPON;

  item.stats.damage = 10;
  item.stats.damageScalingStat = "strength";
  item.stats.damageScalingFactor = 0.25;

  return item;
}
