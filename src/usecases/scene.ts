import { zeroEntity } from "@/data/entity.js";
import { Scene } from "@/data/scene.js";
import { remove } from "ridder";

export function nextEntity(scene: Scene) {
  let id = scene.entityId;
  let e = scene.entities[id];

  if (e.isAllocated) {
    id = scene.entities.findIndex((e) => !e.isAllocated);
    if (id === -1) {
      throw new Error("Out of entities :(");
    }

    e = scene.entities[id];
    scene.entityId = id + 1;
  }

  e.id = id;
  e.sceneId = scene.id;
  e.isAllocated = true;

  scene.update.push(e.id);
  scene.render.push(e.id);

  return e;
}

export function getEntity(scene: Scene, id: number) {
  return scene.entities[id];
}

export function sortEntitiesOnDepth(scene: Scene) {
  scene.render.sort((idA, idB) => {
    const a = scene.entities[idA];
    const b = scene.entities[idB];
    return a.position.y + a.depth - b.position.y + b.depth;
  });
}

export function cleanupDestroyedEntities(scene: Scene) {
  if (scene.destroyed.length) {
    for (const id of scene.destroyed) {
      remove(scene.update, id);
      remove(scene.render, id);
      remove(scene.allies, id);
      remove(scene.enemies, id);
      zeroEntity(scene.entities[id]);
    }
    scene.destroyed.length = 0;
  }
}
