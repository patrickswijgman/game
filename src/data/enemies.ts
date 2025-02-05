import { SpriteId } from "@/consts/assets.js";
import { EnemyId } from "@/consts/enemy.js";
import { ItemId } from "@/consts/item.js";
import { newStats, Stats } from "@/data/stats.js";
import { table } from "ridder";

export type Enemy = {
  sprites: [spriteId: SpriteId, shadowId: SpriteId, flashId: SpriteId, outlineId: SpriteId];
  stats: Stats;
  weaponId: ItemId;
  armorId: ItemId;
  offhandId: ItemId;
  hitbox: [x: number, y: number, w: number, h: number];
};

export const enemies = table<Enemy>(EnemyId.MAX, (id) => {
  switch (id) {
    case EnemyId.DUMMY:
      return {
        sprites: [SpriteId.PLAYER, SpriteId.PLAYER_SHADOW, SpriteId.PLAYER_FLASH, SpriteId.NONE],
        stats: newStats({
          health: 10,
          healthMax: 10,
          movementSpeed: 1,
          movementSpeedMax: 1.5,
        }),
        weaponId: ItemId.LONGSWORD,
        armorId: ItemId.NONE,
        offhandId: ItemId.WOODEN_SHIELD,
        hitbox: [-3, -8, 6, 8],
      };

    default:
      return {
        sprites: [SpriteId.NONE, SpriteId.NONE, SpriteId.NONE, SpriteId.NONE],
        stats: newStats(),
        weaponId: ItemId.NONE,
        armorId: ItemId.NONE,
        offhandId: ItemId.NONE,
        hitbox: [0, 0, 0, 0],
      };
  }
});
