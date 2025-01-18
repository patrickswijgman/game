import { game } from "@/data/game.js";
import { SceneId } from "@/enums/scene.js";

export function switchScene(id: SceneId) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  game.sceneId = game.sceneNextId;
}

export function getScene(id: SceneId) {
  return game.scenes[id];
}
