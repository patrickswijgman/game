import { COLOR_DANGER } from "consts.js";
import { loadFlashTexture, loadFont, loadOutlineTexture, loadRenderTexture, loadSprite, loadTexture } from "ridder";

export async function loadAssets() {
  await loadTexture("atlas", "textures/atlas.png");
  await loadFlashTexture("atlas_flash", "textures/atlas.png", "white");
  await loadOutlineTexture("atlas_outline", "textures/atlas.png", "square", "white");
  await loadOutlineTexture("atlas_outline_danger", "textures/atlas.png", "square", COLOR_DANGER);

  loadSprites("player", "atlas", 0, 0, 32, 32);
  loadSprites("bandit", "atlas", 32, 0, 32, 32);
  loadSprites("wolf", "atlas", 64, 0, 32, 32);

  loadSprites("tree_pine", "atlas", 0, 96, 32, 32);
  loadSprites("portal", "atlas", 32, 96, 32, 32);
  loadSprites("experience_orb", "atlas", 64, 96, 16, 16);
  loadSprites("bonfire", "atlas", 80, 96, 32, 32);

  loadSprites("particle_portal", "atlas", 0, 160, 16, 16);

  loadSprite("longsword", "atlas", 0, 64, 32, 32);
  loadSprite("bite", "atlas", 32, 64, 32, 32);

  loadSprites("icon_experience", "atlas", 0, 192, 16, 16);

  loadRenderTexture("forest_bg", 1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#3d6556";
    ctx.fillRect(0, 0, w, h);
  });

  await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
}

function loadSprites(id: string, textureId: string, x: number, y: number, w: number, h: number) {
  loadSprite(id, textureId, x, y, w, h);
  loadSprite(`${id}_shadow`, textureId, x, y + h, w, h);
  loadSprite(`${id}_flash`, `${textureId}_flash`, x, y, w, h);
  loadSprite(`${id}_outline`, `${textureId}_outline`, x, y, w, h);
  loadSprite(`${id}_outline_danger`, `${textureId}_outline_danger`, x, y, w, h);
}
