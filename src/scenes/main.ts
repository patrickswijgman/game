import { newPlayer } from "entities/player.js";
import { setCameraPosition } from "ridder";
import { addEntity, newScene } from "scene.js";

export function newMainScene() {
  const scene = newScene();

  const w = 1000;
  const h = 1000;

  scene.bounds.w = w;
  scene.bounds.h = h;

  const player = newPlayer(scene, w / 2, h / 2);

  addEntity(scene, player);

  setCameraPosition(player.pos.x, player.pos.y);

  return scene;
}
