import { TILE_SIZE } from "@/consts.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { TextureId } from "@/enums/assets.js";
import { EntityType } from "@/enums/entity.js";
import { SceneId } from "@/enums/scene.js";
import { COLOR_TO_ENTITY, COLOR_TO_TILE, TILE_TO_SPRITE, TileId } from "@/enums/tile.js";
import { getSprite, getTexture, loadRenderTexture, roll, toHex } from "ridder";

export function populateTiles(sceneId: SceneId) {
  readMapTexture(TextureId.MAP_TILES, (color, x, y) => {
    const worldX = x * TILE_SIZE;
    const worldY = y * TILE_SIZE;
    const centerX = worldX + TILE_SIZE / 2;
    const centerY = worldY + TILE_SIZE / 2;
    const id = COLOR_TO_TILE[color];
    switch (id) {
      case TileId.FOREST:
        if (roll(0.8)) {
          addTree(sceneId, centerX, centerY + 4);
        }
        break;
    }
  });

  readMapTexture(TextureId.MAP_OBJECTS, (color, x, y) => {
    const worldX = x * TILE_SIZE;
    const worldY = y * TILE_SIZE;
    const centerX = worldX + TILE_SIZE / 2;
    const centerY = worldY + TILE_SIZE / 2;
    const type = COLOR_TO_ENTITY[color];
    switch (type) {
      case EntityType.PLAYER:
        addPlayer(sceneId, centerX, centerY);
        break;
    }
  });
}

export function loadFloorTexture() {
  const texture = getTexture(TextureId.MAP_TILES);
  const w = texture.width * TILE_SIZE;
  const h = texture.height * TILE_SIZE;

  loadRenderTexture(TextureId.FLOOR, w, h, (ctx) => {
    readMapTexture(TextureId.MAP_TILES, (color, x, y) => {
      const id = COLOR_TO_TILE[color];
      const spriteId = TILE_TO_SPRITE[id];
      const sprite = getSprite(spriteId);
      const texture = getTexture(sprite.textureId);
      ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, x * TILE_SIZE, y * TILE_SIZE, sprite.w, sprite.h);
    });
  });
}

export function readMapTexture(textureId: TextureId, callback: (color: string, x: number, y: number) => void) {
  const texture = getTexture(textureId);
  const ctx = texture.getContext("2d");
  const w = texture.width;
  const h = texture.height;
  const { data } = ctx.getImageData(0, 0, w, h);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    const x = (i / 4) % w;
    const y = Math.floor(i / 4 / h);
    callback(color, x, y);
  }
}
