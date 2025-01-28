import { TextureId } from "@/consts/assets.js";
import { COLOR_TO_ENTITY, COLOR_TO_TILE, MAP_HEIGHT, MAP_WIDTH, TILE_SIZE, TILE_TO_SPRITE, TileId } from "@/consts/map.js";
import { SceneId } from "@/consts/scene.js";
import { Type } from "@/consts/type.js";
import { addEnemy } from "@/entities/enemy.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { getSprite, getTexture, loadRenderTexture, random, roll, toHex } from "ridder";

export function populateMap(sceneId: SceneId) {
  readMapTexture(TextureId.MAP_TILES, (color, x, y, worldX, worldY, worldCenterX, worldCenterY) => {
    const id = COLOR_TO_TILE[color];
    switch (id) {
      case TileId.FOREST:
        if (roll(0.9)) {
          addTree(sceneId, worldCenterX + random(-4, 4), worldCenterY + random(-4, 4));
        }
        break;
    }
  });

  readMapTexture(TextureId.MAP_OBJECTS, (color, x, y, worldX, worldY, worldCenterX, worldCenterY) => {
    const type = COLOR_TO_ENTITY[color];
    switch (type) {
      case Type.PLAYER:
        addPlayer(sceneId, worldCenterX, worldCenterY);
        break;
      case Type.ENEMY:
        addEnemy(sceneId, worldCenterX, worldCenterY);
        break;
    }
  });
}

export function loadMapFloorTexture() {
  loadRenderTexture(TextureId.FLOOR, 2048, 2048, (ctx) => {
    readMapTexture(TextureId.MAP_TILES, (color, x, y, worldX, worldY) => {
      const id = COLOR_TO_TILE[color];
      const spriteId = TILE_TO_SPRITE[id];
      const sprite = getSprite(spriteId);
      const texture = getTexture(sprite.textureId);
      ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, worldX, worldY, sprite.w, sprite.h);
    });
  });
}

export function readMapTexture(textureId: TextureId, callback: (color: string, x: number, y: number, worldX: number, worldY: number, worldCenterX: number, worldCenterY: number) => void) {
  const texture = getTexture(textureId);
  const ctx = texture.getContext("2d");
  const { data } = ctx.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    const x = (i / 4) % MAP_WIDTH;
    const y = Math.floor(i / 4 / MAP_HEIGHT);
    const worldX = x * TILE_SIZE;
    const worldY = y * TILE_SIZE;
    const worldCenterX = worldX + TILE_SIZE / 2;
    const worldCenterY = worldY + TILE_SIZE / 2;
    callback(color, x, y, worldX, worldY, worldCenterX, worldCenterY);
  }
}
