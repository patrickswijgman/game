import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";

export function switchScene(id: SceneId) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  if (game.sceneNextId !== game.sceneId) {
    game.sceneId = game.sceneNextId;
    return true;
  }

  return false;
}

export function getScene(id: SceneId) {
  return game.scenes[id];
}
