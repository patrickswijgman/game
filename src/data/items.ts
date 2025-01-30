import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { ItemId, ItemType } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";
import { table } from "ridder";

export type Item = {
  name: string;
  type: ItemType;
  itemSpriteId: SpriteId;
  equipSpriteId: SpriteId;
  attackId: AttackId;
  stats: Stats;
  isStackable: boolean;
};

export const items = table<Item>(ItemId.MAX, (id) => {
  switch (id) {
    case ItemId.LONGSWORD:
      return {
        name: "Longsword",
        type: ItemType.WEAPON,
        itemSpriteId: SpriteId.ITEM_LONGSWORD,
        equipSpriteId: SpriteId.EQUIP_LONGSWORD,
        attackId: AttackId.LONGSWORD,
        stats: newStats({
          damage: 3,
        }),
        isStackable: false,
      };

    default:
      return {
        name: "",
        type: ItemType.NONE,
        itemSpriteId: SpriteId.NONE,
        equipSpriteId: SpriteId.NONE,
        attackId: AttackId.NONE,
        stats: newStats(),
        isStackable: false,
      };
  }
});
