import { newBanditMelee } from "entities/enemies/melee-bandit.js";
import { newPlayer } from "entities/player.js";
import { getSession, switchScene } from "game.js";
import { ENEMY_AMOUNT_PER_LEVEL, ENEMY_TYPES_PER_LEVEL, getCurrentDungeonRoom } from "map.js";
import { pick, random, repeat, setCameraPosition } from "ridder";
import { newScene, Scene } from "scene.js";
import { addForestTheme } from "themes/forest.js";

export function newCombatRoomScene() {
  const scene = newScene("room", "room_combat");

  const w = 800;
  const h = 600;

  scene.bounds.w = w;
  scene.bounds.h = h;
  scene.camera.smoothing = 0.05;
  scene.camera.shakeReduction = 0.01;
  scene.camera.bounds = scene.bounds;

  const player = newPlayer(scene, w / 2, h / 2);

  addForestTheme(scene, w, h);
  addEnemies(scene);

  setCameraPosition(scene.camera, player.pos.x, player.pos.y);

  return scene;
}

export function updateCombatRoomScene(scene: Scene) {
  if (scene.enemies.length === 0) {
    switchScene("map");
  }
}

function addEnemies(scene: Scene) {
  const session = getSession();
  const room = getCurrentDungeonRoom(session.map);
  const [min, max] = ENEMY_AMOUNT_PER_LEVEL[room.y];
  const amount = random(min, max);

  repeat(amount, () => {
    const x = scene.safeArea.x + random(0, scene.safeArea.w);
    const y = scene.safeArea.y + random(0, scene.safeArea.h);

    const type = pick(ENEMY_TYPES_PER_LEVEL[room.y]);

    switch (type) {
      case "melee":
        newBanditMelee(scene, x, y);
        break;
    }
  });
}
