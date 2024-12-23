import { newRun, Run } from "data/run.js";
import { Scene } from "data/scene.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  run: Run;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  run: newRun(),
};

export function addScene(id: string, scene: Scene) {
  game.scenes[id] = scene;
}

export function switchScene(id: string) {
  game.sceneId = id;
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
