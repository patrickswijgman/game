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
    scenes: table(4, newScene),
    sceneId: 0,
    sceneNextId: 0,

    // Player
    sheet: newSheet("Player", {
      health: 10,
      healthMax: 10,
      mana: 2,
      manaMax: 2,
      damage: 0,
    }),
  };
}

export const game = newGame();
