import { loadFont, loadSprite, loadTexture } from "ridder";

export async function loadAssets() {
  await loadTexture("atlas", "textures/atlas.png");
  loadSprite("player", "atlas", 0, 0, 16, 16);
  loadSprite("player_shadow", "atlas", 0, 16, 16, 16);

  loadSprite("item_longsword", "atlas", 0, 64, 32, 32);

  await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
}
