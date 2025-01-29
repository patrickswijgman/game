import { ItemId } from "@/consts/item.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { assignEquipmentSlot, unlockEquipmentSlot, useEquipmentSlot } from "@/usecases/equipment.js";
import { addItemToInventory } from "@/usecases/inventory.js";

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

  const weaponInventoryId = addItemToInventory(ItemId.LONGSWORD);

  unlockEquipmentSlot();
  unlockEquipmentSlot();
  assignEquipmentSlot(0, weaponInventoryId);
  useEquipmentSlot(0);
}
