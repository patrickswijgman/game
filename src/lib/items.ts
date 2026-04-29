import { Item, Sprite } from "@/consts.ts";
import { itemDamage, itemName, itemSpriteId } from "@/data.ts";

export function setupItems() {
  setWeapon(Item.LONGSWORD, "Longsword", Sprite.PLAYER_LONGSWORD, 10);
}

function setWeapon(id: Item, name: string, spriteId: Sprite, damage: number) {
  itemName[id] = name;
  itemSpriteId[id] = spriteId;
  itemDamage[id] = damage;
}
