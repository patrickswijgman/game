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
      activeEntities.push(e.idx);
      return e;
    }
  }

  throw new Error("Out of entities :(");
}

export function destroyEntity(e: Entity) {
  e.isActive = false;
  destroyedEntities.push(e.idx);
}

export function sortEntitiesOnDepth(idxA: number, idxB: number) {
  const a = entities[idxA];
  const b = entities[idxB];
  return a.pos.y - b.pos.y;
}

export function cleanupDestroyedEntities() {
  for (const idx of destroyedEntities) {
    const i = activeEntities.indexOf(idx);

    if (i !== -1) {
      activeEntities.splice(i, 1);
    }
  }

  zeroDestroyedEntities();
}
