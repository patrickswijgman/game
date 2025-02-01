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

    case ItemId.SHORTBOW:
      return {
        name: "Shortbow",
        type: ItemType.WEAPON,
        itemSpriteId: SpriteId.ITEM_SHORTBOW,
        equipSpriteId: SpriteId.EQUIP_SHORTBOW,
        attackId: AttackId.SHORTBOW,
        stats: newStats({
          damage: 2,
        }),
        isStackable: false,
      };

    case ItemId.LEATHER_ARMOR:
      return {
        name: "Leather Armor",
        type: ItemType.ARMOR,
        itemSpriteId: SpriteId.ITEM_LEATHER_ARMOR,
        equipSpriteId: SpriteId.EQUIP_LEATHER_ARMOR,
        attackId: AttackId.NONE,
        stats: newStats({
          armor: 1,
          movementSpeed: -0.075,
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
