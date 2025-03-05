import { COLOR_GRASS } from "@/consts/colors.js";
import { SceneId } from "@/consts/scene.js";
import { Scene } from "@/data/scene.js";
import { addPlayer } from "@/entities/player.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import { copyRectangle, setBackgroundColor, setCameraPosition, setRectangle, updateCamera } from "ridder";

export function setupWorldScene() {
  const scene = getScene(SceneId.WORLD);

  setRectangle(scene.bounds, 0, 0, 1024, 1024);

  scene.camera.smoothing = 0.1;
  scene.camera.shakeReduction = 0.1;
  copyRectangle(scene.camera.bounds, scene.bounds);

  addPlayer(scene.id, 512, 512);

  setBackgroundColor(COLOR_GRASS);
  setCameraPosition(scene.camera, 512, 512);

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
  //resetTransform();
  //applyCameraTransform(scene.camera);
  //drawTexture(TextureId.FLOOR, 0, 0);
}
