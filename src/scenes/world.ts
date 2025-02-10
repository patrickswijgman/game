import { TextureId } from "@/consts/assets.js";
import { MAP_WORLD_HEIGHT, MAP_WORLD_WIDTH } from "@/consts/map.js";
import { SceneId } from "@/consts/scene.js";
import { Scene } from "@/data/scene.js";
import { getScene } from "@/usecases/game.js";
import { loadMapFloorTexture, populateMap } from "@/usecases/map.js";
import { getEntity } from "@/usecases/scene.js";
import { applyCameraTransform, copyRectangle, drawTexture, resetTransform, setCameraPosition, setRectangle, updateCamera } from "ridder";

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  loadMapFloorTexture();

  setRectangle(scene.bounds, 0, 0, MAP_WORLD_WIDTH, MAP_WORLD_HEIGHT);

  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  copyRectangle(scene.camera.bounds, scene.bounds);

  populateMap(scene.id);

  return scene;
}

export function onWorldSceneEnter(scene: Scene) {
  const player = getEntity(scene, scene.playerId);
  if (player.isPlayer) {
    setCameraPosition(scene.camera, player.position.x, player.position.y);
  }
}

export function updateWorldScene(scene: Scene) {
  const player = getEntity(scene, scene.playerId);
  if (player.isPlayer) {
    updateCamera(scene.camera, player.position.x, player.position.y);
  }
}

export function renderWorldScene(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  drawTexture(TextureId.FLOOR, 0, 0);
}
