import { COLOR_BG } from "@/consts/colors.js";
import { INVENTORY_HEIGHT, INVENTORY_WIDTH } from "@/consts/inventory.js";
import { SceneId } from "@/consts/scene.js";
import { Scene } from "@/data/scene.js";
import { assignEquipmentSlot, renderEquipment } from "@/usecases/equipment.js";
import { getScene, switchScene } from "@/usecases/game.js";
import { getInventorySlot, renderInventory, renderTooltip } from "@/usecases/inventory.js";
import { clamp, drawRect, drawText, getHeight, getWidth, InputCode, isInputPressed, resetTransform, resetVector, scaleTransform, translateTransform } from "ridder";

export function setupInventoryScene() {
  const scene = getScene(SceneId.INVENTORY);

  return scene;
}

export function onInventorySceneEnter(scene: Scene) {
  resetVector(scene.selected);
}

export function updateInventoryScene(scene: Scene) {
  if (isInputPressed(InputCode.KEY_ESCAPE)) {
    switchScene(SceneId.WORLD);
    return;
  }

  if (isInputPressed(InputCode.KEY_LEFT)) {
    scene.selected.x -= 1;
  }
  if (isInputPressed(InputCode.KEY_RIGHT)) {
    scene.selected.x += 1;
  }
  if (isInputPressed(InputCode.KEY_UP)) {
    scene.selected.y -= 1;
  }
  if (isInputPressed(InputCode.KEY_DOWN)) {
    scene.selected.y += 1;
  }

  scene.selected.x = clamp(scene.selected.x, 0, INVENTORY_WIDTH - 1);
  scene.selected.y = clamp(scene.selected.y, 0, INVENTORY_HEIGHT - 1);

  assignEquipmentSlotOnInput(scene, 0, InputCode.KEY_1);
  assignEquipmentSlotOnInput(scene, 1, InputCode.KEY_2);
  assignEquipmentSlotOnInput(scene, 2, InputCode.KEY_3);
  assignEquipmentSlotOnInput(scene, 3, InputCode.KEY_4);
  assignEquipmentSlotOnInput(scene, 4, InputCode.KEY_5);
  assignEquipmentSlotOnInput(scene, 5, InputCode.KEY_6);
  assignEquipmentSlotOnInput(scene, 6, InputCode.KEY_7);
  assignEquipmentSlotOnInput(scene, 7, InputCode.KEY_8);
  assignEquipmentSlotOnInput(scene, 8, InputCode.KEY_9);
  assignEquipmentSlotOnInput(scene, 9, InputCode.KEY_0);
}

function assignEquipmentSlotOnInput(scene: Scene, slotId: number, input: InputCode) {
  if (isInputPressed(input)) {
    const id = 1 + scene.selected.x + scene.selected.y * INVENTORY_WIDTH;
    const slot = getInventorySlot(id);

    if (slot && slot.amount > 0) {
      assignEquipmentSlot(slotId, id);
    }
  }
}

export function renderInventoryScene(scene: Scene) {
  resetTransform();
  drawRect(0, 0, getWidth(), getHeight(), COLOR_BG, true);
  drawText("Inventory", 10, 10);

  renderInventory(scene);
  renderEquipment();
  renderTooltip(scene);

  resetTransform();
  translateTransform(20, getHeight() - 40);
  scaleTransform(0.5, 0.5);
  drawText("[1~0] Assign to Equipment", 0, 0);
}
