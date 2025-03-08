import { FONT_HEIGHT } from "@/consts/render.js";
import { entities } from "@/data/entities.js";
import { world } from "@/data/world.js";
import { getEntity } from "@/usecases/entity.js";
import { applyCameraTransform, drawRectInstance, drawText, getFramePerSecond, isRectangleValid, resetTransform, translateTransform } from "ridder";

export function debugHitboxes() {
  resetTransform();
  applyCameraTransform(world.camera);
  for (const id of entities.active) {
    const e = getEntity(id);
    if (isRectangleValid(e.hitbox)) {
      drawRectInstance(e.hitbox, "yellow", false);
    }
  }
}

export function debugBodies() {
  resetTransform();
  applyCameraTransform(world.camera);
  for (const body of world.bodies) {
    if (isRectangleValid(body)) {
      drawRectInstance(body, "red", false);
    }
  }
}

export function debugFps() {
  drawText(`FPS: ${getFramePerSecond()}`, 1, 1, "lime");
}

export function debugEntities() {
  const all = entities.table.reduce((prev, e) => (prev += e.isAllocated ? 1 : 0), 0);
  const max = entities.table.length;
  drawText(`entities: ${all} / ${max}`, 1, 1, "lime");
  translateTransform(0, FONT_HEIGHT);
  drawText(`entity ID: ${entities.nextId}`, 1, 1, "lime");
}
