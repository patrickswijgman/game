import { addItem, ItemType, newItem } from "data/items.js";

export function loadLongswordItem() {
  addItem(
    "longsword",
    newItem(
      {
        name: "Longsword",
        type: ItemType.WEAPON,
      },
      {
        damage: 10,
        damageScalingStat: "strength",
        damageScalingFactor: 0.25,
      },
    ),
  );
}
