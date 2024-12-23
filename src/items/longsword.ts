import { ItemType, newItem } from "data/items.js";

export function newLongswordItem() {
  return newItem(
    {
      name: "Longsword",
      type: ItemType.WEAPON,
    },
    {
      damage: 10,
      damageScalingStat: "strength",
      damageScalingFactor: 0.25,
    },
  );
}
