import { FontId, SpriteId, TextureId } from "@/consts/assets.js";
import { FONT_SIZE } from "@/consts/render.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadRenderTexture, loadSprite, loadTexture, setFont } from "ridder";

export async function loadAssets() {
  loadRenderTexture(TextureId.NONE, 16, 16, (ctx, w, h) => {
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, w, h);
  });

  loadSprite(SpriteId.NONE, TextureId.NONE, 0, 0, 16, 16);

  await loadTexture(TextureId.ATLAS, "textures/atlas.png");
  await loadTexture(TextureId.MAP_TILES, "textures/tiles.png");
  await loadTexture(TextureId.MAP_OBJECTS, "textures/objects.png");

  await loadOutlineTexture(TextureId.ATLAS_OUTLINE, "textures/atlas.png", "square", "white");
  await loadFlashTexture(TextureId.ATLAS_FLASH, "textures/atlas.png", "white");

  // Entities
  loadSprite(SpriteId.PLAYER, TextureId.ATLAS, 0, 16, 16, 16);
  loadSprite(SpriteId.PLAYER_SHADOW, TextureId.ATLAS, 0, 32, 16, 16);
  loadSprite(SpriteId.PLAYER_FLASH, TextureId.ATLAS_FLASH, 0, 16, 16, 16);

  loadSprite(SpriteId.TREE_PINE, TextureId.ATLAS, 0, 96, 16, 16);
  loadSprite(SpriteId.TREE_SHADOW, TextureId.ATLAS, 0, 112, 16, 16);

  // Tiles
  loadSprite(SpriteId.TILE_GRASS, TextureId.ATLAS, 0, 128, 16, 16);

  // Items
  loadSprite(SpriteId.ITEM_LONGSWORD, TextureId.ATLAS, 0, 144, 16, 16);
  loadSprite(SpriteId.ITEM_SHORTBOW, TextureId.ATLAS, 16, 144, 16, 16);
  loadSprite(SpriteId.ITEM_LEATHER_ARMOR, TextureId.ATLAS, 32, 144, 16, 16);

  // Equipment
  loadSprite(SpriteId.EQUIP_LONGSWORD, TextureId.ATLAS, 0, 48, 16, 16);
  loadSprite(SpriteId.EQUIP_SHORTBOW, TextureId.ATLAS, 16, 48, 16, 16);
  loadSprite(SpriteId.EQUIP_LEATHER_ARMOR, TextureId.ATLAS, 32, 48, 16, 16);

  // Attacks
  loadSprite(SpriteId.ATTACK_LONGSWORD, TextureId.ATLAS, 0, 64, 16, 16);
  loadSprite(SpriteId.ATTACK_ARROW, TextureId.ATLAS, 16, 64, 16, 16);

  // UI
  loadSprite(SpriteId.SLOT, TextureId.ATLAS, 0, 160, 16, 16);
  loadSprite(SpriteId.SLOT_ACTIVE, TextureId.ATLAS, 16, 160, 16, 16);
  loadSprite(SpriteId.SLOT_SELECT, TextureId.ATLAS, 32, 160, 32, 32);

  await loadFont(FontId.DEFAULT, "fonts/pixelmix.ttf", "pixelmix", FONT_SIZE);

  setFont(FontId.DEFAULT);
}
