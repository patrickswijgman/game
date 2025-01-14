import { getSprite, getTexture, loadFont, loadRenderTexture, loadSprite, loadTexture, pick, setFont } from "ridder";

/*
 * TODO tables and enums for resources? (requires engine update)
 */

export const enum TextureId {
  NONE,
  ATLAS,
  GRASS,
}

export const enum SpriteId {
  NONE,
  PLAYER,
  PLAYER_SHADOW,
  TREE_PINE,
  TREE_SHADOW,
  TILE_GRASS_1,
  TILE_GRASS_2,
  TILE_GRASS_3,
}

export const enum FontId {
  DEFAULT,
}

const GRASS_TILES = [SpriteId.TILE_GRASS_1, SpriteId.TILE_GRASS_2, SpriteId.TILE_GRASS_3];

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 64, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 80, 16, 16);

  loadSprite(SpriteId.TILE_GRASS_1, TextureId.ATLAS, 0, 96, 16, 16);
  loadSprite(SpriteId.TILE_GRASS_2, TextureId.ATLAS, 16, 96, 16, 16);
  loadSprite(SpriteId.TILE_GRASS_3, TextureId.ATLAS, 32, 96, 16, 16);

  loadRenderTexture(TextureId.GRASS, 1024, 1024, (ctx, w, h) => {
    for (let x = 0; x < w; x += 16) {
      for (let y = 0; y < h; y += 16) {
        const tile = pick(GRASS_TILES);
        const sprite = getSprite(tile);
        const texture = getTexture(sprite.textureId);
        ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, x, y, 16, 16);
      }
    }
  });

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont(FontId.DEFAULT);
}
