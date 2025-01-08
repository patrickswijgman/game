import { COLOR_DARK, COLOR_DIM, COLOR_PRIMARY } from "consts.js";
import { Entity, newEntity } from "entity.js";
import { drawRect, setRectangle, setVector } from "ridder";
import { Scene } from "scene.js";

export function newBuildTab(scene: Scene, x: number, y: number, spriteId: string, tab: string) {
  const e = newEntity(scene, "build_tab", x, y);

  e.spriteId = spriteId;
  e.buildTab = tab;

  setVector(e.pivot, -2, -2);
  setRectangle(e.hitarea, x, y, 20, 20);

  return e;
}

export function clickBuildTab(e: Entity, scene: Scene) {
  scene.buildTab = e.buildTab;
}

export function renderBuildTab(e: Entity, scene: Scene) {
  const color = e.buildTab === scene.buildTab ? COLOR_PRIMARY : e.isHovered ? COLOR_DIM : COLOR_DARK;
  drawRect(0, 0, 20, 20, color, true);
}
