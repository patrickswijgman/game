import { loadFlashTexture, loadFont, loadOutlineTexture, loadSprite, loadTexture, setFont } from "ridder";

export const enum TextureId {
  NONE,
  ATLAS,
  ATLAS_OUTLINE,
  ATLAS_FLASH,
}

export const enum SpriteId {
  NONE,
  PLAYER,
  PLAYER_SHADOW,
  PLAYER_FLASH,
  ENEMY_MELEE,
  ENEMY_MELEE_SHADOW,
  ENEMY_MELEE_FLASH,
  TREE_PINE,
  TREE_SHADOW,
  XP_ORB,
  XP_ORB_SHADOW,
  ATTACK_ARROW,
  ATTACK_ENEMY_MELEE,
  UI_UPGRADE_BG,
  UI_UPGRADE_OUTLINE,
}

export const enum FontId {
  DEFAULT,
}

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

  loadSprite(SpriteId.UI_UPGRADE_BG, TextureId.ATLAS, 128, 128, 128, 128);
  loadSprite(SpriteId.UI_UPGRADE_OUTLINE, TextureId.ATLAS_OUTLINE, 128, 128, 128, 128);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont(FontId.DEFAULT);
}
