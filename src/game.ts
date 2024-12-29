import { destroyScene, Scene } from "scene.js";
import { newSession, Session } from "session.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  sceneNextId: string;
  session: Session;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  sceneNextId: "",
  session: newSession(),
};

console.log(game);

export function addScene(id: string, scene: Scene) {
  if (id in game.scenes) {
    const oldScene = game.scenes[id];
    destroyScene(oldScene);
  }

  game.scenes[id] = scene;

  return scene;
}

export function switchScene(id: string) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  if (game.sceneId !== game.sceneNextId) {
    game.sceneId = game.sceneNextId;
  }
}

export function getScene(id: string) {
  return game.scenes[id];
}

export function getCurrentScene() {
  return game.scenes[game.sceneId];
}

export function removeScene(scene: Scene) {
  delete game.scenes[scene.id];
}

export function getSession() {
  return game.session;
}
