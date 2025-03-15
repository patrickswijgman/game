import { FontId, SpriteId, TextureId } from "@/consts/assets.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadSprite, loadTexture, setFont } from "ridder";

export async function loadAssets() {
  await loadTexture(TextureId.ATLAS, "textures/atlas.png");

  loadOutlineTexture(TextureId.ATLAS_OUTLINE, TextureId.ATLAS, "square", "white");
  loadFlashTexture(TextureId.ATLAS_FLASH, TextureId.ATLAS, "white");

  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);
  loadSprite(SpriteId.PLAYER_FLASH, TextureId.ATLAS_FLASH, 0, 16, 16, 16);

  loadSprite(SpriteId.ENEMY_MELEE, TextureId.ATLAS, 16, 16, 16, 16);
  loadSprite(SpriteId.ENEMY_MELEE_SHADOW, TextureId.ATLAS, 16, 32, 16, 16);
  loadSprite(SpriteId.ENEMY_MELEE_FLASH, TextureId.ATLAS_FLASH, 16, 16, 16, 16);

  loadSprite(SpriteId.ATTACK_ARROW, TextureId.ATLAS, 0, 48, 16, 16);
  loadSprite(SpriteId.ATTACK_ENEMY_MELEE, TextureId.ATLAS, 16, 48, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 80, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 96, 16, 16);
  loadSprite(SpriteId.XP_ORB, TextureId.ATLAS, 16, 80, 16, 16);
  loadSprite(SpriteId.XP_ORB_SHADOW, TextureId.ATLAS, 16, 96, 16, 16);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont(FontId.DEFAULT);
}
