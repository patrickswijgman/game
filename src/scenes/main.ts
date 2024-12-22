import { addPlayer } from "entities/player.js";
import { addScene } from "game.js";

export function addMainScene() {
  return addScene("main", (scene) => {
    scene.bounds.w = 1000;
    scene.bounds.h = 1000;

    addPlayer(scene, scene.bounds.w / 2, scene.bounds.h / 2);
  });
}
