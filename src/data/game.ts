import { SceneId } from "@/consts/scene.js";
import { newScene, Scene } from "@/data/scene.js";
import { table, Table } from "ridder";

export type Game = {
  scenes: Table<Scene>;
  sceneId: SceneId;
  sceneNextId: SceneId;
};

export function newGame(): Game {
  return {
    scenes: table(SceneId.MAX, newScene),
    sceneId: SceneId.NONE,
    sceneNextId: SceneId.NONE,
  };
}

export const game = newGame();
