import { MAP_HEIGHT, MAP_WIDTH } from "@/consts/map.js";
import { MAX_WORLD_ENTITIES, SceneId } from "@/consts/scene.js";
import { Inventory, newInventory } from "@/data/inventory.js";
import { newScene, Scene } from "@/data/scene.js";
import { newSheet, Sheet } from "@/data/sheet.js";
import { table, Table } from "ridder";

export type Game = {
  // Scene management
  scenes: Table<Scene>;
  sceneId: SceneId;
  sceneNextId: SceneId;

  // Player
  sheet: Sheet;
  inventory: Inventory;
};

export function newGame(): Game {
  return {
    // Scene management
    scenes: newScenes(),
    sceneId: SceneId.NONE,
    sceneNextId: SceneId.NONE,

    // Player
    sheet: newSheet(),
    inventory: newInventory(),
  };
}

function newScenes() {
  return table(SceneId.MAX, (id) => {
    switch (id) {
      case SceneId.WORLD:
        return newScene(id, MAX_WORLD_ENTITIES, MAP_WIDTH, MAP_HEIGHT);
      default:
        return newScene(id, 0, 0, 0);
    }
  });
}

export const game = newGame();
