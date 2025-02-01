import { ItemId } from "@/consts/item.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { assignEquipmentSlot, unlockEquipmentSlot, useEquipmentSlot } from "@/usecases/equipment.js";
import { addItemToInventory } from "@/usecases/inventory.js";
import { initSheet } from "@/usecases/sheet.js";

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
  game.sheet.statsBase.health = 10;
  game.sheet.statsBase.healthMax = 10;
  game.sheet.statsBase.movementSpeed = 0.75;
  game.sheet.statsBase.damage = 0;
  initSheet(game.sheet);

  addItemToInventory(ItemId.LONGSWORD);
  addItemToInventory(ItemId.SHORTBOW);
  addItemToInventory(ItemId.LEATHER_ARMOR);

  unlockEquipmentSlot();
  unlockEquipmentSlot();
  unlockEquipmentSlot();
  assignEquipmentSlot(0, ItemId.LONGSWORD);
  assignEquipmentSlot(1, ItemId.SHORTBOW);
  assignEquipmentSlot(2, ItemId.LEATHER_ARMOR);
  useEquipmentSlot(0);
}
