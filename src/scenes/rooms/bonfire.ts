import { HEIGHT, WIDTH } from "consts.js";
import { newBonfire } from "entities/bonfire.js";
import { newPlayer } from "entities/player.js";
import { newPortal } from "entities/portal.js";
import { rect, setRectangle, setVector } from "ridder";
import { addBody, initCamera, newRoom, Scene } from "scene.js";
import { initForestTheme } from "themes/forest.js";

export function newBonfireRoomScene(level: number) {
  const scene = newRoom("room_bonfire", "bonfire", level);

  initCamera(scene);
  initLayout(scene);
  initForestTheme(scene);
  newPlayer(scene, scene.playerStart.x, scene.playerStart.y);
  newPortal(scene, scene.portalPosition.x, scene.portalPosition.y);
  newBonfire(scene, scene.bounds.w / 2, scene.bounds.h / 2);

  return scene;
}

function initLayout(scene: Scene) {
  const w = WIDTH;
  const h = HEIGHT;

  setRectangle(scene.bounds, 0, 0, w, h);
  setRectangle(scene.safeArea, 100, 50, w - 200, h - 100);

  addBody(scene, rect(0, 0, 100, h));
  addBody(scene, rect(w - 100, 0, 100, h));
  addBody(scene, rect(0, 0, w, 50));
  addBody(scene, rect(0, h - 50, w, 50));

  setVector(scene.playerStart, w / 2, h / 2 + 50);
  setVector(scene.portalPosition, w / 2, h / 2 - 100);
}
