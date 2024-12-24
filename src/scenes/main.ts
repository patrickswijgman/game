import { newDummy } from "entities/enemies/dummy.js";
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

  newDummy(scene, player.pos.x - 50, player.pos.y - 50);

  setCameraPosition(player.pos.x, player.pos.y);
}
