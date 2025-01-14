import { getSprite, getTexture, loadFont, loadRenderTexture, loadSprite, loadTexture, pick, setFont } from "ridder";

const GRASS_TILES = ["tile_grass_1", "tile_grass_2", "tile_grass_3"];

export async function loadAssets() {
  await loadTexture("atlas", "textures/atlas.png");

  loadSprite("player", "atlas", 0, 16, 16, 16);
  loadSprite("tree_pine", "atlas", 0, 64, 16, 16);

  loadSprite("tile_grass_1", "atlas", 0, 80, 16, 16);
  loadSprite("tile_grass_2", "atlas", 16, 80, 16, 16);
  loadSprite("tile_grass_3", "atlas", 32, 80, 16, 16);

  loadRenderTexture("grass", 1024, 1024, (ctx, w, h) => {
    for (let x = 0; x < w; x += 16) {
      for (let y = 0; y < h; y += 16) {
        const tile = pick(GRASS_TILES);
        const sprite = getSprite(tile);
        const texture = getTexture(sprite.textureId);
        ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, x, y, 16, 16);
      }
    }
  });

  await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);

  setFont("default");
}
