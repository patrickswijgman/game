import { COLOR_PRIMARY } from "consts.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadRenderTexture, loadSprite, loadTexture } from "ridder";

export async function loadAssets() {
  await loadTexture("atlas", "textures/atlas.png");
  await loadFlashTexture("atlas_flash", "textures/atlas.png", "white");
  await loadOutlineTexture("atlas_outline", "textures/atlas.png", "square", "white");
  await loadOutlineTexture("atlas_outline_primary", "textures/atlas.png", "square", COLOR_PRIMARY);

  loadSprites("player", "atlas", 0, 0, 32, 32);
  loadSprites("bandit", "atlas", 32, 0, 32, 32);

  loadSprites("tree_pine", "atlas", 0, 96, 32, 32);

  loadSprite("item_longsword", "atlas", 0, 64, 32, 32);

  loadSprites("ui_map_start", "atlas", 0, 176, 16, 16);
  loadSprites("ui_map_combat", "atlas", 16, 176, 16, 16);
  loadSprites("ui_map_boss", "atlas", 32, 176, 16, 16);
  loadSprites("ui_map_current", "atlas", 48, 176, 16, 16);

  loadRenderTexture("map_bg", 1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = COLOR_PRIMARY;
    ctx.fillRect(0, 0, w, h);
  });

  loadRenderTexture("forest_bg", 1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#3d6457";
    ctx.fillRect(0, 0, w, h);
  });

  await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
}

function loadSprites(id: string, textureId: string, x: number, y: number, w: number, h: number) {
  loadSprite(id, textureId, x, y, w, h);
  loadSprite(`${id}_shadow`, textureId, x, y + h, w, h);
  loadSprite(`${id}_flash`, `${textureId}_flash`, x, y, w, h);
  loadSprite(`${id}_outline`, `${textureId}_outline`, x, y, w, h);
  loadSprite(`${id}_outline_primary`, `${textureId}_outline_primary`, x, y, w, h);
}
