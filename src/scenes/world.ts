import { Scene } from "@/data/scene.js";
import { TextureId } from "@/enums/assets.js";
import { SceneId } from "@/enums/scene.js";
import { getScene } from "@/usecases/game.js";
import { loadMapFloorTexture, populateMap } from "@/usecases/map.js";
import { applyCameraTransform, copyRectangle, drawTexture, resetTransform, setRectangle } from "ridder";

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  const [width, height] = loadMapFloorTexture();

  setRectangle(scene.bounds, 0, 0, width, height);

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
