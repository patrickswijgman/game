import { ItemId } from "@/consts/item.js";
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
  game.sheet.statsBase.health = 10;
  game.sheet.statsBase.healthMax = 10;
  game.sheet.statsBase.mana = 5;
  game.sheet.statsBase.manaMax = 5;
  game.sheet.statsBase.critChance = 0.05;
  game.sheet.statsBase.critDamage = 2;
  game.sheet.statsBase.movementSpeed = 1;
  game.sheet.statsBase.movementSpeedMax = 1.5;
  initSheet(game.sheet);

  addItemToInventory(ItemId.LONGSWORD);
  addItemToInventory(ItemId.SHORTBOW);
  addItemToInventory(ItemId.LEATHER_ARMOR);
  addItemToInventory(ItemId.WOODEN_SHIELD);

  unlockEquipmentSlot();
  unlockEquipmentSlot();
  unlockEquipmentSlot();
  unlockEquipmentSlot();
}
