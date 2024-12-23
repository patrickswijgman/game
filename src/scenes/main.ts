import { addScene } from "data/game.js";
import { newScene } from "data/scene.js";
import { addPlayer } from "entities/player.js";
import { setCameraPosition } from "ridder";

export function loadMainScene() {
  const scene = newScene();

  const w = 1000;
  const h = 1000;

  scene.bounds.w = w;
  scene.bounds.h = h;

  const player = addPlayer(scene, w / 2, h / 2);

  setCameraPosition(player.pos.x, player.pos.y);

  addScene("main", scene);
}
