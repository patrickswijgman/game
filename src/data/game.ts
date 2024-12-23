import { newRun, Run } from "data/run.js";
import { Scene } from "data/scene.js";
import { setCameraBounds } from "ridder";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  sceneNextId: string;
  run: Run;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  sceneNextId: "",
  run: newRun(),
};

export function addScene(id: string, scene: Scene) {
  game.scenes[id] = scene;
  return scene;
}

export function switchScene(id: string) {
  game.sceneNextId = id;
}

export function switchCurrentScene() {
  if (game.sceneId !== game.sceneNextId) {
    game.sceneId = game.sceneNextId;

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
