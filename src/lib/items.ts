import { Item, Projectile, Sprite } from "@/consts.ts";
import { cooldown, projectile, projectileDamage, projectileRange, projectileSpeed, recovery, weapon, windup } from "@/data.ts";

export function setItem(id: number, item: Item) {
  switch (item) {
    case Item.LONGSWORD:
      weapon[id] = Sprite.PLAYER_LONGSWORD;
      projectile[id] = Projectile.LONGSWORD;
      projectileDamage[id] = 20;
      projectileRange[id] = 30;
      projectileSpeed[id] = 2;
      windup[id] = 100;
      recovery[id] = 300;
      cooldown[id] = 300;
      break;
  }
}
