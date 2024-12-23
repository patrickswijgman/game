import { newRun, Run } from "data/run.js";
import { Scene } from "data/scene.js";
import { setCameraBounds } from "ridder";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  nextSceneId: string;
  run: Run;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  nextSceneId: "",
  run: newRun(),
};

export function addScene(id: string, scene: Scene) {
  game.scenes[id] = scene;
}

export function switchScene(id: string) {
  game.nextSceneId = id;
}

export function updateScene() {
  if (game.sceneId !== game.nextSceneId) {
    game.sceneId = game.nextSceneId;

    const scene = game.scenes[game.sceneId];
    setCameraBounds(scene.bounds);
  }
}

export function getScene(id: string) {
  return game.scenes[id];
}

export function getCurrentScene() {
  return game.scenes[game.sceneId];
}

export function getCurrentRun() {
  return game.run;
}
