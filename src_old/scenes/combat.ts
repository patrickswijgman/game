import { newQuickMeleeEnemy } from "entities/enemies/melee-quick.js";
import { newMeleeEnemy } from "entities/enemies/melee.js";
import { newRangedEnemy } from "entities/enemies/ranged.js";
import { newPlayer } from "entities/player.js";
import { newPineTree } from "entities/tree-pine.js";
import { doesRectangleContain, pick, random, rect, resetTimer, roll, setRectangle, tickTimer } from "ridder";
import { addBody, initCamera, newScene, Scene } from "scene.js";

const ENEMIES = ["melee", "melee_quick", "ranged"];

export function newCombatScene() {
  const scene = newScene("combat");

  initCamera(scene);
  initLayout(scene);
  initTheme(scene);
  newPlayer(scene, scene.bounds.w / 2, scene.bounds.h / 2);

  return scene;
}

export function updateCombatScene(scene: Scene) {
  if (tickTimer(scene.enemySpawnTimer, scene.enemySpawnDuration)) {
    const type = pick(ENEMIES);
    const x = random(scene.safeArea.x, scene.safeArea.x + scene.safeArea.w);
    const y = random(scene.safeArea.y, scene.safeArea.y + scene.safeArea.h);

    switch (type) {
      case "melee":
        newMeleeEnemy(scene, x, y);
        break;
      case "melee_quick":
        newQuickMeleeEnemy(scene, x, y);
        break;
      case "ranged":
        newRangedEnemy(scene, x, y);
        break;
    }

    scene.enemySpawnDuration = Math.max(500, scene.enemySpawnDuration - 25);
    resetTimer(scene.enemySpawnTimer);
  }
}

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
