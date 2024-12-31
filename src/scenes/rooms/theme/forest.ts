import { newPineTree } from "entities/tree-pine.js";
import { doesRectangleContain, random, rect, roll } from "ridder";
import { Scene } from "scene.js";

export function addForestTheme(scene: Scene, w: number, h: number) {
  const safe = rect(100, 100, w - 200, h - 200);

  for (let x = 0; x <= w; x += 20) {
    for (let y = 0; y <= h; y += 20) {
      if (!doesRectangleContain(safe, x, y)) {
        if (roll(0.9)) {
          newPineTree(scene, x + random(-4, 4), y + random(-4, 4));
        }
      }
    }
  }
}
