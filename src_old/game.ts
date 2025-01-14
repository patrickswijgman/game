import { Scene } from "scene.js";
import { newSheet, Sheet } from "sheet.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  sceneNextId: string;
  sheet: Sheet;
};

export const game: Game = {
  scenes: {},
  sceneId: "",
  sceneNextId: "",
  sheet: newSheet({
    stats: {
      health: 50,
      healthMax: 50,
      stamina: 100,
      staminaMax: 100,
      staminaRegen: 1,
      constitution: 0,
      endurance: 0,
      strength: 0,
      dexterity: 3,
      intelligence: 0,
      movementSpeed: 1.5,
    },
    weaponId: "longsword",
    armorId: "clothes",
  }),
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
