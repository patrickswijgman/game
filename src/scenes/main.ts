import { addEntity, newScene } from "data/scene.js";
import { newPlayer } from "entities/player.js";
import { setCameraPosition } from "ridder";

export function newMainScene() {
  const scene = newScene();

  const w = 1000;
  const h = 1000;

  scene.bounds.w = w;
  scene.bounds.h = h;

  const player = newPlayer(w / 2, h / 2);

  addEntity(scene, player);

  setCameraPosition(player.pos.x, player.pos.y);

  return scene;
}
