import { FONT_SIZE } from "@/consts.js";
import { FontId, SpriteId, TextureId } from "@/enums/assets.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadSprite, loadTexture, setFont } from "ridder";

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");
  await loadTexture(TextureId.MAP_TILES, "textures/tiles.png");
  await loadTexture(TextureId.MAP_OBJECTS, "textures/objects.png");

  await loadOutlineTexture(TextureId.ATLAS_OUTLINE, "textures/atlas.png", "square", "white");
  await loadFlashTexture(TextureId.ATLAS_FLASH, "textures/atlas.png", "white");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);
  loadSprite(SpriteId.PLAYER_FLASH, TextureId.ATLAS_FLASH, 0, 16, 16, 16);

  loadSprite(SpriteId.EQUIP_LONGSWORD, TextureId.ATLAS, 16, 16, 16, 16);

  loadSprite(SpriteId.ATTACK_LONGSWORD, TextureId.ATLAS, 32, 16, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 64, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 80, 16, 16);

  loadSprite(SpriteId.TILE_GRASS, TextureId.ATLAS, 0, 96, 16, 16);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", FONT_SIZE);

  setFont(FontId.DEFAULT);
}
