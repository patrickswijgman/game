import { newPlayer } from "entities/player.js";
import { setCameraPosition } from "ridder";
import { newScene } from "scene.js";

export function loadMainScene() {
  const scene = newScene("main");

  const w = 1000;
  const h = 1000;

  scene.bounds.w = w;
  scene.bounds.h = h;

  const player = newPlayer(scene, w / 2, h / 2);

  setCameraPosition(player.pos.x, player.pos.y);
}
