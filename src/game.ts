import { Scene } from "scene.js";
import { newSession, Session } from "session.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  sceneNextId: string;
  session: Session;
};

export const game: Game = {
  scenes: {},
  sceneId: "",
  sceneNextId: "",
  session: newSession(),
};

console.log(game);

export function switchScene(id: string) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  if (game.sceneId !== game.sceneNextId) {
    game.sceneId = game.sceneNextId;
  }
}

export function startNewSession() {
  for (const id in game.scenes) {
    const scene = game.scenes[id];

    if (scene.sessionId === game.session.id) {
      delete game.scenes[id];
    }
  }

  game.session = newSession();
}

export function addScene(scene: Scene) {
  game.scenes[scene.id] = scene;
  return scene;
}

export function getScene(id: string) {
  return game.scenes[id];
}

export function getCurrentScene() {
  return game.scenes[game.sceneId];
}
