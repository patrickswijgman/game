import { FontId, SpriteId, TextureId } from "@/consts/assets.js";
import { FONT_SIZE } from "@/consts/render.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadSprite, loadTexture, setFont } from "ridder";

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");
  await loadOutlineTexture(TextureId.ATLAS_OUTLINE, "textures/atlas.png", "square", "white");
  await loadFlashTexture(TextureId.ATLAS_FLASH, "textures/atlas.png", "white");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);
  loadSprite(SpriteId.PLAYER_FLASH, TextureId.ATLAS_FLASH, 0, 16, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 96, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 112, 16, 16);

  loadSprite(SpriteId.ATTACK_ARROW, TextureId.ATLAS, 0, 48, 16, 16);
  loadSprite(SpriteId.ATTACK_LONGSWORD, TextureId.ATLAS, 16, 48, 16, 16);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", FONT_SIZE);

  setFont(FontId.DEFAULT);
}
