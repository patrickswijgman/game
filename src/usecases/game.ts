import { ItemId } from "@/consts/item.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";

export function switchScene(id: SceneId) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  game.sceneId = game.sceneNextId;
}

export function getScene(id: SceneId) {
  return game.scenes[id];
}

export function setupPlayer() {
  game.sheet.name = "Player";
  game.sheet.stats.health = 10;
  game.sheet.stats.healthMax = 10;
  game.sheet.stats.movementSpeed = 0.75;
  game.sheet.stats.damage = 0;
  game.sheet.weaponId = ItemId.LONGSWORD;
}
