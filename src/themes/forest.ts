import { newPineTree } from "entities/tree-pine.js";
import { doesRectangleContain, random, roll } from "ridder";
import { Scene } from "scene.js";

export function initForestTheme(scene: Scene) {
  const { w, h } = scene.bounds;

  scene.backgroundTextureId = "forest_bg";

  for (let x = 0; x <= w; x += 20) {
    for (let y = 0; y <= h; y += 20) {
      if (!doesRectangleContain(scene.safeArea, x, y)) {
        if (roll(0.9)) {
          newPineTree(scene, x + random(-4, 4), y + random(-4, 4));
        }
      }
    }
  }
}
