import { loadFont, loadSprite, loadTexture, setFont } from "ridder";

export const enum TextureId {
  NONE,
  ATLAS,
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

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 64, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 80, 16, 16);

  loadSprite(SpriteId.TILE_GRASS_1, TextureId.ATLAS, 0, 96, 16, 16);
  loadSprite(SpriteId.TILE_GRASS_2, TextureId.ATLAS, 16, 96, 16, 16);
  loadSprite(SpriteId.TILE_GRASS_3, TextureId.ATLAS, 32, 96, 16, 16);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont(FontId.DEFAULT);
}
