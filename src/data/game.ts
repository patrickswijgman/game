import { newScene, Scene } from "@/data/scene.js";
import { newSheet, Sheet } from "@/data/sheet.js";
import { table, Table } from "ridder";

export type Game = {
  // Scene management
  scenes: Table<Scene>;
  sceneId: number;
  sceneNextId: number;

  // Player
  sheet: Sheet;
};

export function newGame(): Game {
  return {
    // Scene management
    scenes: table(16, newScene),
    sceneId: 0,
    sceneNextId: 0,

    // Player
    sheet: newSheet(),
  };
}

export const game = newGame();
