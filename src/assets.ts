import { loadFlashTexture, loadFont, loadOutlineTexture, loadSprite, loadTexture } from "ridder";

export async function loadAssets() {
  await loadTexture("atlas", "textures/atlas.png");
  await loadFlashTexture("atlas_flash", "textures/atlas.png", "white");
  await loadOutlineTexture("atlas_outline", "textures/atlas.png", "circle", "white");

  loadSprites("player", "atlas", 0, 0, 16, 16);

  loadSprite("item_longsword", "atlas", 0, 64, 32, 32);

  await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
}

function loadSprites(id: string, textureId: string, x: number, y: number, w: number, h: number) {
  loadSprite(id, textureId, x, y, w, h);
  loadSprite(`${id}_shadow`, textureId, x, y + h, w, h);
  loadSprite(`${id}_flash`, `${textureId}_flash`, x, y, w, h);
  loadSprite(`${id}_outline`, `${textureId}_outline`, x, y, w, h);
}
