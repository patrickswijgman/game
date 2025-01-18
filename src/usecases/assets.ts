import { FontId, SpriteId, TextureId } from "@/enums/assets.js";
import { loadFont, loadSprite, loadTexture, setFont } from "ridder";

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 64, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 80, 16, 16);

  loadSprite(SpriteId.TILE_GRASS, TextureId.ATLAS, 0, 96, 16, 16);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont(FontId.DEFAULT);
}
