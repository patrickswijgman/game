import { Scene } from "scene.js";

export type Game = {
  scenes: Record<string, Scene>;
  scene: string;
};

const game: Game = {
  scenes: {},
  scene: "",
};

export function addSceneToGame(id: string, scene: Scene) {
  game.scenes[id] = scene;
}

export function switchScene(id: string) {
  game.scene = id;
}

export function getCurrentScene() {
  return game.scenes[game.scene];
}
