import { COLOR_GRASS } from "@/consts/colors.js";
import { SceneId } from "@/consts/scene.js";
import { Scene } from "@/data/scene.js";
import { writeRandomPointInPerimeterBetweenRectangles } from "@/engine/rectangle.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { getScene } from "@/usecases/game.js";
import { addBody } from "@/usecases/scene.js";
import { copyRectangle, doesRectangleContain, random, rect, resetTimer, setBackgroundColor, setCameraPosition, setRectangle, tickTimer, vec } from "ridder";

const w = 400;
const h = 300;
const outside = rect(-50, -50, w + 100, h + 100);
const border = rect(0, 0, w, h);
const field = rect(50, 50, w - 100, h - 100);
const pos = vec();

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  setBackgroundColor(COLOR_GRASS);

  // Boundary
  setRectangle(scene.bounds, 0, 0, w, h);
  addBody(scene, rect(0, 0, w, 40));
  addBody(scene, rect(0, 0, 40, h));
  addBody(scene, rect(w - 40, 0, 40, h));
  addBody(scene, rect(0, h - 40, w, 40));

  // Camera
  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  copyRectangle(scene.camera.bounds, scene.bounds);
  setCameraPosition(scene.camera, w / 2, h / 2);

  // Entities
  addPlayer(scene.id, w / 2, h / 2);

  for (let i = -4; i <= w; i += 12) {
    for (let j = -4; j <= h; j += 12) {
      const x = i + random(4, 8);
      const y = j + random(4, 8);

      if (doesRectangleContain(field, x, y)) {
        continue;
      }

      addTree(scene.id, x, y);
    }
  }

  return scene;
}

export function updateWorldScene(scene: Scene) {
  if (tickTimer(scene.spawnTimer, scene.spawnTime)) {
    writeRandomPointInPerimeterBetweenRectangles(outside, border, pos);
    addMeleeEnemy(scene.id, pos.x, pos.y);
    resetTimer(scene.spawnTimer);
  }
}
