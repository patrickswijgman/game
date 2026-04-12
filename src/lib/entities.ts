import { addCameraTransform, resetTransform, scaleTransform, translateTransform } from "snuggy";
import type { Type } from "@/consts.ts";
import { activeEntities, destroyedEntities, type Entity, entities, MAX_ENTITIES_COUNT, zeroDestroyedEntities, zeroEntity } from "@/data.ts";

export function addEntity(type: Type, x: number, y: number) {
  for (let i = 0; i < MAX_ENTITIES_COUNT; i++) {
    const e = entities[i];

    if (!e.isActive) {
      zeroEntity(e);
      e.idx = i;
      e.type = type;
      e.pos.x = x;
      e.pos.y = y;
      e.isActive = true;
      activeEntities.push(e);
      return e;
    }
  }

  throw new Error("Out of entities :(");
}

export function destroyEntity(e: Entity) {
  e.isActive = false;
  destroyedEntities.push(e);
}

function sortOnDepth(a: Entity, b: Entity) {
  return a.pos.y - b.pos.y;
}

export function sortActiveEntities() {
  activeEntities.sort(sortOnDepth);
}

export function cleanupDestroyedEntities() {
  for (const e of destroyedEntities) {
    activeEntities.splice(activeEntities.indexOf(e), 1);
  }

  zeroDestroyedEntities();
}

export function setEntityTransform(e: Entity, inWorld: boolean) {
  resetTransform();

  if (inWorld) {
    addCameraTransform();
  }

  translateTransform(e.pos.x, e.pos.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }
}
