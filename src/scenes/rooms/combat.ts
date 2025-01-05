import { newQuickMeleeEnemy } from "entities/enemies/melee-quick.js";
import { newMeleeEnemy } from "entities/enemies/melee.js";
import { newRangedEnemy } from "entities/enemies/ranged.js";
import { newPlayer } from "entities/player.js";
import { newPortal } from "entities/portal.js";
import { ENEMY_AMOUNT_PER_LEVEL, ENEMY_TYPES_PER_LEVEL } from "map.js";
import { pick, random, rect, setRectangle, setVector } from "ridder";
import { addBody, initCamera, newRoom, Scene } from "scene.js";
import { initForestTheme } from "themes/forest.js";

export function newCombatRoomScene(level: number) {
  const scene = newRoom("room_combat", "combat", level);

  initCamera(scene);
  initLayout(scene);
  initForestTheme(scene);
  newPlayer(scene, scene.playerStart.x, scene.playerStart.y);
  addEnemies(scene);

  return scene;
}

export function updateCombatRoomScene(scene: Scene) {
  if (scene.enemies.length === 0 && !scene.isPortalSpawned) {
    newPortal(scene, scene.portalPosition.x, scene.portalPosition.y);
    scene.isPortalSpawned = true;
  }
}

function initLayout(scene: Scene) {
  const w = 800;
  const h = 600;

  setRectangle(scene.bounds, 0, 0, w, h);
  setRectangle(scene.safeArea, 100, 100, w - 200, h - 200);

  addBody(scene, rect(0, 0, 100, h));
  addBody(scene, rect(w - 100, 0, 100, h));
  addBody(scene, rect(0, 0, w, 100));
  addBody(scene, rect(0, h - 100, w, 100));

  const x = scene.safeArea.x + random(50, scene.safeArea.w - 100);
  const y = scene.safeArea.y + random(50, scene.safeArea.h - 100);

  setVector(scene.playerStart, x, y);
  setVector(scene.portalPosition, w / 2, h / 2);
}

function addEnemies(scene: Scene) {
  const [min, max] = ENEMY_AMOUNT_PER_LEVEL[scene.roomLevel];
  const amount = random(min, max);

  for (let i = 0; i < amount; i++) {
    const x = scene.safeArea.x + random(10, scene.safeArea.w - 20);
    const y = scene.safeArea.y + random(10, scene.safeArea.h - 20);
    const type = pick(ENEMY_TYPES_PER_LEVEL[scene.roomLevel]);

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
  }
}
