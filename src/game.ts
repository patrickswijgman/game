import { Equipment, newEquipment } from "equipment.js";
import { newScene, Scene } from "scene.js";
import { newStats, Stats } from "stats.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  playerStats: Stats;
  playerEquipment: Equipment;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  playerStats: newStats({
    health: 1,
    healthMax: 1,
    movementSpeed: 1.5,
  }),
  playerEquipment: newEquipment(),
};

export function addScene(id: string, setup?: (scene: Scene) => void) {
  const scene = newScene();

  game.scenes[id] = scene;

  if (setup) {
    setup(scene);
  }

  return scene;
}

export function switchScene(id: string) {
  game.sceneId = id;
}

export function getScene(id: string) {
  return game.scenes[id];
}

export function getCurrentScene() {
  return game.scenes[game.sceneId];
}

export function getPlayerStats() {
  return game.playerStats;
}

export function getPlayerEquipment() {
  return game.playerEquipment;
}
