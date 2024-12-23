import { setCameraBounds } from "ridder";
import { Scene } from "scene.js";
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

export function addScene(id: string, scene: Scene) {
  game.scenes[id] = scene;
  return scene;
}

export function switchScene(id: string) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
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

export function getSession() {
  return game.session;
}
