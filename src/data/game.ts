import { MAX_ENTITIES, SceneId } from "@/consts/scene.js";
import { newScene, Scene } from "@/data/scene.js";
import { table, Table } from "ridder";

export type Game = {
  // Scene management
  scenes: Table<Scene>;
  sceneId: SceneId;
  sceneNextId: SceneId;
};

export function newGame(): Game {
  return {
    // Scene management
    scenes: newScenes(),
    sceneId: SceneId.NONE,
    sceneNextId: SceneId.NONE,
  };
}

function newScenes() {
  return table(SceneId.MAX, (id) => {
    switch (id) {
      case SceneId.WORLD:
        return newScene(id, MAX_ENTITIES);
      default:
        return newScene(id, 0);
    }
  });
}

export const game = newGame();
