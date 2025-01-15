import { newScene, Scene } from "@/data/scene.js";
import { table, Table } from "ridder";

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
