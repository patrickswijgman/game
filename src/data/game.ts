import { SceneId } from "@/consts/scene.js";
import { Equipment, newEquipment } from "@/data/equipment.js";
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
  equipment: Equipment;
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
    equipment: newEquipment(),
  };
}

function newScenes() {
  return table(SceneId.MAX, (id) => {
    switch (id) {
      case SceneId.WORLD:
      case SceneId.EDITOR:
        return newScene(id, 20_000, 128, 128);
      default:
        return newScene(id, 10, 0, 0);
    }
  });
}

export const game = newGame();
