import { newScene, Scene } from "scene.js";

export type Game = {
  scenes: Record<string, Scene>;
  scene: string;
};

const game: Game = {
  scenes: {},
  scene: "",
};

export function addScene(id: string, setup?: (scene: Scene) => void) {
  const scene = newScene();

  game.scenes[id] = scene;

  if (setup) {
    setup(scene);
  }
}

export function switchScene(id: string) {
  game.scene = id;
}

export function getScene(id: string) {
  return game.scenes[id];
}

export function getCurrentScene() {
  return game.scenes[game.scene];
}
