import { COLOR_PRIMARY, COLOR_TEXT, HEIGHT, WIDTH } from "consts.js";
import { switchScene } from "game.js";
import { drawText, InputCode, isInputPressed, resetTransform, scaleTransform, translateTransform } from "ridder";
import { newScene, Scene } from "scene.js";
import { newBuildScene } from "scenes/build.js";

export function newMenuScene() {
  const scene = newScene("menu");

  scene.backgroundTextureId = "menu_bg";

  return scene;
}

export function updateMenuScene(scene: Scene) {
  if (isInputPressed(InputCode.KEY_ENTER)) {
    const next = newBuildScene();
    switchScene(next.id);
  }
}

export function renderMenuScene(scene: Scene) {
  resetTransform();
  translateTransform(WIDTH / 2, HEIGHT / 2 - 50);
  scaleTransform(5, 5);
  drawText("DANK SOULS", 0, 0, COLOR_PRIMARY, "center", "middle");

  resetTransform();
  translateTransform(WIDTH / 2, HEIGHT / 2 + 50);
  drawText("- Press [Enter] to start -", 0, 0, COLOR_TEXT, "center", "middle");
}
