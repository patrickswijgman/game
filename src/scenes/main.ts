import { newDummy } from "entities/enemies/dummy.js";
import { newPlayer } from "entities/player.js";
import { repeat, setCameraPosition } from "ridder";
import { newScene } from "scene.js";

export function loadMainScene() {
  const scene = newScene("main");

  const w = 1000;
  const h = 1000;

  scene.bounds.w = w;
  scene.bounds.h = h;
  scene.camera.smoothing = 0.05;
  scene.camera.shakeReduction = 0.01;

  const player = newPlayer(scene, w / 2, h / 2);

  repeat(1, (x) => {
    repeat(1, (y) => {
      newDummy(scene, player.pos.x - 50 + x * 10, player.pos.y - 50 + y * 5);
    });
  });

  setCameraPosition(scene.camera, player.pos.x, player.pos.y);
}
