import { MAP_WORLD_HEIGHT, MAP_WORLD_WIDTH } from "@/consts.js";
import { TextureId } from "@/consts/assets.js";
import { SceneId } from "@/consts/scene.js";
import { Scene } from "@/data/scene.js";
import { getScene } from "@/usecases/game.js";
import { loadMapFloorTexture, populateMap } from "@/usecases/map.js";
import { applyCameraTransform, copyRectangle, drawTexture, resetTransform, setRectangle } from "ridder";

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

export function renderWorldScene(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  drawTexture(TextureId.FLOOR, 0, 0);
}
