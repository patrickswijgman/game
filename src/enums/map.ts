import { SpriteId } from "@/enums/assets.js";
import { EntityType } from "@/enums/entity.js";

export const enum TileId {
  NONE,
  FOREST,
  PLAIN,
}

export const COLOR_TO_TILE: Readonly<Record<string, TileId>> = {
  "#273d41": TileId.FOREST,
  "#4b7b5b": TileId.PLAIN,
};

export const COLOR_TO_ENTITY: Readonly<Record<string, EntityType>> = {
  "#ffffff": EntityType.PLAYER,
};

export const TILE_TO_SPRITE: Readonly<Record<TileId, SpriteId>> = {
  [TileId.NONE]: SpriteId.NONE,
  [TileId.FOREST]: SpriteId.TILE_GRASS,
  [TileId.PLAIN]: SpriteId.TILE_GRASS,
};
