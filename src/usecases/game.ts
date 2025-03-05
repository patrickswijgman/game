import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";

export function switchScene(id: SceneId) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  game.sceneId = game.sceneNextId;
}

export function getScene(id: SceneId) {
  return game.scenes[id];
}
