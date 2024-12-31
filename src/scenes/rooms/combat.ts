import { newDummy } from "entities/enemies/dummy.js";
import { newPlayer } from "entities/player.js";
import { switchScene } from "game.js";
import { setCameraPosition } from "ridder";
import { newScene, Scene } from "scene.js";
import { addForestTheme } from "scenes/rooms/theme/forest.js";

export function newCombatRoomScene() {
  const scene = newScene("room", "room_combat");

  const w = 800;
  const h = 600;

  scene.bounds.w = w;
  scene.bounds.h = h;
  scene.camera.smoothing = 0.05;
  scene.camera.shakeReduction = 0.01;
  scene.camera.bounds = scene.bounds;
  scene.backgroundTextureId = "grass";

  const player = newPlayer(scene, w / 2, h / 2);

  newDummy(scene, player.pos.x, player.pos.y - 50);

  addForestTheme(scene, w, h);

  setCameraPosition(scene.camera, player.pos.x, player.pos.y);

  return scene;
}

export function updateCombatRoomScene(scene: Scene) {
  if (scene.enemies.length === 0) {
    switchScene("map");
  }
}
