import { MAP_HEIGHT, MAP_WIDTH, MAX_WORLD_ENTITIES } from "@/consts.js";
import { newScene, Scene } from "@/data/scene.js";
import { newSheet, Sheet } from "@/data/sheet.js";
import { ItemId } from "@/enums/item.js";
import { SceneId } from "@/enums/scene.js";
import { table, Table } from "ridder";

export type Game = {
  // Scene management
  scenes: Table<Scene>;
  sceneId: SceneId;
  sceneNextId: SceneId;

  // Player
  sheet: Sheet;
};

export function newGame(): Game {
  return {
    // Scene management
    scenes: newScenes(),
    sceneId: SceneId.NONE,
    sceneNextId: SceneId.NONE,

    // Player
    sheet: newSheet({
      name: "Player",
      stats: {
        health: 10,
        healthMax: 10,
        movementSpeed: 0.75,
        damage: 0,
      },
      weaponId: ItemId.LONGSWORD,
    }),
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
