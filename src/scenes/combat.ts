import { newPlayer } from "entities/player.js";
import { newPineTree } from "entities/tree-pine.js";
import { doesRectangleContain, random, rect, roll, setRectangle } from "ridder";
import { addBody, initCamera, newScene, Scene } from "scene.js";

export function newCombatScene() {
  const scene = newScene("combat");

  initCamera(scene);
  initLayout(scene);
  initTheme(scene);
  newPlayer(scene, scene.bounds.w / 2, scene.bounds.h / 2);

  return scene;
}

export function updateCombatScene(scene: Scene) {}

function initLayout(scene: Scene) {
  const w = 2048;
  const h = 2048;

  setRectangle(scene.bounds, 0, 0, w, h);
  setRectangle(scene.safeArea, 100, 100, w - 200, h - 200);

  addBody(scene, rect(0, 0, 100, h));
  addBody(scene, rect(w - 100, 0, 100, h));
  addBody(scene, rect(0, 0, w, 100));
  addBody(scene, rect(0, h - 100, w, 100));
}

export function initTheme(scene: Scene) {
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
