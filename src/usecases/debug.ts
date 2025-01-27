import { TILE_SIZE } from "@/consts.js";
import { Scene } from "@/data/scene.js";
import { getEntity } from "@/usecases/scene.js";
import { applyCameraTransform, drawLine, drawRect, drawRectInstance, drawText, getFramePerSecond, getGridHeight, getGridValue, getGridWidth, isRectangleValid, resetTransform } from "ridder";

export function debugHitboxes(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  for (const id of scene.update) {
    const e = getEntity(scene, id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

export function debugGrid(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  const w = getGridWidth(scene.grid);
  const h = getGridHeight(scene.grid);
  for (let x = 0; x <= w; x++) {
    drawLine(x * TILE_SIZE, 0, x * TILE_SIZE, h * TILE_SIZE, "rgba(255, 255, 255, 0.1)");
  }
  for (let y = 0; y <= h; y++) {
    drawLine(0, y * TILE_SIZE, w * TILE_SIZE, y * TILE_SIZE, "rgba(255, 255, 255, 0.1)");
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      if (getGridValue(scene.grid, x, y)) {
        drawRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2, "rgba(255, 0, 0, 0.25)", true);
      }
    }
  }
}

export function debugFps() {
  drawText(getFramePerSecond().toString(), 1, 1, "lime");
}

export function debugEntities(scene: Scene) {
  const count = scene.entities.reduce((prev, e) => (prev += e.isAllocated ? 1 : 0), 0);
  const max = scene.entities.length;
  drawText(`${count} / ${max} entities`, 1, 1, "lime");
}
