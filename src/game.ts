import { Scene } from "scene.js";
import { newStats, Stats } from "stats.js";

export type Game = {
  scenes: Record<string, Scene>;
  sceneId: string;
  playerStats: Stats;
  playerWeaponId: string;
  playerArmorId: string;
};

const game: Game = {
  scenes: {},
  sceneId: "",
  playerStats: newStats(),
  playerWeaponId: "",
  playerArmorId: "",
};

export function addScene(id: string, scene: Scene) {
  game.scenes[id] = scene;
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
