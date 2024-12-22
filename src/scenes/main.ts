import { addScene } from "game.js";
import { addPlayer } from "entities/player.js";

export function addMainScene() {
  addScene("main", (scene) => {
    scene.bounds.w = 1000;
    scene.bounds.h = 1000;

    addPlayer(scene, scene.bounds.w / 2, scene.bounds.h / 2);
  });
}
