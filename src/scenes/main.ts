import { addScene } from "game.js";
import { addPlayer } from "player.js";

export function addMainScene() {
  addScene("main", (scene) => {
    scene.bounds.w = 512;
    scene.bounds.h = 512;

    addPlayer(scene, scene.bounds.w / 2, scene.bounds.h / 2);
  });
}
