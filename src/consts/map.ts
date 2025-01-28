import { SpriteId } from "@/consts/assets.js";
import { Type } from "@/consts/type.js";

export const enum TileId {
  NONE,
  FOREST,
  PLAIN,
}

export const TILE_SIZE = 16;
export const MAP_WIDTH = 64;
export const MAP_HEIGHT = 64;
export const MAP_WORLD_WIDTH = MAP_WIDTH * TILE_SIZE;
export const MAP_WORLD_HEIGHT = MAP_HEIGHT * TILE_SIZE;

export const COLOR_TO_TILE: Readonly<Record<string, TileId>> = {
  "#273d41": TileId.FOREST,
  "#4b7b5b": TileId.PLAIN,
};

export const COLOR_TO_ENTITY: Readonly<Record<string, Type>> = {
  "#ffffff": Type.PLAYER,
  "#ff0000": Type.ENEMY,
};

export const TILE_TO_SPRITE: Readonly<Record<TileId, SpriteId>> = {
  [TileId.NONE]: SpriteId.NONE,
  [TileId.FOREST]: SpriteId.TILE_GRASS,
  [TileId.PLAIN]: SpriteId.TILE_GRASS,
};
