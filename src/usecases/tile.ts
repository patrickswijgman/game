import { TILE_SIZE } from "@/consts.js";
import { addTree } from "@/entities/tree.js";
import { SpriteId } from "@/enums/assets.js";
import { TileId } from "@/enums/tile.js";
import { drawSprite, roll } from "ridder";

export function populateTile(id: TileId, sceneId: number, x: number, y: number) {
  const worldX = x * TILE_SIZE;
  const worldY = y * TILE_SIZE;
  const centerX = worldX + TILE_SIZE / 2;
  const centerY = worldY + TILE_SIZE / 2;
  switch (id) {
    case TileId.FOREST:
      if (roll(0.8)) {
        addTree(sceneId, centerX, centerY + 4);
      }
      break;
  }
}

export function renderTile(id: TileId, x: number, y: number) {
  const worldX = x * TILE_SIZE;
  const worldY = y * TILE_SIZE;
  switch (id) {
    case TileId.FOREST:
      drawSprite(SpriteId.TILE_GRASS, worldX, worldY);
      break;
  }
}
