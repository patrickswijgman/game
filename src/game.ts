import { newScene, Scene } from "@/scene.js";
import { Table, table } from "ridder";

export const enum SceneId {
  NONE,
  TEST,
}

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

export function switchScene(id: number) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  game.sceneId = game.sceneNextId;
}

export function getScene(id: number) {
  return game.scenes[id];
}
