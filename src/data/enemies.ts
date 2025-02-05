import { SpriteId } from "@/consts/assets.js";
import { EnemyId } from "@/consts/enemy.js";
import { ItemId } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";
import { rect, Rectangle, table } from "ridder";

export type Enemy = {
  spriteId: SpriteId;
  shadowId: SpriteId;
  flashId: SpriteId;
  stats: Stats;
  weaponId: ItemId;
  armorId: ItemId;
  hitbox: Rectangle;
};

export const enemies = table<Enemy>(EnemyId.MAX, (id) => {
  switch (id) {
    case EnemyId.DUMMY:
      return {
        spriteId: SpriteId.PLAYER,
        shadowId: SpriteId.PLAYER_SHADOW,
        flashId: SpriteId.PLAYER_FLASH,
        stats: newStats({
          health: 10,
          healthMax: 10,
          movementSpeed: 1,
          movementSpeedMax: 1.5,
        }),
        weaponId: ItemId.LONGSWORD,
        armorId: ItemId.NONE,
        hitbox: rect(-3, -8, 6, 8),
      };

    default:
      return {
        spriteId: SpriteId.NONE,
        shadowId: SpriteId.NONE,
        flashId: SpriteId.NONE,
        stats: newStats(),
        weaponId: ItemId.NONE,
        armorId: ItemId.NONE,
        hitbox: rect(),
      };
  }
});
