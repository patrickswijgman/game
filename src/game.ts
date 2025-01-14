import { Table, table } from "@/engine/table.js";
import { newScene, Scene } from "@/scene.js";

export type Game = {
  scenes: Table<Scene>;
  sceneId: number;
  sceneNextId: number;
};

export function newGame(): Game {
  return {
    scenes: table(16, newScene),
    sceneId: 0,
    sceneNextId: 0,
  };
}

export const game = newGame();

export function addScene() {
  const idx = game.scenes.findIndex((scene) => !scene.isAssigned);

  if (idx === -1) {
    throw new Error("Out of scenes :(");
  }

  const scene = game.scenes[idx];

  scene.id = idx;
  scene.isAssigned = true;

  return scene;
}

export function getScene(id: number) {
  return game.scenes[id];
}
