import { Scene } from "@/data/scene.js";
import { TextureId } from "@/enums/assets.js";
import { SceneId, SceneStateId } from "@/enums/scene.js";
import { initDeck, updateDeck } from "@/usecases/deck.js";
import { getScene } from "@/usecases/game.js";
import { loadMapFloorTexture, populateMap } from "@/usecases/map.js";
import { getEntity, setSceneState } from "@/usecases/scene.js";
import { updateSheet } from "@/usecases/sheet.js";
import { applyCameraTransform, copyRectangle, drawTexture, resetTransform, setRectangle } from "ridder";

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  const [width, height] = loadMapFloorTexture();

  setRectangle(scene.bounds, 0, 0, width, height);

  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  copyRectangle(scene.camera.bounds, scene.bounds);

  populateMap(scene.id);
  setSceneState(scene, SceneStateId.INIT_COMBAT);

  return scene;
}

export function onWorldSceneStateEnter(scene: Scene) {
  switch (scene.stateId) {
    case SceneStateId.INIT_COMBAT:
      {
        const player = getEntity(scene, scene.playerId);
        updateSheet(player.sheet);
        updateDeck(player.sheet.deck);
        initDeck(player.sheet.deck);
        const enemy = scene.entities.find((e) => e.isEnemy);
        if (enemy) {
          updateSheet(enemy.sheet);
          updateDeck(enemy.sheet.deck);
          initDeck(enemy.sheet.deck);
        }
        console.log("Combat started!");
        setSceneState(scene, SceneStateId.ENEMY_PICK_CARD);
      }
      break;
  }
}

export function onWorldSceneStateUpdate(scene: Scene) {}

export function onWorldSceneStateExit(scene: Scene) {}

export function renderWorldScene(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  drawTexture(TextureId.FLOOR, 0, 0);
}
