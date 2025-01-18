import { game } from "@/data/game.js";

export function nextScene() {
  const id = game.scenes.findIndex((scene) => !scene.isAllocated);

  if (id === -1) {
    throw new Error("Out of scenes :(");
  }

  const scene = game.scenes[id];
  scene.isAllocated = true;
  scene.id = id;
  return scene;
}

export function switchScene(id: number) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  game.sceneId = game.sceneNextId;
}

export function getScene(id: number) {
  return game.scenes[id];
}
