import { TILE_SIZE } from "@/consts.js";
import { Scene } from "@/data/scene.js";
import { applyCameraTransform, drawLine, getGridHeight, getGridWidth, isGridValid, resetTransform } from "ridder";

export function debugSceneTiles(scene: Scene) {
  if (isGridValid(scene.tiles)) {
    resetTransform();
    applyCameraTransform(scene.camera);
    const w = getGridWidth(scene.tiles);
    const h = getGridHeight(scene.tiles);
    const c = "rgba(255, 255, 255, 0.2)";
    for (let x = 0; x <= w; x++) {
      drawLine(x * TILE_SIZE, 0, x * TILE_SIZE, scene.bounds.h, c);
    }
    for (let y = 0; y <= h; y++) {
      drawLine(0, y * TILE_SIZE, scene.bounds.w, y * TILE_SIZE, c);
    }
  }
}
