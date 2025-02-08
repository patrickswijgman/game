import { SpriteId } from "@/consts/assets.js";
import { AttackId } from "@/consts/attack.js";
import { ItemId, ItemSubtype, ItemType } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";
import { table } from "ridder";

export type Item = {
  name: string;
  type: ItemType;
  subtype: ItemSubtype;
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
        subtype: ItemSubtype.ONE_HANDED,
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
        subtype: ItemSubtype.TWO_HANDED,
        itemSpriteId: SpriteId.ITEM_SHORTBOW,
        equipSpriteId: SpriteId.EQUIP_SHORTBOW,
        attackId: AttackId.SHORTBOW,
        stats: newStats({
          damage: 2,
        }),
        isStackable: false,
      };

    case ItemId.WOODEN_SHIELD:
      return {
        name: "Wooden Shield",
        type: ItemType.OFFHAND,
        subtype: ItemSubtype.NONE,
        itemSpriteId: SpriteId.ITEM_WOODEN_SHIELD,
        equipSpriteId: SpriteId.EQUIP_WOODEN_SHIELD,
        attackId: AttackId.NONE,
        stats: newStats({
          armor: 1,
          movementSpeed: -0.1,
        }),
        isStackable: false,
      };

    case ItemId.LEATHER_ARMOR:
      return {
        name: "Leather Armor",
        type: ItemType.ARMOR,
        subtype: ItemSubtype.NONE,
        itemSpriteId: SpriteId.ITEM_LEATHER_ARMOR,
        equipSpriteId: SpriteId.EQUIP_LEATHER_ARMOR,
        attackId: AttackId.NONE,
        stats: newStats({
          armor: 1,
          movementSpeed: -0.1,
        }),
        isStackable: false,
      };

    default:
      return {
        name: "",
        type: ItemType.NONE,
        subtype: ItemSubtype.NONE,
        itemSpriteId: SpriteId.NONE,
        equipSpriteId: SpriteId.NONE,
        attackId: AttackId.NONE,
        stats: newStats(),
        isStackable: false,
      };
  }
});
