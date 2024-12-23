import { addItem, ItemType, newItem } from "data/items.js";
import { newStats } from "data/stats.js";
import { vec } from "ridder";

export function loadLongswordItem() {
  addItem(
    "longsword",
    newItem({
      name: "Longsword",
      type: ItemType.WEAPON,
      spriteId: "item_longsword",
      pivot: vec(15.5, 15.5),
      stats: newStats({
        damage: 10,
        damageScalingStat: "strength",
        damageScalingFactor: 0.25,
        windupDuration: 500,
        releaseDuration: 200,
        recoveryDuration: 300,
      }),
      actionId: "melee_attack",
    }),
  );
}
