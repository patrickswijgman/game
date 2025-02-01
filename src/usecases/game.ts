import { ItemId } from "@/consts/item.js";
import { PLAYER_HEALTH, PLAYER_MANA, PLAYER_MOVEMENT_SPEED } from "@/consts/player.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { unlockEquipmentSlot } from "@/usecases/equipment.js";
import { addItemToInventory } from "@/usecases/inventory.js";
import { initSheet } from "@/usecases/sheet.js";

export function switchScene(id: SceneId) {
  game.sceneNextId = id;
}

export function transitionToNextScene() {
  if (game.sceneNextId !== game.sceneId) {
    game.sceneId = game.sceneNextId;
    return true;
  }

  return false;
}

export function getScene(id: SceneId) {
  return game.scenes[id];
}

export function setupPlayer() {
  game.sheet.name = "Player";
  game.sheet.statsBase.health = PLAYER_HEALTH;
  game.sheet.statsBase.healthMax = PLAYER_HEALTH;
  game.sheet.statsBase.mana = PLAYER_MANA;
  game.sheet.statsBase.manaMax = PLAYER_MANA;
  game.sheet.statsBase.movementSpeed = PLAYER_MOVEMENT_SPEED;
  initSheet(game.sheet);

  addItemToInventory(ItemId.LONGSWORD);
  addItemToInventory(ItemId.SHORTBOW);
  addItemToInventory(ItemId.LEATHER_ARMOR);

  unlockEquipmentSlot();
  unlockEquipmentSlot();
}
