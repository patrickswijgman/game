import { Item, Projectile, Sprite } from "@/consts.ts";
import { cooldown, damage, projectile, range, weapon } from "@/data.ts";

export function setItem(id: number, item: Item) {
  switch (item) {
    case Item.LONGSWORD:
      damage[id] = 20;
      range[id] = 10;
      cooldown[id] = 300;
      weapon[id] = Sprite.PLAYER_LONGSWORD;
      projectile[id] = Projectile.LONGSWORD;
      break;
  }
}
